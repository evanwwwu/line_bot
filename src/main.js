

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
        const { type, text } = event.message;
        if (type == 'text') {
        if (/hot/.test(text.toLowerCase())) {
            let type = "";
            if (/!{2,}/.test(text)) {
                type = "18+";
            }
            search_hot(type).then((data) => {
                console.log("data::",data);
                event.reply(data);
            })
        }
        if (/打球$/.test(text)) {
            let data = check_ball();
            event.reply(data);
        }
        if (/^!nba/.test(text.toLowerCase())) {
            let date_type = "";
            if (typeof text.split(/\s+/)[1] !== "undefined") {
                let search_date = text.split(/\s+/)[1].split("-");
                let date_format = new Date(search_date[0] + "-" + search_date[1] + "-" + search_date[2]);
                if (date_format.getFullYear() == search_date[0] && (date_format.getMonth() + 1) == search_date[1] && date_format.getDate() == search_date[2]) {
                    date_type = text.split(/\s+/)[1];
                }
                console.log(date_format.getFullYear() == search_date[0], (date_format.getMonth() + 1) == search_date[1], date_format.getDate() == search_date[2])
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