const dbclient = requireRoot('db');
const { zk_collection_name, sp_collection_name } = requireRoot('service/config');

module.exports = class ZkHotel {
    async detail(id){
        const db = await dbclient.get();
        const zkCollection = await db.collection(zk_collection_name);

        const detail = await zkCollection.findOne(
            {_id: id},
            { fields: {
                name: 1,
                name_en: 1,
                category_name: 1,
                address: 1,
                city_name: 1,
                city_name_en: 1,
                country_name: 1,
                country_name_en: 1,
                phone: 1,
                email: 1,
                url_web: 1,
                photos: 1,
                description: 1,
                booking_info: 1,
                alias: 1,
                sp_id: 1
            } }
        );

        if(detail){
            delete detail._id;
            if(detail.alias){
                detail.alias = detail.alias.join('|');
            }
        }
        return detail;
    }
    async query(page, pageSize, { valid=true, keyword } = {} ){

        const findCondition = {
            status: valid ? 0 : 1
        };
        if(keyword){
            const reg = new RegExp(keyword, 'i');
            findCondition.$or = [
                { name: reg },
                { name_en: reg }
            ];
        }

        const db = await dbclient.get();
        const zkCollection = await db.collection(zk_collection_name);
        const count = await zkCollection.find(findCondition).count();

        const skipNum = page * pageSize;
        const list = await zkCollection.find(findCondition,
            {
                name: 1,
                name_en: 1,
                category_name: 1,
                address: 1,
                city_name: 1,
                city_name_en: 1,
                country_name: 1,
                country_name_en: 1,
                phone: 1,
                email: 1,
                url_web: 1,
                description: 1,
                booking_info: 1,
                alias: 1,
                sp_id: 1
            }
        ).skip(skipNum).limit(pageSize).toArray()

        return { list, count };
    }
}