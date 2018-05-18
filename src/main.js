

const
    config = require("../config"),    
    linebot = require("linebot"),
    express = require("express"),
    app = express();
const {search_hot, check_ball} = require("./assets/search");


const bot = linebot({
    channelId: config.CHANNER_ID,
    channelSecret: config.CHANNEL_SECRET,
    channelAccessToken: config.ACCESS_TOKEN
});

const linebotParser = bot.parser();

app.post("/", linebotParser);

bot.on('message', function (event) {
    console.log(event);
    const { type, text } = event.message;
    if (type == 'text'){
        if (/hot/.test(text.toLowerCase())) {
            let upg = "";
            if (/\!{2,}/.test(text)) {
                upg = "18+";
            }
            search_hot(upg).then((data) => {
                // console.log("data::",data);
                event.reply(data);
            })
        }
        if (/打球$/.test(text)) {
            // let data = check_ball();
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
    }
});
app.set('port', (process.env.PORT || 5002));
app.listen(app.get("port"), function () {
    console.log("running on port ", app.get("port"));
})