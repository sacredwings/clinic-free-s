import mongo from "mongodb";

export default class {

    static async Add ( fields ) {
        try {
            let collection = mongo.db.collection('hf_analysis');
            let result = await collection.findOne(fields)

            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CHfAnalysis Add'}, ...err})
        }
    }
    static async PriceGet ( fields ) {
        try {
            let collection = mongo.db.collection('hf_analysis');

            if (fields.org_id)
                fields.org_id = mongo.ObjectID(fields.org_id)

            let result = await collection.aggregate([
                { $lookup:
                        {
                            from: 'hf_price',
                            localField: '_id',
                            foreignField: 'analysis_id',
                            as: 'price',
                            pipeline: [
                                {
                                    $match:
                                        {
                                            org_id: fields.org_id
                                        }
                                }
                            ]
                        }
                },
            ]).toArray();
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CHfAnalysis PriceGet'}, ...err})
        }
    }
}