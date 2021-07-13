import mongo from "mongodb";

export default class {

    static async Add ( fields ) {
        try {
            let collection = mongo.db.collection('hf');
            let result = await collection.findOne(fields)

            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CHarmfulFactor Add'}, ...err})
        }
    }

    static async GetByCode ( arCode ) {
        try {
            let collection = mongo.db.collection('hf');

            let result = await collection.aggregate([
                { $match:
                        {
                            code: {$in : arCode}
                        }
                },
                { $lookup:
                        {
                            from: 'hf_research',
                            localField: 'research_id',
                            foreignField: '_id',
                            as: 'research'
                        }
                },
                { $lookup:
                        {
                            from: 'hf_specialty',
                            localField: 'specialty_id',
                            foreignField: '_id',
                            as: 'specialty'
                        }
                }
            ]).toArray();
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CHarmfulFactor Add'}, ...err})
        }
    }

}