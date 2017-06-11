const Pretreatment = require('../service/mapping/Pretreatment');

function compare(d1, d2){
    if(d1.name!==d2.name) return false;
    if(d1.name_en!==d2.name_en) return false;
    if(d1.address!==d2.address) return false;
    if(d1.phone!==d2.phone) return false;
    if(d1.url_web!==d2.url_web) return false;
    return true;
}

const testCase = [
    {
        before: { name: '這是+ 個 -   測試酒店饭店' },
        after: { name: '这是&个测试' }
    },
    {
        before: { name_en: '  This./ is a test no:: hÕtel-  nÅmÊ ' },
        after: { name_en: 'this is a test name' }
    },
    {
        before: { address: 'this is a (test只) no: adDresş | s ./ & s. en+strasse a, now show 测试' },
        after: { address: 'this is a address san and san en and str a' }
    },
    {
        before: { phone: '0086 14-68 9 tel 234' },
        after: { phone: '8614689234' }
    },
    {
        before: { phone: '123456' },
        after: { phone: '86123456' }
    },
    {
        before: { phone: '+12456' },
        after: { phone: '8612456' }
    }
].map( r => { r.isSai=true; r.areaCode='86'; return r; } );

module.exports = function(){
    for(let c of testCase){
        const cResult = Pretreatment.convert(c.before, { isSai: c.isSai, areaCode: c.areaCode });
        delete cResult._v;
        if(compare(cResult, c.after)) continue;

        console.log("before: ", JSON.stringify(c.before) );
        console.log("isSAI: ", c.isSai);
        console.log('areaCode: ', c.areaCode)
        console.log("pretreatment result:\t ", JSON.stringify(cResult));
        console.log("expect result\t\t", JSON.stringify(c.after));
        throw new Error('pretreatment test fail')
    }

    return 'pretreatment test pass';
}