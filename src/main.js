const
    config = require("../config"),
    axios = require("axios"),
    linebot = require("linebot"),
    express = require("express"),
    chatbase = require("./assets/chatbase"),
    jieba = require("./assets/jieba"),
    app = express();

const version = "1.4";

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

app.get("/test", function (req, res) {
    console.log(__dirname);
    res.sendFile(__dirname +"/index.html");
});
bot.on('beacon', async (event) => {
    console.log("beacon", event);
    event.reply(JSON.stringify(event));
});

bot.on('message', function (event) {
    try {
        const {
            type,
            text
        } = event.message;
        console.log(event);
        const group_id = event.source.groupId;
        const user_id = event.source.userId;
        const base_id = group_id || user_id;

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
            else if (/打球/.test(text)) {
                check_ball().then((data) => {
                    let msg_obj = {
                        type: "text",
                        text: "大同高中氣象: 降雨機率:" + data.pop + "   溫度:" + data.temp + "\n" + data.msg,
                    }
                    event.reply(msg_obj);
                });
            }
            else if (/老司機/.test(text)) {
                // event.reply({
                //     type: "image",
                //     originalContentUrl: "https://i.imgur.com/bCvzCy4l.png",
                //     previewImageUrl: "https://i.imgur.com/bCvzCy4l.png"
                // })
            }
            else if (/作者/.test(text)) {
                bot.getGroupMemberProfile("Cada635717317ff283d8896b1b09650cc", "U6edf01250c0ddf605be496a860c2f395").then((user) => {
                    event.reply(["@" + user.displayName, {
                        type: "image",
                        originalContentUrl: "https://profile.line-scdn.net/0h11Y679D8bh5kT0D5ZcQRSVgKYHMTYWhWHH4pfBYbZSdPKn1MWn52eUlOMydBfi0fWXkjekdPOC9N",
                        previewImageUrl: "https://profile.line-scdn.net/0h11Y679D8bh5kT0D5ZcQRSVgKYHMTYWhWHH4pfBYbZSdPKn1MWn52eUlOMydBfi0fWXkjekdPOC9N"
                    }]);
                })
            }
            else if (/危險/.test(text)) {
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
            else if (/fuckjr/.test(text.toLowerCase())) {
                event.reply({
                    type: "image",
                    originalContentUrl: "https://pbs.twimg.com/media/Dek4f7zU0AAcsfq.jpg:large",
                    previewImageUrl: "https://pbs.twimg.com/media/Dek4f7zU0AAcsfq.jpg:large"
                });
            }
            else if (/^[!！]nba/.test(text.toLowerCase())) {
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
            else if (/^翻牌$/.test(text)) {
                random_card().then((name) => {
                    console.log(name);
                    event.reply(name);
                });
            }
            else if (/^[!！]＄/.test(text)) {
                let search = "";
                if (typeof text.split(/\s+/)[1] !== "undefined") {
                    search = text.split(/\s+/)[1];
                }
                get_ticket(search).then((data) => {
                    event.reply(data)
                });
            } else if (/正常/.test(text)) {
                let search = "";
                    event.reply("我很乖，沒亂說話")
            } 
            else if (/^[#＃]/.test(text)) {
                search_img(text.replace(/[#＃]+/, "")).then((data) => {
                    event.reply([data]);
                })
            }
            else if (/^\$/.test(text)) {
                new jieba().cut(text.replace(/\$/, "")).then((data) => {
                    let m = data.join("-");
                    event.reply(m);
               })
            }
            else if (/liff/.test(text)) {
                // -X POST https://api.line.me/liff/v1/apps \
                // -H "Authorization: Bearer {channel access token}" \
                // -H "Content-Type: application/json" \
                // -d '{
                // "view": {
                //     "type": "tall",  // compactm, tall, full
                //     "url": "https://b0ed503e.ngrok.io/test"
                // }
                // } '
                let liff = "1579514907-GDlZqXpw";
                event.reply(`line://app/${liff}`);
            }
            
            // if (user_id == "Uefa04a3428324659086b899f71dfb3e7" && /^群推$/.test(text)) {
            //     console.log("hi!!!!!");
            //     bot.push("Ccac311e33631a6da07f2c064781772ec", {
            //         "type": "text",
            //         "text": "群波"
            //     });
            // }
        }
    }
    catch (err) {
        console.error(err);
    }
});

app.set('port', (process.env.PORT || 5000));
app.listen(app.get("port"), function () {
    console.log("running on port ", app.get("port"));
})