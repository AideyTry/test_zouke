const https = require('https');
const { AppId, AppSecret } = requireRoot('env');
const parse = require('co-body');

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
}