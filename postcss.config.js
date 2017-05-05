const autoprefixer = require('autoprefixer');

module.exports = {
    plugins:[
        autoprefixer({
            cascade:false,
            browsers:['iOS >= 7.0.4', 'Android >= 4.2.2','ff >= 45','ie >= 9','Edge >= 12','Chrome >= 37']
        })
    ]
};