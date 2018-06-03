const
    config = require("../config"),
    linebot = require("linebot"),
    express = require("express"),
    app = express();
const {
    search_hot,
    check_ball,
    search_nba,
    random_card,
    get_ticket,
    search_img
} = require("./assets/search");


const bot = linebot({
    channelId: config.CHANNER_ID,
    channelSecret: config.CHANNEL_SECRET,
    channelAccessToken: config.ACCESS_TOKEN
});

const linebotParser = bot.parser();

app.post("/", linebotParser);

bot.on('message', function (event) {
    try {
        console.log(event);
        const {
            type,
            text
        } = event.message;
        const group_id = event.source.groupId;

        if (type == 'text') {
            if (/hot/.test(text.toLowerCase())) {
                let upg = "";
                if (/!{2,}/.test(text)) {
                    upg = "18+";
                }
                search_hot(upg).then((data) => {
                    console.log("data::", data);
                    event.reply(data);
                })
            }
            if (/打球/.test(text)) {
                check_ball().then((data) => {
                    let msg_obj = {
                        type: "text",
                        text: "大同高中氣象: 降雨機率:" + data.pop + "   溫度:" + data.temp + "\n" + data.msg,
                    }
                    event.reply(msg_obj);
                });
            }
            if (/老司機/.test(text)) {
                event.reply({
                    type: "image",
                    originalContentUrl: "https://i.imgur.com/bCvzCy4l.png",
                    previewImageUrl: "https://i.imgur.com/bCvzCy4l.png"
                })
            }
            if (/作者/.test(text)) {
                console.log(group_id);
                bot.getGroupMemberProfile("Cada635717317ff283d8896b1b09650cc", "U6edf01250c0ddf605be496a860c2f395").then((user) => {
                    event.reply(["@" + user.displayName, {
                        type: "image",
                        originalContentUrl: "https://profile.line-scdn.net/0h11Y679D8bh5kT0D5ZcQRSVgKYHMTYWhWHH4pfBYbZSdPKn1MWn52eUlOMydBfi0fWXkjekdPOC9N",
                        previewImageUrl: "https://profile.line-scdn.net/0h11Y679D8bh5kT0D5ZcQRSVgKYHMTYWhWHH4pfBYbZSdPKn1MWn52eUlOMydBfi0fWXkjekdPOC9N"
                    }]);
                })
            }
            if (/危險/.test(text)) {
                event.reply([{
                    type: "sticker",
                    packageId: "1",
                    stickerId: "423"
                }, {
                    type: "sticker",
                    packageId: "1",
                    stickerId: "423"
                }, {
                    type: "sticker",
                    packageId: "1",
                    stickerId: "423"
                }, {
                    type: "sticker",
                    packageId: "1",
                    stickerId: "423"
                }]);
            }
            if (/fuckjr/.test(text.toLowerCase())) {
                event.reply({
                    type: "image",
                    originalContentUrl: "https://pbs.twimg.com/media/Dek4f7zU0AAcsfq.jpg:large",
                    previewImageUrl: "https://pbs.twimg.com/media/Dek4f7zU0AAcsfq.jpg:large"
                });
            }
            if (/^[!！]nba/.test(text.toLowerCase())) {
                let date_type = "";
                if (typeof text.split(/\s+/)[1] !== "undefined") {
                    if (/next/.test(text.split(/\s+/)[1].toLowerCase())) {
                        date_type = "next";
                    } else {
                        let search_date = text.split(/\s+/)[1].split("-");
                        let date_format = new Date(search_date[0] + "-" + search_date[1] + "-" + search_date[2]);
                        if (date_format.getFullYear() == search_date[0] && (date_format.getMonth() + 1) == search_date[1] && date_format.getDate() == search_date[2]) {
                            date_type = text.split(/\s+/)[1];
                        }
                    }
                }
                search_nba(date_type).then((data) => {
                    event.reply(data);
                });
            }
            if (/^翻牌$/.test(text)) {
                random_card().then((name) => {
                    console.log(name);
                    event.reply(name);
                });
            }
            if (/^[!！]領票/.test(text)) {
                let search = "";
                if (typeof text.split(/\s+/)[1] !== "undefined") {
                    search = text.split(/\s+/)[1]
                }
                get_ticket(search).then((data) => {
                    event.reply(data);
                });
            }
            if (/^[#＃]/.test(text)) {
                search_img(text.replace(/[#＃]+/, "")).then((data) => {
                    console.log(data);
                    // event.reply([data]);
                })
            }
        }
    }
    catch (err) {
        console.error(err);
    }
});

app.set('port', (process.env.PORT || 5002));
app.listen(app.get("port"), function () {
    console.log("running on port ", app.get("port"));
})