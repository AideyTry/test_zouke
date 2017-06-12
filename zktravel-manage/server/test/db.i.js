const dbclient = require('../db');

module.exports = async function(){
    const db1 = await dbclient.get();
    const db2 = await dbclient.get();
    if(db1 !== db2) {
        throw new Error('db::get() is not a single db connect object');
    }
    await db1.close();
    const db3 = await dbclient.get();
    if(db3 === db1){
        throw new Error('db.close() doesn\'t remove from cached db connect object');
    }

    await db3.close();

    return 'connect test pass';
}