const
    config = require("../config"),
    linebot = require("linebot"),
    express = require("express"),
    app = express();
const {
    search_hot,
    check_ball,
    search_nba
} = require("./assets/search");


const bot = linebot({
    channelId: config.CHANNER_ID,
    channelSecret: config.CHANNEL_SECRET,
    channelAccessToken: config.ACCESS_TOKEN
});

const linebotParser = bot.parser();

app.post("/", linebotParser);

bot.on('message', function (event) {
    console.log(event);
    const {
        type,
        text
    } = event.message;

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
        if (/打球$/.test(text)) {
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
    }
});
app.set('port', (process.env.PORT || 5002));
app.listen(app.get("port"), function () {
    console.log("running on port ", app.get("port"));
})