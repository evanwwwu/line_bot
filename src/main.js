const
    config = (process.env.MODE === 'production')? process.env : require("../config"),
    axios = require("axios"),
    linebot = require("linebot"),
    express = require("express"),
    FormData = require('form-data'),
    app = express();

const version = "1.0";
const consolere = require('console-remote-client').connect('console.re', '80', config.consoleRe);
const bot = linebot({
    channelId: config.CHANNER_ID,
    channelSecret: config.CHANNEL_SECRET,
    channelAccessToken: config.ACCESS_TOKEN
});

const linebotParser = bot.parser();

app.post("/", linebotParser);

app.get("/test", function (req, res) {
    res.sendFile(__dirname +"/index.html");
});

bot.on('message', async function (event) {
    try {
        const {
            type,
            text
        } = event.message;
        console.log(event);
        console.re.log(event);
        const group_id = event.source.groupId;
        const room_id = event.source.roomId;
        const user_id = event.source.userId;
        const base_id = group_id || room_id;

        if (type == 'text') {
            if (/^[！!]起床/.test(text)) {
                event.reply('我起床了！');
            }
            if (/^[!！]開團規則/.test(text)) {
                const roleStr = "!起床 => 我有可能會休眠，所以記得叫我起床\n\n!開團 {團名}\nEx：!開團 可不可\n\n!+1 {品項名稱} {金額}\nEx：!+1 熟成紅茶/半糖少冰/大,熟成紅茶/半糖少冰/中 35+25 (品項\"請勿使用空白,可使用','分隔\")\n\n!-1 => 刪除自己的項目\n\n!結單 => 關閉此訂單，無法在+1\n\n!名單 => 可查看名單";
                event.reply(roleStr);
            }
            if (/^[!！]開團/.test(text)) {
                let userData;
                if (event.source.type == 'room') {
                    userData = await bot.getRoomMemberProfile(room_id, user_id)
                } else if (event.source.type == 'group') {
                    userData = await bot.getGroupMemberProfile(group_id, user_id)
                } else {
                    userData = await bot.getUserProfile(user_id);
                }
                let datas = text.split(/\s+/);
                let bodyData = new FormData();
                bodyData.append('name', userData.displayName);
                bodyData.append('tabName', datas[1]);
                bodyData.append('method', 'addTab');
                let res = await axios.post('https://script.google.com/macros/s/AKfycbxF8ZEohmFDzebTWpSq6v-RGIOA7pVhxGc04D28Mw8Ku03g5FA/exec', bodyData, {
                    headers: bodyData.getHeaders(),
                });
                let result = res.data;
                if (result) {
                    if (!result.error) {
                        event.reply('開團成功');
                    } else if (result.msg) {
                        event.reply(result.msg)
                    } else {
                        event.reply('系統錯誤')
                    }
                }
            }
            if (/^[!！][+＋]1/.test(text)) {
                let userData;
                if (event.source.type == 'room') {
                    userData = await bot.getRoomMemberProfile(room_id, user_id)
                } else if (event.source.type == 'group') {
                    userData = await bot.getGroupMemberProfile(group_id, user_id)
                } else {
                    userData = await bot.getUserProfile(user_id);
                }
                let datas = text.replace(/[+＋]1/, '').split(/\s+/);
                let bodyData = new FormData();
                bodyData.append('name', userData.displayName);
                bodyData.append('items', datas[1]);
                bodyData.append('money', datas[2]);
                bodyData.append('method', 'addUser');
                let res = await axios.post('https://script.google.com/macros/s/AKfycbxF8ZEohmFDzebTWpSq6v-RGIOA7pVhxGc04D28Mw8Ku03g5FA/exec', bodyData, {
                    headers: bodyData.getHeaders(),
                });
                if(!res.data.error){
                    if (res.data.update) {
                        event.reply('更新成功')
                    } else {
                        event.reply('新增完成');
                    }
                } else {
                    event.reply(res.data.msg);
                }
            }
            if (/^[!！][-]1/.test(text)) {
                let userData;
                if (event.source.type == 'room') {
                    userData = await bot.getRoomMemberProfile(room_id, user_id)
                } else if (event.source.type == 'group') {
                    userData = await bot.getGroupMemberProfile(group_id, user_id)
                } else {
                    userData = await bot.getUserProfile(user_id);
                }
                let bodyData = new FormData();
                bodyData.append('name', userData.displayName);
                bodyData.append('method', 'delUser');
                let res = await axios.post('https://script.google.com/macros/s/AKfycbxF8ZEohmFDzebTWpSq6v-RGIOA7pVhxGc04D28Mw8Ku03g5FA/exec', bodyData, {
                    headers: bodyData.getHeaders(),
                });
                if (res.data.success) {
                    event.reply('刪除成功')
                }
            }
            if (/^[!！]結單/.test(text)) {
                let userData;
                if (event.source.type == 'room') {
                    userData = await bot.getRoomMemberProfile(room_id, user_id)
                } else if (event.source.type == 'group') {
                    userData = await bot.getGroupMemberProfile(group_id, user_id)
                } else {
                    userData = await bot.getUserProfile(user_id);
                }
                let bodyData = new FormData();
                bodyData.append('name', userData.displayName);
                bodyData.append('method', 'endTab');
                let res = await axios.post('https://script.google.com/macros/s/AKfycbxF8ZEohmFDzebTWpSq6v-RGIOA7pVhxGc04D28Mw8Ku03g5FA/exec', bodyData, {
                    headers: bodyData.getHeaders(),
                });
                if (res.data.success) {
                    event.reply('結單完成\nhttps://docs.google.com/spreadsheets/d/1hKTLKZmRrYs_y0gwayilD492iEOk4MgQn83jroTL1C4/edit?usp=sharing');
                }
            }
            if (/^[!！]名單/.test(text)) {
                event.reply('https://docs.google.com/spreadsheets/d/1hKTLKZmRrYs_y0gwayilD492iEOk4MgQn83jroTL1C4/edit?usp=sharing')
            }
            if (/^[!！]trx/i.test(text)) { 
                var newStr = text.replace(/[!！]trx/ig, '');
                if (/規則/.test(newStr)) {
                    const roleStr = '!起床 => 我有可能會休眠，所以記得叫我起床\n\n!trx {時間} +{人數}\n範例：!trx 6/19(三) +1\n\n!trx 名單 => 可查看名單\n\n!trx 我對不起社會大眾,請讓我翹課 => 取消預約'
                    event.reply(roleStr);
                }
                if (/名單/.test(newStr)) {
                    event.reply('https://docs.google.com/spreadsheets/d/1lKXoQrymYnH_i2S8e7MjMR9FErWkzVmJaQgjJcDWcg0/edit?usp=sharing');
                }
                if (/[+＋]\d+/.test(newStr)) {
                    let userData;
                    if (event.source.type == 'room') {
                        userData = await bot.getRoomMemberProfile(room_id, user_id)
                    } else if (event.source.type == 'group') {
                        userData = await bot.getGroupMemberProfile(group_id, user_id)
                    } else {
                        userData = await bot.getUserProfile(user_id);            
                    }
                    let datas = newStr.replace(/[+＋]/, '').split(/\s+/);
                    
                    let bodyData = new FormData();
                    bodyData.append('name', userData.displayName);
                    bodyData.append('date', datas[1]);
                    bodyData.append('num', datas[2]);
                    let res = await axios.post('https://script.google.com/macros/s/AKfycbwwC--_39aBvQJ5u8dPTlUCYtIeGL-QGh7Y-p21afQhD3HcLpNh/exec', bodyData, {
                        headers: bodyData.getHeaders(),
                    });
                    console.log(res.data);
                    if (res.data.length > 1) {
                        event.reply('更新成功')
                    } else if (res.data.length > 0) {
                        event.reply('報名成功')
                    }
                }
                if (/我對不起社會大眾[\s,，]請讓我翹課/.test(newStr)) {
                    let userData;
                    if (event.source.type == 'room') {
                        userData = await bot.getRoomMemberProfile(room_id, user_id)
                    } else if (event.source.type == 'group') {
                        userData = await bot.getGroupMemberProfile(group_id, user_id)
                    } else {
                        userData = await bot.getUserProfile(user_id);
                    }
                    let bodyData = new FormData();
                    bodyData.append('name', userData.displayName);
                    bodyData.append('method', 'delUser');
                    let res = await axios.post('https://script.google.com/macros/s/AKfycbwwC--_39aBvQJ5u8dPTlUCYtIeGL-QGh7Y-p21afQhD3HcLpNh/exec', bodyData, {
                        headers: bodyData.getHeaders(),
                    });
                    console.log(res.data);
                    if (res.data.length > 0) {
                        event.reply('翹課完成');
                    } else {
                        event.reply('你沒有報名喔！')
                    }
                }
            }
        }
    }
    catch (err) {
        console.error(err);
        console.re.debug(err);
        event.reply('系統錯誤')
    }
});

app.set('port', (process.env.PORT || 5002));
app.listen(app.get("port"), function () {
    console.log("running on port %s version：%s ", app.get("port"),version);
})