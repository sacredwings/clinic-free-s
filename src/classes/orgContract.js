import mongo from "mongodb";

export default class {

    static async Add ( fields ) {
        try {
            let collection = mongo.db.collection('org_contract');
            let result = await collection.insertOne(fields)
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'COrgContract Add'}, ...err})
        }
    }

    static async Get ( fields ) {
        try {
            let collection = mongo.db.collection('org_contract');
            let result = await collection.find().limit(fields.count).skip(fields.offset).toArray()
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'COrgContract Get'}, ...err})
        }
    }
}