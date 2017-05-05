/**
 * Created by wangkehan on 16/7/14.
 */

import base64encode from './base64encode';
import privatePart from './privatePart';
import {platform} from './utilHelper';
import config from '../../config';
const qiniuTokenUrl = config['qiniu-token-url']


const TimeoutError = (()=>{
    const _ = privatePart();
    class TimeoutError extends Error{
        constructor(...arg){
            super(...arg);
            _(this).type = TimeoutError;
        }
        static isInstance(error){
            return _(error).type === TimeoutError;
        }
    }
    return TimeoutError;
})();


function resolveResponse(response){
    if(response.status>=200&&response.status<300){
        return response.json();
    }else{
        toast(`${response.status}:${response.statusText}`);
        return Promise.reject({code:response.status,msg:response.statusText});
    }
}
function resolveJSON(json){
    if(json.code<0){
        toast(json.msg);
        throw json;
    }
    return json;
}
function catchHttpError(e){
    if(TimeoutError.isInstance(e)){
        toast('网络超时');
        return Promise.reject({code:-504,msg:'timeout'});
    }else{
        toast('网络异常');
        return Promise.reject({ code : - 500, msg : 'httpError' });
    }
}


function fetchAsync(url,{method="POST",headers={},data,timeout=0}={}){
    headers = Object.assign({
        "X-Requested-With" : "XMLHttpRequest",
        "credentials" : 'same-origin',
        "Content-Type" : "application/x-www-form-urlencoded; charset=UTF-8"
    }, headers);

    const opt = {
        method,
        headers,
        credentials : 'same-origin',
    };
    if(data){
        opt.body = JSON.stringify(data);
    }

    const p = window.fetch(url, opt);
    if(timeout){
        return new Promise(function(r,j){
            const clearId = setTimeout(j,timeout,new TimeoutError('timeout'));
            p.then(r).catch(j);
        });
    }else{
        return p;
    }
}


function postJSONAsync(url, data,timeout=0){
    return fetchAsync(url, {
        data,
        headers : { "Content-Type" : "application/JSON; charset=UTF-8" },
        timeout
    }).catch(catchHttpError).then(resolveResponse).then(resolveJSON);
}



let $input = null;//file input;
let _r=null;

function chooseFileAsync({multiple=false,accept=''}={}){
    if(!$input){
        $input = document.createElement('input');
        $input.type='file';
        $input.on('change',e=>{
            _r&&_r([...e.target.files]);
            _r=null;
            $input.value='';
        })
    }

    if(!platform.isAndroid()){
        //android 不支持multiple (奇怪的机型会打不开相册)
        if('multiple' in $input && $input.multiple!==multiple){
            $input.multiple = multiple;
        }
    }

    $input.accept=accept;
    $input.click();

    return new Promise(r=>{
        _r=r;
    });
}


const qiniu={
    CHUNK_SIZE:4<<20,//4MB
    _uploadChunk(url,token,chunkBlob){
        return window.fetch(url,{
            method:'POST',
            body:chunkBlob,
            headers:{
                'Authorization':'UpToken '+token,
                'Content-Type':'application/octet-stream'
            }
        }).then(res=>res.json());
    },
    uploadDirectAsync(upload,token,file,key){
        //upload cdn上传地址
        const formdata=new FormData();
        formdata.append('key', key);
        formdata.append('token', token);
        formdata.append('file', file);

        return window.fetch(upload,{
            method:'POST',
            body:formdata
        }).then(res=>res.json());
    },

    uploadByBlock(upload,token,file,key){
        //upload cdn上传地址
        const chunks=Math.ceil(file.size/this.CHUNK_SIZE);
        const lastChunkSize=file.size-this.CHUNK_SIZE*(chunks-1);
        const blockCtxPL=[];

        for(let i=0;i<chunks;++i){
            const last=(i===chunks-1);//最后一片
            const chunkBlob=last?file.slice(i*this.CHUNK_SIZE):file.slice(i*this.CHUNK_SIZE,(i+1)*this.CHUNK_SIZE);
            blockCtxPL.push(this._uploadChunk(`${upload}mkblk/${last?lastChunkSize:this.CHUNK_SIZE}?name=${key}&chunk=${i}&chunks=${chunks}`,token,chunkBlob).then(r=>r.ctx));
        }

        return Promise.all(blockCtxPL).then(blockCtx=>{
            return window.fetch(`${upload}/mkfile/${file.size}/key/${key}/fname/${key}`,{
                method:'POST',
                headers:{
                    'Authorization':'UpToken '+token,
                    'Content-Type':'text/plain;charset=UTF-8'
                },
                body:blockCtx.join(',')
            });
        }).then(res=>res.json())
    },
    getImageInfoAsync(url){
        return window.fetch(url+'?imageInfo').then(res=>{
            return res.json();
        }).then(json=>{
            if(json.code) throw json.error;
            return json;
        });
    }
};

function uploadFileToQNAsync(upload,token, file, key){
    if(file.size<qiniu.CHUNK_SIZE){
        return qiniu.uploadDirectAsync(upload,token,file,key);
    }else{
        return qiniu.uploadByBlock(upload,token,file,key);
    }
}

function uploadFileAsync(file,prefix='weix'){
    let token,cdn,upload;
    return postJSONAsync(qiniuTokenUrl).then(json=>{
        token = json.token;
        upload = json.upload; //上传七牛地址（cdn）
        cdn = json.cdn;
        return uploadFileToQNAsync(
            upload,
            token, 
            file, 
            `${prefix}/${new Date().valueOf()}_${Math.round(Math.random() * 10000)}_${base64encode(file.name)}${getFileExtension(files[i])}`
        );
    }).then(r=>{
        r.url = cdn+r.key;
        delete r.key;
        return r;
    })
}
function uploadFileListAsync(files,prefix='weix'){
    if(files.length===0) return Promise.resolve([]);
    let token,cdn,upload;
    const timestamp=(new Date()).valueOf();

    return postJSONAsync(qiniuTokenUrl).then(json=>{
        token = json.token;
        upload = json.upload;
        cdn = json.cdn;
        const r = [];

        for(let i = 0;i<files.length;++i){
            r.push(uploadFileToQNAsync(
                upload,
                token,
                files[i],
                `${prefix}/${timestamp}_${Math.round(Math.random() * 10000)}_${base64encode(files[i].name)}${getFileExtension(files[i])}`
            ).then(r=>{
                r.url = encodeURI(cdn+r.key);
                delete r.key;
                return r;
            }).catch(e=>{return e;}))
        }

        return Promise.all(r);
    });
}

function getFileExtension(file){
    switch(file.type){
        case 'image/jpeg':
            return '.jpg';
        case 'image/png':
            return '.png';
        case 'image/gif':
            return '.gif';
        case 'image/svg+xml':
            return '.svg';
        case 'text/html':
            return '.html';
        case 'application/json':
        case 'text/json':
            return '.json';
        case 'text/xml':
        case 'application/xml':
            return '.xml';
    }

    const namePart = file.name.split('.');
    const lastPart = namePart[namePart.length-1];
    if(/^[a-zA_Z1-9]{1,8}$/.test(lastPart)){
        return '.'+lastPart;
    }else{
        return '';
    }
}

export {
    fetchAsync,
    postJSONAsync,
    chooseFileAsync,
    uploadFileAsync,
    uploadFileListAsync,
    TimeoutError
}