import Vue from 'vue';

function getValue(obj,keyChain){
    keyChain = keyChain.split('.');
    
    for(let key of keyChain){
        obj = obj[key];
    }
    return obj;
}
function setValue(obj,keyChain,value){
    keyChain = keyChain.split('.');
    const lastKey = keyChain.pop();

    for(let key of keyChain){
        obj = obj[key];
    }
    obj[lastKey] = value;
}

function genStateGetter(computedKey,namespaceKey){
    return function(){
        if(!this.$parent) return this.$store.state;
        const namespace = this.$options[namespaceKey];
        if(namespace) return getValue(this.$parent[computedKey],namespace);
        else return this.$parent[computedKey]
    }
}

Vue.mixin({
    beforeCreate(){
        const {stateName} = this.$options;
        if(stateName){
            Object.defineProperty(this,stateName,{
                get(){return this.$state}
            });
        }
    },
    computed:{
        $rootState:genStateGetter('$rootState','rootState'),
        $state:genStateGetter('$state','state')
    },
    methods:{
        $commit(...arg){
            return this.$store.commit(...arg);
        },
        $dispatch(...arg){
            return this.$store.dispatch(...arg);
        }
    }
});