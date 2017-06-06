import store from 'root/store';

export default function activateStore(to, from, next){
    const registers = [];
    for(let { meta } of to.matched){
        if(meta.store&&!meta.store.resolve){
            registers.push(meta.store);
        }
    }
    if(registers.length===0) return next();

    dispatch(0);

    function dispatch(n){
        if(n===registers.length){
            next();
            return;
        }
        let {name, m } = registers[n];
        if(typeof m === 'function'){
            m = m();
        }
        if(m.then){
            m.then(m=>{
                store.registerModule(name, m);
                registers[n].resolve = true;
                dispatch(n+1);
            })
        }else{
            store.registerModule(name, m);
            registers[n].resolve = true;
            dispatch(n+1);
        }
    }
}