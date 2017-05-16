require('../requireRoot');
require('@local/common/core/w/prototype');

const dbclient = requireRoot('db');

async function run(){
    const db = await dbclient.get();
    const zkcol = await db.collection('zk_hotels');

    zkcol.find({  },{sp_id: 1})
}