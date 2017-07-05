const https = require('https');
const { AppId, AppSecret } = requireRoot('env');
const parse = require('co-body');
const crypto = require('crypto');

module.exports = class Auth {
    getSessionKey(code){
        return new Promise((r,j)=>{
            const client = https.request({
                protocol: 'https:',
                host: 'api.weixin.qq.com',
                path: `/sns/jscode2session?appid=${AppId}&secret=${AppSecret}&js_code=${code}&grant_type=authorization_code`,
            }, async res=>{
                try{
                    const req = res.req;
                    delete res.req;
                    const waitParse = parse.json(res);
                    res.req = req;
                    const result = await waitParse;
                    r(result);
                }catch(e){
                    console.error(e);
                    return r(null);
                }
            }).on('error', e=>{
                j(e);
            }).end();
        })
    }
    validSign(rawData, session_key, signature){
        const sha1 = crypto.createHash('sha1');
        sha1.update(rawData+session_key);
        return sha1.digest('hex')===signature;
    }
    decryptData(session_key, encryptedData, iv){
        const sessionKey = new Buffer(session_key, 'base64');
        encryptedData = new Buffer(encryptedData, 'base64');
        iv = new Buffer(iv, 'base64');

        const decipher = crypto.createDecipheriv('aes-128-cbc', sessionKey, iv);
        decipher.setAutoPadding(true);
        let decoded = decipher.update(encryptedData, 'binary', 'utf8');
        decoded += decipher.final('utf8');
        decoded = JSON.parse(decoded);
        if(decoded.watermark.appid !== AppId){
            throw new Error('wrong appid');
        }
        return decoded;
    }
    async updateUser(userInfo){

    }
}