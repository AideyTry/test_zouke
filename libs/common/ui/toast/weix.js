/**
 * Created by wangkehan on 16/10/17.
 */

import './weix.scss';

class Toast{
    constructor(){
        const div = document.createElement('div');
        div.style.zIndex=10000;
        div.className = 'toast-weix';
        div.innerHTML = `<div class="container"></div>`;
        this._$div = div;
        this._$container = div.$('.container');

        this._t = 0;
        this._show = false;

        div.on('click',()=>{
            this._remove();
        })
    }
    _remove(){
        this._$div.classList.remove('show');
        this._show = false;
        clearTimeout(this._t);
        setTimeout(()=>{
            if(!this._show) document.body.removeChild(this._$div);
        },300)
    }
    show(title,freeze,timeout){
        clearTimeout(this._t);
        this._$container.innerHTML = title;
        
        if(freeze){
            this._$div.classList.add('freeze');
        }else{
            this._$div.classList.remove('freeze');
        }

        if(!this._show){
            document.body.appendChild(this._$div);
            setTimeout(()=>{
                this._$div.classList.add('show');
            })
            this._show = true;
        }

        this._t = setTimeout(()=>{
            this._remove();
        },300+timeout)

    }
}
let toast = null;
function getToast(){
    if(!toast) toast = new Toast();
    return toast;
}

export default {
    show(title,arg) {
        let timeout = 3000;
        let freeze = false;
        if(typeof arg === 'number'){
            timeout = arg;
        }else if(typeof arg === 'object'){
            if('timeout' in arg) timeout = arg.timeout;
            if('freeze' in arg) freeze = arg.freeze;
        }
        getToast().show(title,freeze,timeout);
    }
};