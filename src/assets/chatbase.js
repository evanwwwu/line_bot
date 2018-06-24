const axios = require("axios");

class chatbase {
    constructor(options) {
        this.options = options || {};
        this.version = this.options.version || '';
        this.baseId = this.options.base_id || '';
        this.platform = this.options.platform || '';
        this.key = this.options.key || '';
        this.intent = this.options.intent || '';
    }

    //link bot
    click() {
        return new Promise((resolve) => {
            axios.post("https://chatbase.com/api/click", {
                "api_key": this.key,
                "url": "/chatbase",
                "platform": this.platform,
                "version": this.version,
                "user_id": "evan-001"
            })
            .then((result) => {
                resolve("done!");
            }).catch(err => {
                console.log(err);
            })
        })
    }

    user(msg) {
        axios.post("https://chatbase-area120.appspot.com/api/message", {
            "api_key": this.key,
            "type": "user",
            "platform": this.platform,
            "message": msg,
            "intent": this.intent,
            "version": this.version,
            "user_id": this.baseId
        });
    }

    agent(msg) {
        axios.post("https://chatbase-area120.appspot.com/api/message", {
            "api_key": this.key,
            "type": "agent",
            "platform": "line",
            "intent": this.intent,
            "message": msg,
            "version": this.version,
            "user_id": this.baseId
        });
    }

    not_handled() {
        axios.post("https://chatbase-area120.appspot.com/api/message", {
            "api_key": this.key,
            "type": "user",
            "platform": "line",
            "message": "not_handled",
            "not_handled": "true",
            "intent": this.intent,
            "version": this.version,
            "user_id": this.baseId
        });
    }

}

module.exports = chatbase;