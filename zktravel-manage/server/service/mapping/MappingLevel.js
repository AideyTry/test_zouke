// bit:     7    |    6    |    5    |   4   |    3    |    2    |   1   |   0 
// tag:  web_url     city    address   phone   gps1000    gps500   gps50   hname

const GPS1000 = 1<<3;
const GPS500 = 1<<2 | GPS1000;
const GPS50 = 1<<1 | GPS500;
const NAME = 1;
const PHONE = 1<<4;
const ADDRESS = 1<<5;
const CITY = 1<<6;
const WEBURL = 1<<7;

const L0_NT = NAME | PHONE | GPS50;
const L0_NA = NAME | ADDRESS | GPS50;
const L1_N = NAME | GPS50;
const L1_T = PHONE | GPS50;
const L1_A = ADDRESS | GPS50;
const L1_NA = NAME | ADDRESS | GPS500;
const L2_NT = NAME | PHONE | GPS500;
const L2_TA = PHONE | ADDRESS | GPS500;
const L3_N = NAME | GPS500;
const L3_T = PHONE | GPS500;
const L3_A = ADDRESS | GPS500;
const L3_NC = NAME | CITY;
const L3_AC = ADDRESS | CITY;
const L4_TC = PHONE | CITY;
const L4_WC = WEBURL | CITY;
const L4_N = NAME | GPS1000;
const L4_T = PHONE | GPS1000;
const L4_A = ADDRESS | GPS1000;
const L4_W = WEBURL | GPS1000;


const keyLevelMap = {
    [L0_NT]: 'L0-nt',
    [L0_NA]: 'L0-na',
    [L1_N]: 'L1-n',
    [L1_T]: 'L1-t',
    [L1_A]: 'L1-a',
    [L1_NA]: 'L1-na',
    [L2_NT]: 'L2-nt',
    [L2_TA]: 'L2-ta',
    [L3_N]: 'L3-n',
    [L3_T]: 'L3-t',
    [L3_A]: 'L3-a',
    [L3_NC]: 'L3-nc',
    [L3_AC]: 'L3-ac',
    [L4_TC]: 'L4-tc',
    [L4_WC]: 'L4-wc',
    [L4_N]: 'L4-n',
    [L4_T]: 'L4-t',
    [L4_A]: 'L4-a',
    [L4_W]: 'L4-w'
}

const maskKeys = [ 
    L0_NT, L0_NA, 
    L1_N, L1_T, L1_A, 
    L1_NA, L2_NT, L2_TA, 
    L3_N, L3_T, L3_A, 
    L3_NC, L3_AC, L4_TC, L4_WC, L4_N, L4_T, L4_A, L4_W 
];

module.exports = {
    GPS1000,
    GPS500,
    GPS50,
    NAME,
    PHONE,
    ADDRESS,
    CITY,
    WEBURL,

    getLevelRank(mapKey){
        for(let index=0; index<maskKeys.length; ++index){
            const maskKey = maskKeys[index];
            if( (mapKey&maskKey) === maskKey ){
                return index;
            }
        }
        return null;
    },
    getLevel(mapKey){
        for(let maskKey of maskKeys){
            if( (mapKey&maskKey) === maskKey ){
                return keyLevelMap[maskKey];
            }
        }
        return null;
    },
    isHighest(mapKey){
        return (mapKey&L0_NA)===L0_NA || (mapKey&L0_NT)===L0_NT;
    }
}