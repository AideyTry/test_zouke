"use strict";


function parse(source,defs){
    const lines = source.split('\n');
    
    let code = `(function(){
const __$list__ = [];\n`;
    for(const [key,value] of Object.entries(defs)){
        code+=`const ${key} = ${JSON.stringify(value)};\n`;
    }
    for(let line of lines){
        const checkResult = checkLine(line);
        if(checkResult){
            switch(checkResult.condition){
                case 'if':
                    code+=`if(${checkResult.expr}){\n`;
                    break;
                case 'else':
                    code+='}else{\n';
                    break;
                case 'elif':
                    code+=`}else if(${checkResult.expr}){\n`;
                    break;
                case 'endif':
                    code+='}\n';
                    break;
            }
        }else{
            code+=`__$list__.push(${JSON.stringify(line)});\n`
        }
    }
    code+=`return __$list__;
})();`;
    //console.log(code);
    //return;
    try{
        const result = eval(code);
        return result.join('\n');
    }catch(e){
        throw new Error('error condition');
    }
}


function checkLine(line){
    const matchResult = line.match(/\/{3,}[\s]*#(if|else|elif|endif)([\s]+[\s\S]*)?$/);
    
    if(matchResult){
        const checkResult = {condition:matchResult[1],expr:(matchResult[2]||'').trim()};
        if(['if','elif'].includes(checkResult.condition)
            &&
            checkResult.expr===''
            ){
                return false;
        }
        return checkResult;
    }
    
    return false;
}

exports.parse = parse;
