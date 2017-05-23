
const crypto = require('crypto');
module.exports = class DES {
    constructor(key, iv=0){
        key = key.toString();
        if(key.length<8){
            for(let i = key.length;i<8;++i){
                key+='0';
            }
        }else{
            key = key.slice(0,8);
        }
        this._key = key;
        this._iv = iv;
    }
    encrypt(text){
        const key = new Buffer(this._key);
        const iv = new Buffer(this._iv ? this._iv : 0);
        const cipher = crypto.createCipheriv('des-ecb', key, iv);
        cipher.setAutoPadding(true) //default true
        let ciph = cipher.update(text, 'utf8', 'base64');
        ciph += cipher.final('base64');
        return ciph;
    }
    decrypt(encrypt){
        const key = new Buffer(this._key);
        const iv = new Buffer(this._iv ? this._iv : 0);
        const decipher = crypto.createDecipheriv('des-ecb', key, iv);
        decipher.setAutoPadding(true);
        let txt = decipher.update(encrypt, 'base64', 'utf8');
        txt += decipher.final('utf8');
        return txt;
    }
};