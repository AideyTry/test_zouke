import Vue from 'vue';

const extend = Vue.extend;

Vue.extend = function(options){
    if(options){
        options.$$cache = {};
    }
    return extend.call(this,options);
}

function restoreCache(vm){
    Object.assign(vm,vm.$options.$$cache);
}

function updateCache(vm,cache,render=true){
    Object.assign(vm.$options.$$cache,cache);
    render&&restoreCache(vm);
}

function autoStoreCache(vm){
    if(
        !vm.$options.staticCache||
        !vm.$options.staticCache.length) return;

    const storeCache = {};
    for(let key of vm.$options.staticCache){
        storeCache[key]=vm[key];
    }
    updateCache(vm,storeCache,false);
}

Vue.mixin({
    methods:{
        $updateStaticCache(cache){
            updateCache(this,cache);
        }
    },
    created(){
        restoreCache(this);
    },
    updated(){
        autoStoreCache(this);
    }
});