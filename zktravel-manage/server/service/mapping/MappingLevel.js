
// bit:     6    |    5    |    4    |   3   |    2    |   1   |   0 
// tag:  web_url     city    address   phone    gps500   gps50   hname


const keyLevelMap = {
  //[0b6543210]
    [0b0001111]: 'L0-nt',
    [0b0010111]: 'L0-na',
    [0b0000111]: 'L1-n',
    [0b0001110]: 'L1-t',
    [0b0010110]: 'L1-a',
    [0b0010101]: 'L1-na',
    [0b0001101]: 'L2-nt',
    [0b0011100]: 'L2-ta',
    [0b0000101]: 'L3-n',
    [0b0001100]: 'L3-t',
    [0b0010100]: 'L3-a',
    [0b0100001]: 'L4-nc',
    [0b0101000]: 'L4-tc',
    [0b0110000]: 'L4-ac',
    [0b1100000]: 'L4-wc',
    [0b0000101]: 'L4-n',
    [0b0001100]: 'L4-t',
    [0b0010100]: 'L4-a',
    [0b1000100]: 'L4-w'
}

const maskKeys = Object.keys(keyLevelMap);

module.exports = {
    getLevel(mapKey){
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