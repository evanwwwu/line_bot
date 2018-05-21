const
    request = require("request"),
    cheerio = require("cheerio"),
    axios = require("axios");

module.exports.search_hot = search_hot;
module.exports.check_ball = check_ball;
module.exports.search_nba = search_nba;
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
                    const r = Math.round(Math.random() * (srcs.length - 1));
                    const src = srcs[r].attribs.zoomfile;
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
    axios.get('https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=rdec-key-123-45678-011121314')
        .then((data) => {
            const text = '';
            const taipei = data.records.location[5];
            const pop = taipei.weatherElement[1].time[2].parameter; //降雨機率
            const minT = taipei.weatherElement[2].time[2].parameter; //最低溫度
            const maxT = taipei.weatherElement[4].time[2].parameter; //最低溫度
            const mixT = (minT + maxT) / 2;
            // const CI = taipei.weatherElement[3].time[2].parameter; //舒適度
            if (pop < 20) {
                text = "沒雨，";
                CmixT();
            }
            if (pop > 20 && pop < 60) {
                text = "沒事，下雨機率不大，";
                CmixT();
            }
            if (pop >= 60) {
                text = "回家打...比較實際。";
            }

            return {
                msg: text,
                pop: pop,
                temp: minT + "C ~ " + maxT + "C",
            };

            function CmixT() {
                if (mixT < 16) {
                    text += "不過有點冷但動一動就好，所以走吧，打球!!";
                }
                if (mixT > 16 && mixT < 25) {
                    text += "天氣又超好不打球對得起自己嗎。";
                }
                if (mixT >= 25) {
                    text += "沒事熱了一點而已，流點汗身體比較健康。"
                }
            }

        })
}

function search_nba(search_date) {
    return new Promise((resolve) => {
        let msg = [];
        axios.get(`http://tw.global.nba.com/stats2/scores/daily.json`, {
            params: {
                countryCode: 'TW',
                locale: 'zh_TW',
                tz: '+8',
                gameDate: search_date
            }
        }).then((data) => {
            data = data.data;
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
                    let play_date = new Date(game.boxscore.utcMillis);
                    tmp = "狀態: " + timeDec + "\n" + teams.home + "：" + teams.away + "\n" + score.home + "：" + score.away;
                    msg.push(tmp);
                });
            } else {
                msg.push("今天沒有比賽喔！");
            }
            console.log(msg);
            resolve(msg);
        });
        // request(`http://tw.global.nba.com/scores/#!/${search_date}`, function (erro, res, body) {
        //     const $ = cheerio.load(body);
        //     // final-game-table-wrapper
        //     // sib-list
        //     let games = $(".sib-list-team-game-snapshot");
        //     if (games.length > 0) {
        //         let game_info = games.find(".snapshot-header .info").eq(0);
        //         let game_time = "",
        //             teams = [],
        //             fraction = [];
        //         teams[0] = games.find(".team-abbrv").eq(0).find('a').text();
        //         teams[1] = games.find(".team-abbrv").eq(1).find('a').text();
        //         if (game_info.hasClass('live-game')) {
        //             let gt = game_info.find("span").eq(1);
        //             game_time = gt.find("span").eq(0).text() + " " + gt.find("span").eq(1).text() + " " + gt.find("span").eq(2).text();
        //         }
        //         if (game_info.hasClass("pre-game")) {
        //             game_time = $(".sib-custom-scores-header .ng-binding").text() + " " + game_info.find("span").eq(0).text();
        //         }
        //         console.log(games.length);
        //     } else {
        //         msg = "今天沒有比賽喔！"
        //     }
        //     resolve(msg);
        // });
    })
}