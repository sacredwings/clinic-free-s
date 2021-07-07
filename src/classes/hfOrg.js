import mongo from "mongodb";

export default class {

    static async Add ( fields ) {
        try {
            let collection = mongo.db.collection('hf_org');
            let result = await collection.insertOne(fields)
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CHfOrg Add'}, ...err})
        }
    }

    static async GetById ( fields ) {
        try {
            fields._id = mongo.ObjectID(fields._id)

            let collection = mongo.db.collection('hf_org');
            let result = await collection.find(fields).toArray()
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CHfOrg GetById'}, ...err})
        }
    }

    static async Get ( fields, params ) {
        try {
            let collection = mongo.db.collection('hf_org');
            let result = await collection.find(fields).limit(params.count).skip(params.offset).toArray()
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CHfOrg Get'}, ...err})
        }
    }
}