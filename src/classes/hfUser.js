import mongo from 'mongodb';
import crypto from "crypto";
import bcrypt from "bcrypt";
import {DB} from "social-framework/build/classes/db";

export default class {

    static async Add ( fields ) {
        try {
            let collection = DB.Client.collection('hf_user')

            fields.user_id = new DB().ObjectID(fields.user_id)
            //fields.contract_id = mongo.ObjectID(fields.contract_id)
            let result = await collection.insertOne(fields)

            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CHfUser Add'}, ...err})
        }
    }

    static async Get ( fields ) {
        try {
            let collection = DB.Client.collection('hf_user')

            if (fields.contract_id)
                fields.contract_id = new DB().ObjectID(fields.contract_id)

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

    static async GetById ( fields ) {
        try {
            let collection = DB.Client.collection('hf_user')

            fields.contract_id = new DB().ObjectID(fields.contract_id)
            fields.user_id = new DB().ObjectID(fields.user_id)
            let result = await collection.aggregate([
                { $match:
                        {
                            contract_id: fields.contract_id,
                            user_id: fields.user_id
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
            throw ({...{err: 7001000, msg: 'CHfUser GetById'}, ...err})
        }
    }
}