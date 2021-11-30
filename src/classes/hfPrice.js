import mongo from "mongodb";

export default class {
    static async Get(contract_id, object) {
        try {
            let collectionName = 'hf_' + object
            let collectionPrice = 'hf_price'

            let collection = mongo.db.collection(collectionName);

            //hf_research
            //hf_specialty
            //hf_analysis

            if (contract_id)
                contract_id = mongo.ObjectID(contract_id)

            let result = await collection.aggregate([
                { $lookup:
                        {
                            from: collectionPrice,
                            localField: '_id',
                            foreignField: 'object_id',
                            as: 'price',
                            pipeline: [
                                {
                                    $match:
                                        {
                                            contract_id: contract_id
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