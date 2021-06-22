import mongo from "mongodb";

export default class {

    static async Add ( fields ) {
        try {
            let collection = mongo.db.collection('org');
            let result = await collection.insertOne(fields)
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'COrg Add'}, ...err})
        }
    }

    static async GetById ( fields ) {
        try {
            fields._id = mongo.ObjectID(fields._id)

            let collection = mongo.db.collection('org');
            let result = await collection.find(fields).toArray()
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'COrg Get'}, ...err})
        }
    }

    static async Get ( fields, params ) {
        try {
            let collection = mongo.db.collection('org');
            let result = await collection.find(fields).limit(params.count).skip(params.offset).toArray()
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'COrg Get'}, ...err})
        }
    }
}