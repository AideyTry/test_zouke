const dbclient = requireRoot('db');



module.exports = class WxUser {
    async query(page, pageSize, keyword){
        const db = await dbclient.get();
        const userCollection = await db.collection('wx_user');

        const queryCondition = {};
        if(keyword){
            queryCondition['nick_name'] = new RegExp(keyword, 'i');
        }

        const count = await userCollection.find(queryCondition).count();

        const skipNum = page * pageSize;
        const list = await userCollection.find(queryCondition, {
            nick_name: 1,
            sex: 1,
            language: 1,
            province: 1,
            country: 1,
            head_image: 1,
            is_identity: 1,
            is_subscribe: 1,
            last_view_time: 1,
            last_login_time: 1
        }).skip(skipNum).limit(pageSize).toArray()
        return { list, count };
    }
}