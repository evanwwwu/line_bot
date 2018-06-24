const nodejieba = require("nodejieba");

class jieba { 
    constructor() {
        
    }
    cut(input) {
        return new Promise((resolve, reject) => {
            let result = nodejieba.cut(input);
            resolve(result);
        })
    }
}
module.exports = jieba;