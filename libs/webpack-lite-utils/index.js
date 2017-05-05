
const fs = require('fs');
const glob = require('glob');
const path = require('path');

function readJson(path){
    if(fs.existsSync(path)){
        return JSON.parse(fs.readFileSync(path, 'utf8'));
    }else{
        return null;
    }
}
function getGitCommitHash(){
    return require('child_process').execSync('git log --pretty=format:"%H" -1',{encoding:'utf8'});
}


module.exports = function(src,root){
    return {
        getGitCommitHash,
        readJson,
        getManifestPath(name){
            return path.resolve(root, `./${name}.manifest.json`);
        },
        getStatsPath(name){
            return path.resolve(root,`./${name}.stats.json`)
        },
        getEntryFiles(ext){
            const entriesFiles = glob.sync(path.resolve(src,'**/*.entry.'+ext));

            const entry={};

            for(let file of entriesFiles){
                const part = file.split('.');
                part.pop();
                part.pop();
                let key =  path.relative(src,part.join('.'));

                entry[key] = file;
            }
            return entry;
        }
    }
}
