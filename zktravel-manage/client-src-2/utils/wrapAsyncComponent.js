import { loading } from '../config'; 

export default function(importPromiseGen){
    return function(){
        loading.open('加载中...');
        return importPromiseGen().then(result => {
            loading.close();
            return result;
        }).catch(e => {
            loading.close();
            return Promise.reject(e);
        })
    }
}