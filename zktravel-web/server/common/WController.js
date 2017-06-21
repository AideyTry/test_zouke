const Controller = require('@local/koa-mvc/Controller');
const redis = requireRoot('redis');
const dbclient = requireRoot('dbclient');

const PHPSESSIONKEY = Symbol('#phpsession');
const USERINFOKEY = Symbol('#USERINFOKEY');

module.exports = class WController extends Controller {
    async $getPhpSession(){
        const cached = this[PHPSESSIONKEY];
        if(cached!==undefined) return cached;

        const phpsessid = this.cookies.get('PHPSESSID', {signed:false});
        if(!phpsessid) {
            this[PHPSESSIONKEY] = null;
            return null;
        }
        const phpsessionstr = await redis.get('PHPSESSION').getAsync(`zktr_${phpsessid}`);
        if(!phpsessionstr){
            this[PHPSESSIONKEY] = null;
            return null;
        }
        const phpsession = JSON.parse(phpsessionstr);
        this[PHPSESSIONKEY] = phpsession;
        return phpsession;
    }
    async $getUid(){
        const phpsession = await this.$getPhpSession();
        if(!phpsession) return null;
        return phpsession.__id;
    }
    async $getUser(){
        const cached = this[USERINFOKEY];
        if(cached!==undefined) return cached;

        const uid = await this.$getUid();
        if(!uid) {
            this[USERINFOKEY] = null;
            return null;
        }
        const result = await (await dbclient.collections.get('wx_user')).findOne({_id: uid});
        this[USERINFOKEY] = result;
        return result;
    }
}