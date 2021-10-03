import mongo from "mongodb";

export default class {

    static async Add ( fields ) {
        try {
            let collection = mongo.db.collection('hf_research');
            let result = await collection.findOne(fields)

            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CHfResearch Add'}, ...err})
        }
    }

    static async GetById ( arr ) {
        try {
            //fields._id = mongo.ObjectID(fields._id)

            let collection = mongo.db.collection('hf_research');
            let result = await collection.aggregate([
                { $match:
                        {
                            _id: {$in : arr}
                        }
                }
            ]).toArray();
            //let result = await collection.find(fields).toArray()
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CHfResearch GetById'}, ...err})
        }
    }

    static async PriceGet ( fields ) {
        try {
            let collection = mongo.db.collection('hf_research');

            if (fields.org_id)
                fields.org_id = mongo.ObjectID(fields.org_id)

            if (fields.contract_id)
                fields.contract_id = mongo.ObjectID(fields.contract_id)

            console.log(fields)


            let result = await collection.aggregate([
                { $lookup:
                        {
                            from: 'hf_price',
                            localField: '_id',
                            foreignField: 'object_id',
                            as: 'price',
                            pipeline: [
                                {
                                    $match:
                                        {
                                            org_id: fields.org_id,
                                            contract_id: fields.contract_id,
                                        }
                                }
                            ]
                        }
                },
            ]).toArray();
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CHfResearch PriceGet'}, ...err})
        }
    }
}