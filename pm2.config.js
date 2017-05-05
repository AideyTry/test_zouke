
const path = require('path');

function s(p){
    return path.resolve(__dirname,p);
}

module.exports = {
    apps: [{
        name: 'zktravel-manage',
        script: s('./zktravel-manage/server/main.js'),
        watch: [s('./zktravel-manage/server')],
        instances: 4,
        exec_mode: 'cluster',
        out_file: s('./zktravel-manage/logs/out.log'),
        error_file: s('./zktravel-manage/logs/err.log'),
        log_date_format: 'YYYY-MM-DD HH:mm Z'
    }]
};
