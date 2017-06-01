const { sp_collection_name } = require('../config');
const dbclient = requireRoot('db');

const charMapStr = 'Ä-A、ä-a、Á-A、á-a、À-A、à-a、Â-A、â-a、Ą-A、ą-a、Å-A、 å-a、Ã-A、ã-a、Ç-C、ç-c、Ć-C、ć-c、Č-C、č-c、Ď-D、ď-d、ð-d、Ё -E、ë-e、È=E、è-e、É-E、é-e、Ê-E、ê-e、Ę-E、ę-e、Ě-E、ě-e、Ğ-G、ğ-g、Î-I、î-i、Ì-I、ì-i、Í-I、í-i、Ï-I、ï-i、Ł-L、ł-l、Й-N、й-n、Ń-N、ń-n、Ó-O、ó-o、Ò-O、ò-o、Ô-O、ô-o、Ö-O、ö-o、Õ-O、õ-o、Ř-R、ř-r、Š-S、š-s、Ş-S、ş-s、Ś-S、ś-s、Ť-T、ť-t、Ű-U、ű-u、Ü-U、ü-u、Ú-U、ú-u、Ù-U、ù-u、Ů-U、ů-u、Ÿ-Y 、ÿ-y、Ý-Y、ý-y、Ź-Z、ź-z、Ż-Z、ż-z、Ž-Z、ž-z、Æ-AE、æ-ae、Ǽ-AE、Ǣ-AE 、ß-s、ø-o、Dž-Dz、dź-dz';

const charMap = charMapStr.split('、').map(p=>{
    const [key,value] = p.split('-');
    return { key, value };
})

function convertAddress(address){
    address = address.replace(/[:|\-,."'/\\]/g, ' ');
    for(let keyValue of charMap){
        address = address.replace(new RegExp(keyValue.key,'g'),keyValue.value);
    }
    address = address.toLowerCase();
    address = address.replace(/no:/g, ' ');
    address = address.replace(/&|\+/g, ' and ');
    address = address.replace(/\s+/g, ' ');
    address = address.trim();
    return address;
}

function convertEnName(enName){
    enName = convertAddress(enName)
    enName = enName.replace(/hotel|hostel/g, '').trim();
    return enName;
}


const opencc = new (require('opencc'))('t2s.json');

function convertChName(chName){
    chName = opencc.convertSync(chName);
    chName = chName.replace(/\+/g, '&');
    chName = chName.replace(/-|\s+|酒店/g, '');
    return chName;
}

function convertPhone(phone){
    phone = phone.replace(/\s+|[-.:/()（）a-zA-Z]/g, '');
    phone = phone.replace(/^\+0+/,'');
    return phone;
}

function convertUrl(url){
    url = url.replace(/\s+/g, '');
    url = url.replace(/^https?:\/\//, '');
    url = url.replace(/\/+$/g,'');
    return url;
}

module.exports = class Pretreatment{
    static convert(hotel){
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
            const p = convertPhone(hotel.phone);
            if(p) pret.phone = p;
        }
        if(hotel.url_web){
            const u = convertUrl(hotel.url_web);
            if(u) pret.url_web = u;
        }
        if(hotel.address){
            const a = convertAddress(hotel.address);
            if(a) pret.address = a;
        }
        return pret;
    }
    static get version(){
        return '1.0';
    }
    static get field(){
        return 'map_pretreatment_field';
    }
    async run(){
        const db = await dbclient.get();
        const spCollection = await db.collection(sp_collection_name);

        const cursor = spCollection.find({
            [`${Pretreatment.field}._v`]: { $ne: Pretreatment.version }
        },{
             name: 1, name_en: 1, phone: 1, url_web: 1, address: 1
        });

        try{
            let hotel = null;
            while((hotel = await cursor.next())){
                await spCollection.updateOne({ _id: hotel._id },{
                    $set:{
                        [Pretreatment.field]: Pretreatment.convert(hotel)
                    }
                })
            }
        }catch(e){
            console.error(e);
        }

    }
}