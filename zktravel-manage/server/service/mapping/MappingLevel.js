
// bit:     6    |    5    |    4    |   3   |    2    |   1   |   0 
// tag:  web_url     city    address   phone    gps500   gps50   hname


const keyLevelMap = {
  //[0b6543210]
    [0b0001111]: 'L0-nt',   //15
    [0b0010111]: 'L0-na',   //23
    [0b0000111]: 'L1-n',    //7
    [0b0001110]: 'L1-t',    //14
    [0b0010110]: 'L1-a',    //22
    [0b0010101]: 'L1-na',   //21
    [0b0001101]: 'L2-nt',   //13
    [0b0011100]: 'L2-ta',   //28
    [0b0000101]: 'L3-n',    //5
    [0b0001100]: 'L3-t',    //12
    [0b0010100]: 'L3-a',    //20
    [0b0100001]: 'L4-nc',   //33
    [0b0101000]: 'L4-tc',   //40
    [0b0110000]: 'L4-ac',   //48
    [0b1100000]: 'L4-wc',   //96
    [0b0000101]: 'L4-n',    //5
    [0b0001100]: 'L4-t',    //12
    [0b0010100]: 'L4-a',    //20
    [0b1000100]: 'L4-w'     //68
}

const maskKeys = [15, 23, 7, 14, 22, 21, 13, 28, 5, 12, 20, 33, 40, 48, 96, 5, 12, 20, 68];

module.exports = {
    getLevel(mapKey){
        for(let index=0; index<maskKeys.length; ++index){
            const maskKey = maskKeys[index];
            if( (mapKey&maskKey) === maskKey ){
                return index;
            }
        }
        return null;
    },
    getLevelDesc(mapKey){
        for(let maskKey of maskKeys){
            if( (mapKey&maskKey) === maskKey ){
                return keyLevelMap[maskKey];
            }
        }
        return null;
    },
    isHighest(mapKey){
        return (mapKey&0b0001111)===0b0001111 || (mapKey&0b0010111)===0b0010111
    }
}