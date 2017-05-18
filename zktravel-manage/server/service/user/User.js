

module.exports = class User {
    /*
     * field: id
     * field: name
     * field: p
    */
    static get(id){
        
    }
    constructor(id, name, p){
        Object.defineProperties(this, {
            id: { value: id },
            name: { value: name },
            p: { value: p }
        });
    }
}