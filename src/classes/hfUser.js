import mongo from 'mongodb';
import crypto from "crypto";
import bcrypt from "bcrypt";

export default class {

    static async Add ( fields ) {
        try {
            let collection = mongo.db.collection('hf_user')

            fields.user_id = mongo.ObjectID(fields.user_id)
            fields.org_contract_id = mongo.ObjectID(fields.org_contract_id)
            let result = await collection.insertOne(fields)

            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CHfUser Add'}, ...err})
        }
    }

    static async Get ( fields ) {
        try {
            let collection = mongo.db.collection('hf_user')

            let result = await collection.aggregate([
                { $match:
                        {
                            contract_id: fields.contract_id
                        }
                },
                { $lookup:
                        {
                            from: 'user',
                            localField: 'user_id',
                            foreignField: '_id',
                            as: 'user'
                        }
                }
            ]).toArray();

            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CHfUser Get'}, ...err})
        }
    }
}