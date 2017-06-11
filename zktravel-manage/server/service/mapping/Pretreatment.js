const { sp_collection_name, zk_collection_name } = require('../config');
//const dbclient = requireRoot('db');

const charMapStr = 'Ä-A、ä-a、Á-A、á-a、À-A、à-a、Â-A、â-a、Ą-A、ą-a、Å-A、 å-a、Ã-A、ã-a、Ă-A、ă-a、Ç-C、ç-c、Ć-C、ć-c、Č-C、č-c、Ď-D、ď-d、ð-d、Ё -E、ë-e、È=E、è-e、É-E、é-e、Ê-E、ê-e、Ę-E、ę-e、Ě-E、ě-e、Ğ-G、ğ-g、Î-I、î-i、Ì-I、ì-i、Í-I、í-i、Ï-I、ï-i、Ł-L、ł-l、Й-N、й-n、Ň-N、ň-n、Ń-N、ń-n、Ó-O、ó-o、Ò-O、ò-o、Ô-O、ô-o、Ö-O、ö-o、ø-o、Õ-O、õ-o、Ř-R、ř-r、Š-S、š-s、Ş-S、ş-s、Ś-S、ś-s、Ș-S、ș-s、ß-ss、Ť-T、ť-t、Ț-T、ţ-t、Ű-U、ű-u、Ü-U、ü-u、Ú-U、ú-u、Ù-U、ù-u、Ů-U、ů-u、Ÿ-Y 、ÿ-y、Ý-Y、ý-y、Ź-Z、ź-z、Ż-Z、ż-z、Ž-Z、ž-z、Æ-AE、æ-ae、Ǽ-AE、Ǣ-AE 、Dž-Dz、dź-dz';

const charMap = charMapStr.split('、').map(p=>{
    const [key,value] = p.split('-');
    return { key, value };
})

function convertEnStringCommon(str){
    //酒店英文名，酒店地址预处理
    for(let keyValue of charMap){
        str = str.replace(new RegExp(keyValue.key,'g'),keyValue.value);
    }
    str = str.toLowerCase();
    str = str.replace(/no:/g, ' ');
    str = str.replace(/[:|\-,."'/\\]/g, ' ');
    str = str.replace(/&|\+/g, ' and ');
    return str;
}

function convertAddress(address, isSai/*sai酒店库*/){
    if(isSai) address = address.split(',')[0];
    address = convertEnStringCommon(address);
    address = address.replace(/\([\s\S]*\)/g,'');
    address = address.replace(/ strasse /g, ' str ');
    address = address.replace(/ s\.? /g, ' san ');
    address = address.replace(/\s+/g, ' ');
    address = address.trim();
    return address;
}

function convertEnName(enName){
    enName = convertEnStringCommon(enName, false);
    enName = enName.replace(/hotel|hostel/g, '').trim();
    enName = enName.replace(/\s+/g, ' ');
    enName = enName.trim();
    return enName;
}


const opencc = new (require('opencc'))('t2s.json');

function convertChName(chName){
    chName = opencc.convertSync(chName);
    chName = chName.replace(/\+/g, '&');
    chName = chName.replace(/-|\s+|酒店|饭店|旅馆|公寓/g, '');
    return chName;
}

function convertPhone(phone, areaCode=''){
    phone = phone.replace(/\s+|[-.:/()（）a-zA-Z]/g, '');
    phone = phone.replace(/^\+?0*/,'');
    if(areaCode&&!phone.startsWith(areaCode)) phone = areaCode + phone;
    return phone;
}

function convertUrl(url){
    url = url.replace(/\s+/g, '');
    url = url.replace(/^https?:\/\//, '');
    url = url.replace(/\/+$/g,'');
    return url;
}

module.exports = class Pretreatment{
    static convert(hotel, { isSai=false, areaCode='' } = {}){
        const pret = {
            _v: Pretreatment.version
        };
        if(hotel.name){
            const n = convertChName(hotel.name);
            if(n) pret.name = n;
        }
        if(hotel.name_en){
            const n = convertEnName(hotel.name_en);
            if(n) pret.name_en = n;
        }
        if(hotel.phone){
            const p = convertPhone(hotel.phone, areaCode);
            if(p) pret.phone = p;
        }
        if(hotel.url_web){
            const u = convertUrl(hotel.url_web);
            if(u) pret.url_web = u;
        }
        if(hotel.address){
            const a = convertAddress(hotel.address, isSai);
            if(a) pret.address = a;
        }
        return pret;
    }
    static get version(){
        return '1.1';
    }
    static get field(){
        return 'map_pretreatment_field';
    }

    async _resolveCollection(name, resolveMode = false){
        const db = await dbclient.get();
        const collection = await db.collection(name);

        const cursor = collection.find({
            $or:[
                { [`${Pretreatment.field}._v`]: { $ne: Pretreatment.version } },
                { mode: 'U' }
            ]
        },{
             name: 1, name_en: 1, phone: 1, url_web: 1, address: 1
        });

        const count = await cursor.count();
        let updateCount = 0;
        if(count===0) return;

        return new Promise((resolve)=>{
            cursor.forEach(async hotel=>{
                try{
                    const $set = {
                        [Pretreatment.field]: Pretreatment.convert(hotel)
                    };
                    if(resolveMode){
                        $set['mode'] = 'R';
                    }
                    await collection.updateOne({ _id: hotel._id },{
                        $set
                    });
                }catch(e){
                    console.error(e);
                }
                ++updateCount;
                if(updateCount%10000 === 0){
                    console.log(updateCount);
                }
                if(updateCount>=count){
                    console.log(count);
                    resolve();
                }
            });
        });
    }
    async run(){
        console.log('--> zk_hotel pretreatment start')
        await this._resolveCollection(zk_collection_name, true);
        console.log('<-- zk_hotel pretreatment end');
        console.log('--> sp_hotel pretreatment start');
        await this._resolveCollection(sp_collection_name);   
        console.log('<-- sp_hotel pretreatment end');
    }
}