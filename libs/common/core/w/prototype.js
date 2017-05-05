Array.prototype.remove = function(item) {
    const index = this.indexOf(item);
    if (index !== -1) {
        this.splice(index, 1);
    }
};
Array.prototype.toggle = function(item){
    const index = this.indexOf(item);
    if(index !== -1){
        this.splice(index,1);
    }else{
        this.push(item);
    }
}

//Date format

const dayNameString = '日一二三四五六';
const monthNamesString = '一|二|三|四|五|六|七|八|九|十|十一|十二';

const defaultI18n = {
    dayNamesShort:dayNameString.split('').map(d=>'周'+d),
    dayNames:dayNameString.split('').map(d=>'星期'+d),
    monthNamesShort:monthNamesString.split('|').map(m=>m+'月'),
    monthNames:monthNamesString.split('|').map(m=>m+'月'),
    amPm:['上午','下午']
}
function pad(v,len=2){
    return v.toString().padStart(len,'0')
}

const formatFlags = {
    D: function(dateObj) {
        return dateObj.getDate();
    },
    DD: function(dateObj) {
        return pad(dateObj.getDate());
    },
    d: function(dateObj) {
        return dateObj.getDay();
    },
    dd: function(dateObj) {
        return pad(dateObj.getDay());
    },
    ddd: function(dateObj, i18n) {
        return i18n.dayNamesShort[dateObj.getDay()];
    },
    dddd: function(dateObj, i18n) {
        return i18n.dayNames[dateObj.getDay()];
    },
    M: function(dateObj) {
        return dateObj.getMonth() + 1;
    },
    MM: function(dateObj) {
        return pad(dateObj.getMonth() + 1);
    },
    MMM: function(dateObj, i18n) {
        return i18n.monthNamesShort[dateObj.getMonth()];
    },
    MMMM: function(dateObj, i18n) {
        return i18n.monthNames[dateObj.getMonth()];
    },
    YY: function(dateObj) {
        return String(dateObj.getFullYear()).substr(2);
    },
    YYYY: function(dateObj) {
        return dateObj.getFullYear();
    },
    h: function(dateObj) {
        return dateObj.getHours() % 12 || 12;
    },
    hh: function(dateObj) {
        return pad(dateObj.getHours() % 12 || 12);
    },
    H: function(dateObj) {
        return dateObj.getHours();
    },
    HH: function(dateObj) {
        return pad(dateObj.getHours());
    },
    m: function(dateObj) {
        return dateObj.getMinutes();
    },
    mm: function(dateObj) {
        return pad(dateObj.getMinutes());
    },
    s: function(dateObj) {
        return dateObj.getSeconds();
    },
    ss: function(dateObj) {
        return pad(dateObj.getSeconds());
    },
    S: function(dateObj) {
        return Math.round(dateObj.getMilliseconds() / 100);
    },
    SS: function(dateObj) {
        return pad(Math.round(dateObj.getMilliseconds() / 10), 2);
    },
    SSS: function(dateObj) {
        return pad(dateObj.getMilliseconds(), 3);
    },
    a: function(dateObj, i18n) {
        return dateObj.getHours() < 12 ? i18n.amPm[0] : i18n.amPm[1];
    },
    A: function(dateObj, i18n) {
        return dateObj.getHours() < 12 ? i18n.amPm[0].toUpperCase() : i18n.amPm[1].toUpperCase();
    },
    ZZ: function(dateObj) {
        var o = dateObj.getTimezoneOffset();
        return (o > 0 ? '-' : '+') + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4);
    }
};
const literal = /\[([^]*?)\]/gm;
const token = /d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|ZZ|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g;

const dayMS = 3600*1000*24;

Date.prototype.format = function(formatString,i18n){
    i18n = Object.assign({},defaultI18n,i18n);

    const literals = [];

    formatString = formatString.replace(literal,($0,$1)=>{
        literals.push($1);
        return '??';
    })
    formatString = formatString.replace(token,$0=>{
        return $0 in formatFlags?formatFlags[$0](this,i18n):$0.splice(1,$0.length-1);
    })

    return formatString.replace(/\?\?/g,()=>{
        return literals.shift();
    });
};
Date.prototype.daySpan = function(d){
    const from = new Date(this.format('YYYY-MM-DD',defaultI18n));
    const to = new Date(d.format('YYYY-MM-DD',defaultI18n));
    return (to.valueOf()-from.valueOf())/dayMS
}




//const reISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.{0,1}\d*))(?:Z|(\+|-)([\d|:]*))?$/;
const dateReg = /^(\d{4})-(\d{2})-(\d{2})/;

function createDateParser(reviver) {
    return function(key, value) {
        let parsedValue = value;
        if (typeof value === 'string' && dateReg.test(value)) {
            const d = new Date(value);
            if(!isNaN(d.valueOf())){
                parsedValue = d;
            }
        }

        return reviver?reviver(key,parsedValue):parsedValue;
    };
}

JSON.parseWithDate = function(text,reviver){
    return JSON.parse(text,createDateParser(reviver));
}
