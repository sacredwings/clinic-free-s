import mongo from "mongodb";

export default class {

    static async Add ( fields ) {
        try {
            let collection = mongo.db.collection('org_contract');

            fields.org_id = mongo.ObjectID(fields.org_id)
            let result = await collection.insertOne(fields)
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'COrgContract Add'}, ...err})
        }
    }

    static async Get ( fields, params ) {
        try {
            if (fields.org_id)
                fields.org_id = mongo.ObjectID(fields.org_id)

            let collection = mongo.db.collection('org_contract');
            let result = await collection.find(fields).limit(params.count).skip(params.offset).toArray()
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'COrgContract Get'}, ...err})
        }
    }
}