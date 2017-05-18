const session = require('koa-session');
const os = require('os');
const path = require('path');
const fs = require('fs');

const sdir = path.resolve(os.tmpdir(), '.koasess');

const store = {
    get(key){
        const spath = path.resolve(sdir, key);
        try{
            if(fs.existsSync(spath)){
                return JSON.parse(fs.readFileSync(spath, 'utf8'));
            }
            return null;
        }catch(e){
            console.error(e);
            return null;
        }
    },
    set(key, sess, maxAge){
        try{
            if(!fs.existsSync(sdir)){
                fs.mkdirSync(sdir);
            }
            fs.writeFileSync(path.resolve(sdir, key), JSON.stringify(sess));
        }catch(e){
            console.error(e);
        }
    },
    destroy(key){
        try{
            const spath = path.resolve(sdir, key);
            if(fs.existsSync(spath)){
                fs.unlinkSync(spath);
            }
        }catch(e){
            console.err(e)
        }
    }
}


module.exports = function(options={}, app){
    if(!options.store){
        options.store = store;
    }
    return session(options, app);
}