import mongo from "mongodb";

export default class {
/*
    static async Add ( fields ) {
        try {
            let collection = mongo.db.collection('hf_research');
            let result = await collection.findOne(fields)

            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CHfResearch Add'}, ...err})
        }
    }*/

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


}