const { DEBUG } = requireRoot('../../config');

if (DEBUG) {
    module.exports.connectString = 'mongodb://zouke:zouke123@115.29.188.30:37100/zouke';
    //mongodb://zktravel:zktravel123@115.29.188.30:37100/zktravel
} else {
    module.exports.connectString = '';
}