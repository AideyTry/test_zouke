/**
 * Created by wangkehan on 15/12/27.
 */
//TODO:debug
/*var div = document.createElement('div');
div.style.position='fixed';
div.style.top='0';
div.style.left='0';
div.style.width="100%";
div.style.zIndex=1000000;
div.style.background='rgba(0,0,0,0.5)';
div.style.color='white';
div.style.maxHeight='100px';
div.style.overflow='auto';
div.style.pointerEvents='none';
document.body.appendChild(div);*/

const weixin ={
    isWeix:navigator.userAgent.toLowerCase().includes('micromessenger')
};

if(weixin.isWeix&&typeof wx !== 'undefined'){
    const host = `${document.location.protocol}//${document.location.host}`;

    let isReady = false;
    wx.ready(()=> {
        isReady = true;
    });

    function ready(fn) {
        if (isReady) fn();
        else wx.ready(fn);
    }


    //share;
    const baseInfo = {
        link : document.location.href,
        imgUrl : `${host}/icon.png`,
        type : 'link'
    };
    const appShareData = {
        title : document.title,
        desc : ''
    };
    const timelineShareData = {
        title : document.title,
    };

    function setAppShareMessage() {
        Object.assign(appShareData, baseInfo);
        wx.onMenuShareAppMessage(appShareData);
    }
    function setShareTimeline() {
        Object.assign(timelineShareData, baseInfo);
        wx.onMenuShareTimeline(timelineShareData);
    }

    function trigger(type){
        switch(type){
            case 'weix:baseInfo:change':
                setAppShareMessage();
                setShareTimeline();
                break;
            case 'weix:appMessage:change':
                setAppShareMessage();
                break;
            case 'weix:timeline:change':
                setShareTimeline();
                break;
        }
    }


    const payPara = {};

    //disable multi config invoke
    let _hasConfig = false;
    Object.assign(weixin,{
        config({ appid, timestamp, noncestr, sign }, apiList = []) {
            if (_hasConfig) return this;
            _hasConfig = true;

            const defaultJSApiList = [
                'chooseImage',
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'hideMenuItems',
                'showMenuItems',
                'hideOptionMenu',
                'showOptionMenu',
                'chooseImage',
                'uploadImage',
                'previewImage'
            ];


            wx.config({
                debug : false,
                appId : appid,
                timestamp : timestamp,
                nonceStr : noncestr,
                signature : sign,
                jsApiList : defaultJSApiList.concat(apiList.filter(i=>! defaultJSApiList.includes(i)))
            });

            ready(()=> {
                wx.hideMenuItems({
                    menuList : ['menuItem:share:qq', 'menuItem:share:weiboApp', 'menuItem:share:facebook', 'menuItem:share:QZone']
                });
            });
            
            this.enableShare();

            return this;
        },

        setBaseInfo({ link= this.fullUrl, imgUrl=baseInfo.imgUrl, success, fail, complete, cancel }={}, focus = false) {
            baseInfo.link = link || baseInfo.link;
            baseInfo.imgUrl = imgUrl || baseInfo.imgUrl;
            success && (baseInfo.success = success);
            fail && (baseInfo.fail = fail);
            complete && (baseInfo.complete = complete);
            cancel && (baseInfo.cancel = cancel);

            if (focus){
                ready(()=> {
                    trigger('weix:baseInfo:change');
                });
            }

            return this;
        },

        setAppInfo({ title=appShareData.title, desc=appShareData.desc }={}){
            appShareData.title = title;
            appShareData.desc = desc;

            ready(()=> {
                trigger('weix:appMessage:change');
            });

            return this
        },
        setTimelineInfo({ title=timelineShareData.title }={}){
            timelineShareData.title = title;

            ready(()=> {
                trigger('weix:timeline:change');
            });

            return this;
        },

        getAppShareInfo(){
            return appShareData;
        },
        getTimelineShareInfo(){
            return timelineShareData;
        },

        initPay({ timestamp, nonceStr, package:_package, signType, paySign }){
            Object.assign(payPara, {
                timestamp,
                nonceStr,
                package : _package,
                signType,
                paySign
            });
            return this;
        },

        pay(){
            return new Promise(function (s, r) {
                const payObj = Object.assign({
                    success(res){
                        s(res);
                    },
                    fail(res){
                        r({ type : 'fail', row : res });
                    },
                    cancel(res){
                        r({ type : 'cancel', row : res });
                    }
                }, payPara);
                ready(()=> {
                    wx.chooseWXPay(payObj);
                });
            });
        },

        chooseImage({count=9,sizeType=['original'],sourceType=['album','camera']}={}){
            return new Promise((s, r)=> {
                ready(()=> {
                    wx.chooseImage({
                        count,
                        sizeType,
                        sourceType,
                        success(res){
                            s(res.localIds);
                        },
                        fail(res){
                            r();
                        },
                        cancel(res){
                            r();
                        }
                    })
                })
            });
        },

        disableMail(){
            ready(()=>{
                wx.hideMenuItems({
                    menuList:['menuItem:share:email']
                });
            });
            return this;
        },
        enableMail(){
            ready(()=>{
                wx.showMenuItems({
                    menuList:['menuItem:share:email']
                });
            });
            return this;
        },
        disableShare(){
            ready(()=> {
                wx.hideMenuItems({
                    menuList : ['menuItem:share:appMessage', 'menuItem:share:timeline']
                });
            });
            return this;
        },
        enableRefresh(){
            ready(()=>{
                wx.showMenuItems({
                    menuList:['menuItem:refresh']
                });
            });
        },
        disableRefresh(){
            ready(()=>{
                wx.hideMenuItems({
                    menuList:['menuItem:refresh']
                });
            });
        },
        enableShare(){
            ready(()=> {
                wx.showMenuItems({
                    menuList : ['menuItem:share:appMessage', 'menuItem:share:timeline']
                });
            });
            return this;
        },
        previewImage(currentUrl,urlList){
            if(!urlList){
                urlList = [currentUrl];
            }
            ready(()=>{
                wx.previewImage({current:currentUrl,urls:urlList});
            });
        },

        get baseUrl() {
            return document.location.href.split('?')[0];
        },
        get fullUrl(){
            return document.location.href;
        },
        get host() {
            return host
        }
    });
}

export default weixin;
