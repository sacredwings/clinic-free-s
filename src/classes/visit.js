import mongo from "mongodb";

export default class {

    static async Add ( fields ) {
        try {
            let collection = mongo.db.collection('visit');
            let result = await collection.findOne(fields)

            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CVisit Add'}, ...err})
        }
    }

}