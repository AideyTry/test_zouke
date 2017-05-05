/**
 * Created by wangkehan on 16/7/14.
 */

const _query = {};
if(location.search!=''){
    const parts=location.search.substr(1).split('&');
    for (let p of parts){
        if(p.includes('=')){
            let [key,...value]=p.split('=');
            _query[key]=value.join('=');
        }else{
            _query[p]='';
        }
    }
}

function getArgs(){
    return _query;
}


const { platform:_platform , /* phone/tablet/desktop */ os:_os /* android/ios */}=(function(ua) {
    let platform='';
    let os = '';
    if (ua.includes('iphone')){
        platform = 'phone';
        os = 'ios';
    }else if (ua.includes('ipad')){
        platform = 'tablet';
        os = 'ios';
    }else if (ua.includes('android')){
        os = 'android';
        platform = ua.includes('mobi') ? 'phone' : 'tablet';
    }else{
        platform = 'desktop';
    }

    return {platform,os};
}(navigator.userAgent.toLowerCase()));

const platform={
    isAndroid(){return _os==='android';},
    isIOS(){return _os==='ios';},
    isPhone(){return _platform==='phone';},
    isTablet(){return _platform==='tablet';},
    isDesktop(){return _platform==='desktop';},
    isIPhone(){return _os==='ios'&&_platform==='tablet';},
    isIPad(){return _os==='ios'&&_platform==='phone';}
};

function getScrollOffset(){
    return { x: window.pageXOffset, y: window.pageYOffset };
}
function getViewportSize(){
    return { w: window.innerWidth, h: window.innerHeight };
}
function insertStyle(cssText){
    const style = document.createElement('style');
    if(style.styleSheet){ // some ie
        style.styleSheet.cssText=cssText;
    }else{
        style.appendChild(document.createTextNode(cssText));
    }
    document.querySelector('head').appendChild(style);
}

export { getScrollOffset,getViewportSize,insertStyle,getArgs,platform };