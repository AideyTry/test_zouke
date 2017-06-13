
const path = require('path');
const { DEBUG } = require('./config');

function s(p){
    return path.resolve(__dirname,p);
}


module.exports = {
    apps: [{
        name: 'zktravel-manage',
        script: s('./zktravel-manage/server/main.js'),
        watch: DEBUG ? [s('./zktravel-manage/server'), s('./libs/koa-mvc')] : false,
        instances: DEBUG ? 1 : 2,
        exec_mode: DEBUG ? 'frok' : 'cluster',
        out_file: s('./zktravel-manage/logs/out.log'),
        error_file: s('./zktravel-manage/logs/err.log'),
        merge_logs: true,
        log_date_format: 'YYYY-MM-DD HH:mm Z',
        node_args: DEBUG ? '--debug-port=9222 --inspect=9222' : ''
    }]
};
