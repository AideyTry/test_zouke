
const path = require('path');
const { DEBUG } = require('./config');

function s(p){
    return path.resolve(__dirname,p);
}

const serverLibs = [
    s('./libs/koa-mvc'), 
    s('./libs/des'), 
    s('./libs/compare'),
    s('./libs/mongodb-client'),
    s('./libs/task-queue'),
    s('./common')
];

function createApp(name, inspectPort){
    return {
        name,
        script: s(`./${name}/server/main.js`),
        watch: DEBUG ? [s(`./${name}/server`), ...serverLibs]: false,
        instances: DEBUG ? 1 : 4,
        exec_mode: DEBUG ? 'frok' : 'cluster',
        out_file: s(`./${name}/logs/out.log`),
        error_file: s(`./${name}/logs/err.log`),
        merge_logs: true,
        log_date_format: 'YYYY-MM-DD HH:mm Z',
        node_args: DEBUG ? `--debug-port=${inspectPort} --inspect=${inspectPort}` : ''
    }
}

module.exports = {
    apps: [
        Object.assign(
            createApp('zktravel-manage', 9222), 
            { instances: DEBUG ? 1 : 2 }
        ),

        createApp('zktravel-web', 9223)
    ]
};
