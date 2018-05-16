const
    request = require("request"),
    cheerio = require("cheerio"),
    axios = require("axios");

module.exports.search_hot = search_hot;


function search_hot() {
    return new Promise((resolve) => {
        request("https://www.jkforum.net/forum-736-1.html", function (err, res, body) {
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