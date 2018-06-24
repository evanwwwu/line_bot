const
    config = require("../../config"),
    request = require("request"),
    cheerio = require("cheerio"),
    axios = require("axios");

module.exports.search_hot = search_hot;
module.exports.check_ball = check_ball;
module.exports.search_nba = search_nba;
module.exports.random_card = random_card;
module.exports.get_ticket = get_ticket;
module.exports.search_img = search_img;

function search_hot(type) {
    return new Promise((resolve) => {
        if (type == "18+") {
            uri = "https://www.jkforum.net/forum-535-1.html";
        } else {
            uri = "https://www.jkforum.net/type-736-1938.html";
        }
        let j = request.jar();
        let cookie = request.cookie("AKb4_2132_agree18=1");
        j.setCookie(cookie, uri);
        request({
            url: uri,
            jar: j
        }, function (err, res, body) {
            try {
                const $ = cheerio.load(body);
                const hrefs = $("#waterfall li h3 a");
                let r = Math.round(Math.random() * (hrefs.length - 1));
                r = r % 2 === 1 ? r - 1 : r;
                const href = hrefs[r].attribs.href;

                request({
                    url: `https://www.jkforum.net/${href}`,
                    jar: j
                }, function (err2, res2, body2) {
                    const $ = cheerio.load(body2);
                    const srcs = $("#postlist td.t_f img");
                    let r = Math.round(Math.random() * (srcs.length - 1));
                    let src = srcs[r].attribs.zoomfile;
                    if (/^http/.test(src) !== true) {
                        src = 'https://www.jkforum.net' + src;
                    }
                    const result = {
                        type: "image",
                        originalContentUrl: src,
                        previewImageUrl: src
                    };
                    resolve(result);
                })

            } catch (err) {
                console.error(err);
            }
        })
    })
}

function check_ball() {
    return new Promise((resolve) => {
        axios.get('https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=rdec-key-123-45678-011121314')
            .then((response) => {
                try {
                    // console.log(data);
                    let data = response.data;
                    var text = '';
                    const taipei = data.records.location[5];
                    const pop = taipei.weatherElement[1].time[1].parameter.parameterName; //降雨機率
                    const minT = taipei.weatherElement[2].time[1].parameter.parameterName; //最低溫度
                    const maxT = taipei.weatherElement[4].time[1].parameter.parameterName; //最低溫度
                    const mixT = (minT + maxT) / 2;
                    // const CI = taipei.weatherElement[3].time[2].parameter; //舒適度
                    if (pop < 20) {
                        text = "沒雨，";
                        text += CmixT(mixT);
                    }
                    if (pop > 20 && pop < 60) {
                        text = "沒事，下雨機率不大，";
                        text += CmixT(mixT);
                    }
                    if (pop >= 60) {
                        text = "回家打...比較實際。";
                    }
                    resolve({
                        msg: text,
                        pop: pop + "%",
                        temp: minT + "C ~ " + maxT + "C",
                    });
                } catch (err) {
                    console.error(err);
                }
            });

        function CmixT(temp) {
            let m = "";
            if (temp < 16) {
                m = "不過有點冷但動一動就好，所以走吧，打球!!";
            }
            if (temp > 16 && temp < 25) {
                m = "天氣又超好不打球對得起自己嗎。";
            }
            if (temp >= 25) {
                m = "熱了一點而已，流點汗身體比較健康。"
            }
            return m;
        }
    });
}

function search_nba(search_date) {
    function addZero(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

    return new Promise((resolve) => {
        let msg = [];
        if (search_date == "next") {
            axios.get(`http://tw.global.nba.com/stats2/season/schedule.json`, {
                params: {
                    countryCode: 'TW',
                    locale: 'zh_TW',
                    tz: '+8',
                    days: '7'
                }
            }).then((result) => {
                let tmp = "近7日內並無比賽!";
                let data = result.data;
                let dates = data.payload.dates;
                let game;
                for (let x = 0; x < 7; x++) {
                    if (dates[x].utcMillis > new Date().getTime()) {
                        game = dates[x].games[0];
                        break;
                    }
                }
                let teams = {
                    home: game.homeTeam.profile.displayAbbr,
                    away: game.awayTeam.profile.displayAbbr
                }
                let play_date = new Date(parseInt(game.profile.utcMillis));
                let date_text = play_date.getFullYear() + "-" + (play_date.getMonth() + 1) + "-" + play_date.getDate();
                date_text += "  " + addZero(play_date.getHours()) + ":" + addZero(play_date.getMinutes());
                tmp = "日期: " + date_text + "\n" + game.profile.arenaLocation + " " + game.profile.arenaName + "\n" + teams.home + "：" + teams.away;
                msg.push(tmp);
                resolve(msg);
            });
        } else {
            axios.get(`http://tw.global.nba.com/stats2/scores/daily.json`, {
                params: {
                    countryCode: 'TW',
                    locale: 'zh_TW',
                    tz: '+8',
                    gameDate: search_date
                }
            }).then((result) => {
                let data = result.data;
                if (data.payload.date) {
                    let games = data.payload.date.games;
                    games.forEach(function (game) {
                        let tmp = "";
                        let timeDec = game.boxscore.statusDesc;
                        let teams = {
                            home: game.homeTeam.profile.displayAbbr,
                            away: game.awayTeam.profile.displayAbbr
                        }
                        let score = {
                            home: game.boxscore.homeScore,
                            away: game.boxscore.awayScore
                        }
                        let play_date = new Date(parseInt(game.profile.utcMillis));
                        let date_text = play_date.getFullYear() + "-" + (play_date.getMonth() + 1) + "-" + play_date.getDate();
                        if (game.boxscore.status != '2') {
                            date_text += "  " + addZero(play_date.getHours()) + ":" + addZero(play_date.getMinutes());
                        }
                        // game.boxscore.status
                        if (game.boxscore.status == '1') {
                            timeDec = "未開打";
                        }
                        if (game.boxscore.status == '2') {
                            timeDec += " " + game.boxscore.periodClock;
                        }
                        tmp = "日期: " + date_text + "\n" + "狀態: " + timeDec + "\n" + teams.home + "：" + teams.away + "\n" + score.home + "：" + score.away;
                        msg.push(tmp);
                    });
                } else {
                    msg.push("今天沒有比賽喔！");
                }
                resolve(msg);
            });
        }

    })
}
// https://javlog.com/tw/search/%E3%81%BF%E3%81%AA%E3%81%BF%E8%8F%9C%E3%80%85
function random_card() {
    console.log("random_card");
    return new Promise((resolve) => {
        let page = Math.floor((Math.random() * 5) + 1);
        // console.log(page);
        request("https://javlog.com/tw/actresses/page/"+page, function (req, res, body) {
            try {
                const $ = cheerio.load(body);
                const items = $("#waterfall .item");
                let r = Math.round(Math.random() * (items.length - 1));
                let star_name = items.eq(r).find(".photo-info span").text();
                let src = items.eq(r).find(".photo-frame img").attr("src");
                let img_msg = {
                    type: "image",
                    originalContentUrl: src,
                    previewImageUrl: src
                };
                resolve([star_name, img_msg]);
            }
            catch(err){
                console.error(err);
            }

        });
    });
}

function get_ticket(data) {
    return new Promise((resolve) => {
        // av539  av01.tv ohyeah1080 hdtube.co Javgo  xo104 javhd3x javcl pigav
        
        var uri = "";
        if (data != "") {
            uri = "https://www.av01.tv/?s=" + encodeURIComponent(data);
        }
        else {
            uri = "https://www.av01.tv/";
            // #main .column a .tube-title => title
            // #main .column a .image-wrapper img => img
            // http://www.av539.com/?search=&s=ges
            // https://www.av01.tv/?s=ges
        }

        request(uri, function (req, res, body) {
            const $ = cheerio.load(body);
            const items = $("#main .column");
            try {
                if ($(".post-not-found").length <= 0) {
                    let r = Math.round(Math.random() * (items.length - 1));
                    let src = items.eq(r).find(".movie-box").attr("href");
                    let pic = items.eq(r).find(".photo-frame img").attr("src");
                    request(src, function (req, res, body) {
                        let $ = cheerio.load(body);
                        let detail = $("body>.container");
                        let big_pic = detail.find(".bigImage").attr("href");
                        let info = items.eq(r).find(".photo-info");
                        let name = "車名：" + info.find("span").text();
                        let no = "票號：" + info.find("date").eq(0).text();
                        let img = {
                            type: "image",
                            originalContentUrl: big_pic,
                            previewImageUrl: pic
                        };
                        let msg = name + "\n" + no + "\n" + src;
                        resolve([img,msg]);
                    })
                }
                else {
                    resolve("沒車了找下一台吧！");
                }
            }
            catch (err) {
                console.error(err);
            }
        });
    });
}

function search_img(msg) {
    return new Promise((resolve) => {
        axios.get(`https://www.googleapis.com/customsearch/v1`, {
            params: {
                q: msg,
                cx: config.cx,
                imgSize: 'large',
                searchType: 'image',
                key: config.gkey,
                exactTerms:"https:",
                num:10
            }
        }).then((response) => {
            try {
                let items = response.data.items;
                let r = Math.round(Math.random() * (items.length - 1));
                let result = {
                    type: "image",
                    originalContentUrl: items[r].link,
                    previewImageUrl: items[r].link
                }
                resolve(result);
                console.log(result);
            }
            catch (err) {
                console.log(err);
            }
        })
    })
}