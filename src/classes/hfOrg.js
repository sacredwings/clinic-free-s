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
            let collection = mongo.db.collection('hf_price');

            let result = await collection.find(fields).toArray()
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CHfOrg PriceEdit'}, ...err})
        }
    }
    PriceEdit

}