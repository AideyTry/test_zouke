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
        const namespace = this.$options[namespaceKey];
        if(namespace) return getValue(this)
        if(!this.$parent) return this.$store.state;
        if(namespace) return getValue(this.$parent[computedKey],namespace);
        else return this.$parent[computedKey]
    }
}

Vue.mixin({
    computed:{
        //$rootState:genStateGetter('$rootState','rootState'),
        $state(){
            if(!this.$store) return undefined;
            
            const namespace = this.$options.state;
            if(namespace) return getValue(this.$store.state, namespace);

            return this.$parent ? this.$parent.$state : this.$store.state;
        }
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