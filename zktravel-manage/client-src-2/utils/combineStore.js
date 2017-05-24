export default function combineStore(...pStores){
    const s = {};
    for(let key of ['state','getters','mutations','actions']){
        s[key] = Object.assign({},...pStores.map(ps=>ps[key]))
    }

    return s;
}