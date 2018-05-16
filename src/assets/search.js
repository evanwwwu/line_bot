const
    request = require("request"),
    cheerio = require("cheerio"),
    axios = require("axios");

module.exports.search_hot = search_hot;
module.exports.check_ball = check_ball;

function search_hot(type) {
    return new Promise((resolve) => {
        if (type == "18+") {
            uri = "https://www.jkforum.net/forum-535-1.html";
        }
        else {
            uri = "https://www.jkforum.net/type-736-1938.html";
        }
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