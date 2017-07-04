
module.exports = function(method){
    return function(Controller, action, descriptor){
        const v = descriptor.value;

        descriptor.value = function(...arg){
            if(this.request.method.toUpperCase()!==method){
                return this.throw(404);
            }

            return v.call(this, ...arg);
        }
        return descriptor;
    }
}