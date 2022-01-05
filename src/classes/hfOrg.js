import mongo from "mongodb";
import {DB} from "social-framework/build/classes/db";

export default class {

    static async Add ( fields ) {
        try {
            let collection = DB.Client.collection('hf_org');
            await collection.insertOne(fields)
            return fields

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CHfOrg Add'}, ...err})
        }
    }

    static async GetById ( fields ) {
        try {
            fields._id = new DB().ObjectID(fields._id)

            let collection = DB.Client.collection('hf_org');
            let result = await collection.find(fields).toArray()
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CHfOrg GetById'}, ...err})
        }
    }

    static async Get ( fields, params ) {
        try {
            let collection = DB.Client.collection('hf_org');

            if (!fields.contract)
                return await collection.find({}).limit(params.count).skip(params.offset).toArray()

            return await collection.aggregate([
                { $lookup:
                        {
                            from: 'hf_contract',
                            localField: '_id',
                            foreignField: 'org_id',
                            as: 'contract'
                        }
                },
            ]).toArray();

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CHfOrg Get'}, ...err})
        }
    }

    static async PriceEdit ( fields ) {
        try {
            let collection = DB.Client.collection('hf_price');

            if (fields.org_id)
                fields.org_id = new DB().ObjectID(fields.org_id)

            if (fields.contract_id)
                fields.contract_id = new DB().ObjectID(fields.contract_id)

            if (fields.object_id)
                fields.object_id = new DB().ObjectID(fields.object_id)


            let arFields = {
                org_id: fields.org_id,
                contract_id: fields.contract_id,
                object_id: fields.object_id,
            }
            let result1 = await collection.find(arFields).toArray()

            console.log(fields)
            console.log(result1)

            let arFilter = {
                org_id: fields.org_id,
                contract_id: fields.contract_id,
                object_id: fields.object_id,
            }

            let arUpdate = {
                price: fields.price,
            }

            let result = collection.updateOne(arFilter, {$set: arUpdate}, {upsert: true})
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CHfOrg PriceEdit'}, ...err})
        }
    }
    PriceEdit

}