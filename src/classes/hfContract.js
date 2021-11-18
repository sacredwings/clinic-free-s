import mongo from "mongodb";

export default class {

    static async Add ( fields ) {
        try {
            let collection = mongo.db.collection('hf_contract');

            fields.org_id = mongo.ObjectID(fields.org_id)
            await collection.insertOne(fields)
            return fields

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CHfContract Add'}, ...err})
        }
    }

    static async GetById ( fields ) {
        try {
            fields._id = mongo.ObjectID(fields._id)

            let collection = mongo.db.collection('hf_contract');
            let result = await collection.find(fields).toArray()
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CHfContract GetById'}, ...err})
        }
    }

    static async Get ( fields, params ) {
        try {
            if (fields.org_id)
                fields.org_id = mongo.ObjectID(fields.org_id)

            let collection = mongo.db.collection('hf_contract');
            let result = await collection.find(fields).limit(params.count).skip(params.offset).toArray()
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CHfContract Get'}, ...err})
        }
    }
}