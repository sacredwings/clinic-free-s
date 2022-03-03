import mongo from "mongodb";
import {DB} from "social-framework/build/classes/db";

export default class {

    static async Add ( fields ) {
        try {
            let collection = DB.Client.collection('hf_contract');

            fields.org_id = new DB().ObjectID(fields.org_id)
            await collection.insertOne(fields)
            return fields

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CHfContract Add'}, ...err})
        }
    }

    static async GetById ( ids ) {
        try {
            ids = new DB().arObjectID(ids)

            let collection = DB.Client.collection('hf_contract');
            let result = await collection.find({_id: { $in: ids}}).toArray()
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CHfContract GetById'}, ...err})
        }
    }

    static async Get ( fields, params ) {
        try {
            if (fields.org_id)
                fields.org_id = new DB().ObjectID(fields.org_id)

            let collection = DB.Client.collection('hf_contract');
            let result = await collection.find(fields).limit(params.count).skip(params.offset).toArray()
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CHfContract Get'}, ...err})
        }
    }
}