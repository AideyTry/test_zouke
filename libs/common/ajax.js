/**
 * Created by wangkehan on 16/10/17.
 */
import {fetchAsync,TimeoutError} from './core/w/net';

const lockSet={};
function mergeErrorHandler(raw,...merges){
    for(let merge of merges){
        if(!merge) continue;

        if(merge.before && (typeof merge.before === 'function')){
            raw.before = merge.before;
        }
        if(merge.after && (typeof merge.after === 'function')){
            raw.after = merge.after;
        }

        if('net' in merge) raw.net = merge.net;
        if('timeout' in merge) raw.timeout = merge.timeout;
        if(merge.logic && (typeof merge.logic === 'object')){
            if(raw.logic) Object.assign(raw.logic,merge.logic);
            else raw.logic = merge.logic;
        }
        if(merge.http &&(typeof merge.http ==='object')){
            if(raw.http) Object.assign(raw.http,merge.http);
            else raw.http = merge.http;
        }
    }
    return raw;
}

let globalLoading = false;
let globalLoadingText = '加载中...';
let globalToast = false;
let globalTimeout = 8000;
let globalToastTime = 2000;
const globalErrorHandler = {
    net:'网络错误<br>请检查您的网络连接或稍候重试',
    logic:{},
    http:{
        'default':'网络错误'
    },
    timeout:'网络质量不好<br>请稍候重试'
};

const hooks = {
    before:[],
    complete:[],
    success:[],
    error:[]
};

function config({
    loading,
    loadingText,
    toast,
    toastTime,
    errorHandler,
    timeout
}){
    if(loading) globalLoading = loading;
    if(loadingText) globalLoadingText = loadingText;
    if(toast) globalToast = toast;
    if(toastTime) globalToastTime = toastTime;
    
    if(errorHandler) mergeErrorHandler(globalErrorHandler,errorHandler);

    if(timeout) globalTimeout = timeout;
}

function post(url, data, { 
    headers={}, 
    loading = true, 
    loadingText = globalLoadingText, 
    toast = true,
    toastTime = globalToastTime,
    lock = true, 
    lockToken = url, 
    errorHandler = null,
    timeout = globalTimeout,
    parseDate = false
}={}) {
    /*
     * type:custom/net/http/logic/timeout
     * */
    if(loading===true) loading = globalLoading;
    if(toast===true) toast = globalToast;
    errorHandler = mergeErrorHandler({},globalErrorHandler,errorHandler);

    function runHandler(handler,...arg){
        if(handler){
            if(typeof handler === 'function') handler(...arg);
            else toast&&toast.show(handler);
        }
    }

    let hasSideEffect = false;
    //重置异步效果
    function resetSideEffect() {
        if (hasSideEffect){
            lock && delete lockSet[lockToken];
            loading && loading.close();
            hasSideEffect = false;
        }
    }
    //初始化异步效果
    function setSideEffect() {
        if (!hasSideEffect){
            hasSideEffect = true;
            loading && loading.open(loadingText || '加载中...');
            lock && (lockSet[lockToken] = true);
        }
    }

    return (()=> {
        if (lock && lockSet[lockToken]){
            return Promise.reject({
                type : 'custom',
                detail : 'lock',
                url
            })
        }

        //before hook
        for(let hook of hooks.before){
            const resData = hook(url,data,headers);
            if(resData===false){
                return Promise.reject({
                    type:'custom',
                    detail:'before hook return false',
                    url,
                    hook
                })
            }else if(resData!==undefined){
                data = resData;
            }
        }

        setSideEffect();

        return fetchAsync(url, {
            data,
            headers : Object.assign(headers,{ "Content-Type" : "application/JSON; charset=UTF-8" }),
            timeout
        })
    })()
        .catch(e=> {
            if (TimeoutError.isInstance(e)){
                return Promise.reject({ type : 'timeout', url });
            }else{
                return Promise.reject({ type : 'net', url, error : e })
            }
        })
        .then(response=> {
            if (response.status >= 200 && response.status < 300){
                return (
                    parseDate?response.text().then(t=>JSON.parseWithDate(t)):response.json()
                ).catch(e=> {
                    return Promise.reject({
                        type : 'custom',
                        detail : 'json parse fail',
                        url
                    })
                });
            }else{
                return response.text().then(text=> {
                    return Promise.reject({
                        type : 'http',
                        text,
                        status : response.status,
                        statusText : response.statusText,
                        url : response.url
                    })
                });
            }
        })
        .then(json=> {
            if ('code' in json && json.code < 0) return Promise.reject({
                type : 'logic',
                url,
                code : json.code,
                detail : json
            });

            //success hook
            for(let hook of hooks.success){
                hook(url,json);
            }
            //complete hook
            for(let hook of hooks.complete){
                hook(url);
            }

            resetSideEffect();
            return json;
        })
        .catch(e=> {
            //error preprocess
            if(e.type==='http'&&e.status===504){
                //gate timeout (todo: all timeout http code goes here)
                e.type = 'timeout';
            }
            if (process.env.NODE_ENV!=='production'){
                console.error('ajax error ', e);
            }

            resetSideEffect();

            //error hook
            for(let hook of hooks.error){
                hook(url,e);
            }
            //complete hook
            for(let hook of hooks.complete){
                hook(url);
            }

            if(errorHandler.before) errorHandler.before(e);
            switch(e.type){
                case 'http':
                    runHandler(errorHandler.http[e.status]||errorHandler.http.default,e);
                    break;
                case 'logic':
                    runHandler(errorHandler.logic[e.code]||errorHandler.logic.default,e);
                    break;
                default:
                    runHandler(errorHandler[e.type],e);
                    break;
            }
            if(errorHandler.after) errorHandler.after(e);

            return Promise.reject(e);
        });
}

function postSilence(url,data,opt={}){
    opt = Object.assign({ loading : false, lock : false, toast : false }, opt);
    return post(url, data, opt);
}

function addHook(type,hook){
    if(hooks[type]){
        if(Array.isArray(hook)){
            hooks[type].push(...hook);
        }else{
            hooks[type].push(hook);
        }
    }
}

function use(obj){
    if(obj.config){
        config(obj.config);
    }
    if(obj.hooks){
        for(let type of Object.keys(obj.hooks)){
            addHook(type,obj.hooks[type]);
        }
    }
}

export default { post,postSilence,config,addHook,use }