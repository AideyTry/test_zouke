/**
 * Created by wangkehan on 16/7/14.
 */
//helper domList
function bindSelectAll(domList){
    return Object.assign(domList,bindSelectAll.bindObject);
}
bindSelectAll.bindObject={
    _invoke(name,...arg){
        for(let dom of this){
            dom[name](...arg);
        }
    },
    on(...arg){ this._invoke('on',...arg); },
    off(...arg){ this._invoke('off',...arg); },
    addClass(...arg){this._invoke('addClass',...arg);},
    removeClass(...arg){this._invoke('removeClass',...arg);},
    toggleClass(...arg){this._invoke('toggleClass',...arg);},
    trigger(...arg){this._invoke('trigger',...arg);}
};

try{
    Node.prototype.on = Node.prototype.addEventListener;
    Node.prototype.off = Node.prototype.removeEventListener;
}catch(e){
    Element.prototype.on=Element.prototype.addEventListener;
    Element.prototype.off=Element.prototype.removeEventListener;
    document.on=document.addEventListener;
    document.off=document.removeEventListener;
}


try{
    Window.prototype.on = Window.prototype.addEventListener;
    Window.prototype.off = Window.prototype.removeEventListener;
}catch(e){
    //部分浏览器没有Window类
    window.on = window.addEventListener;
    window.off = window.removeEventListener;
}
Element.prototype.$=Document.prototype.$=function(...arg){return this.querySelector(...arg)};
Element.prototype.$a=Document.prototype.$a=function(...arg){return bindSelectAll(this.querySelectorAll(...arg));};
Element.prototype.addClass=function(...c){return this.classList.add(...c)};
Element.prototype.removeClass=function(...c){return this.classList.remove(...c)};
Element.prototype.containsClass=function(...c){return this.classList.contains(...c)};
Element.prototype.toggleClass=function(...c){return this.classList.toggle(...c)};

function $(...arg){
    return document.querySelector(...arg);
}
function $a(...arg){
    return bindSelectAll(document.querySelectorAll(...arg));
}
try {
    Window.prototype.$ = $;
    Window.prototype.$a = $a
}catch(e){
    window.$=$;
    window.$a=$a;
}

const eventNotPropagation = { focus: true, blur: true, mouseenter: true, mouseleave: true, load: true, readystatechange: true, error: true, input: true, propertychange: true };//不进行事件传播的事件类型

function trigger(name,data){
    let e = null;
    if(typeof(name)==='string'||name instanceof String) e= document.createDispatchEvent(name.toString());
    else e=name;
    if(data){
        e.$data=data;
    }
    (this||window).dispatchEvent(e);
}

if(typeof EventTarget === "undefined"){
    try{
        Node.prototype.trigger = trigger;
    }catch (e){
        Element.prototype.trigger = trigger;
        document.trigger = trigger;
    }
    try{
        Window.prototype.trigger = trigger;
    }catch (e){
        window.trigger = trigger;
    }
}else{
    EventTarget.prototype.trigger=trigger;
}

document.createDispatchEvent=function (/*string*/type,/*object*/option={}) {
    /*
     * eventType:HTMLEvents/UIEvents/MouseEvents
     * */

    option.bubbles = "bubbles" in option ? option.bubbles : !eventNotPropagation[type];
    let eventType = option.eventType || 'HTMLEvents';

    if(document.createEventObject){//ie8
        eventType='Event';
    }

    const e = document.createEvent(eventType);
    switch (eventType){
        case 'UIEvents':
            e.initUIEvent(type, option.bubbles, true, option.windowObject || window, option.detail || 0);
            break;
        case 'MouseEvents':
            e.initMouseEvent(type, option.bubbles, true, option.windowObject || window, option.detail || 0,
                option.screenX || 0, option.screenY || 0, option.clientX || 0, option.clientY || 0, option.ctrlKey || false, option.altKey || false, option.shiftKey || false, option.metaKey || false, option.button || 0, option.relatedTarget || null);
            break;
        default://'HTMLEvents' or other
            e.initEvent(type, option.bubbles, true);
            break;
    }
    return e;
};

export {$,$a};