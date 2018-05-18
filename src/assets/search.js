const
    request = require("request"),
    cheerio = require("cheerio"),
    axios = require("axios");

module.exports.search_hot = search_hot;
module.exports.check_ball = check_ball;

function search_hot(searchType) {
    return new Promise((resolve) => {
        if (searchType == "18+") {
            uri = "https://www.jkforum.net/forum-535-1.html";
        }
        else {
            uri = "https://www.jkforum.net/type-736-1938.html";
        }
        console.log("SH:", uri, searchType);
        request(uri, function (err, res, body) {
            try {
                const $ = cheerio.load(body);
                const hrefs = $("#waterfall li h3 a");
                let r = Math.round(Math.random() * (hrefs.length - 1));
                r = r % 2 === 1 ? r - 1 : r;
                const href = hrefs[r].attribs.href;
                request(`https://www.jkforum.net/${href}`, function (err2, res2, body2) {
                    const $ = cheerio.load(body2);
                    const srcs = $("#postlist td.t_f img");
                    const r = Math.round(Math.random() * (srcs.length - 1));
                    const src = srcs[r].attribs.zoomfile;
                    const result = {
                        type: "image",
                        originalContentUrl:src,
                        previewImageUrl: src
                    };
                    resolve(result);
                    console.log(JSON.stringify(result));
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
                }
                catch (err) {
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
                m = "沒事熱了一點而已，流點汗身體比較健康。"
            }
            return m;
        }
    });
}

function today_nba(today) {
    return new Promise((resolve) => {
        request("https://tw.global.nba.com/scores/#!/" + today, function (err, res, body) {
            const $ = cheerio.load(body);
            const hrefs = $("#waterfall li h3 a");
        });
    });
}