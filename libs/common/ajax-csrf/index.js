export default function(cookieKey,headerKey){
    return {
        hooks:{
            before(url,data,header){
                header[headerKey]='test';
            }
        }
    }
}