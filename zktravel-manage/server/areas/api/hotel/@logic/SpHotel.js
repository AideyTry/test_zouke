const dbclient = requireRoot('db');
const mongodb = require('mongodb');
const { sp_collection_name } = requireRoot('service/config');

module.exports = class SpHotel {
    async detail(id, type){

        const query = typeof id === 'string' /* _id */? {
            _id: new mongodb.ObjectId(id)
        }:{
            id,
            supplier: type
        }
        const db = await dbclient.get();
        const spCollection = await db.collection(sp_collection_name);

        const detail = await spCollection.findOne(
            query,
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
                booking_info: 1
            } }
        );
        if(detail) delete detail._id;
        return detail;
    }
}