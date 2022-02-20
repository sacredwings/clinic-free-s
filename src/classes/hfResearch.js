import mongo from "mongodb";
import {DB} from "social-framework/build/classes/db";

export default class {

    static async Add ( fields ) {
        try {
            let collection = DB.Client.collection('hf_research');
            let result = await collection.findOne(fields)

            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CHfResearch Add'}, ...err})
        }
    }

    static async Get (  ) {
        try {
            let collection = DB.Client.collection('hf_research');

            return await collection.find().toArray();

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CHfResearch Get'}, ...err})
        }
    }

    static async GetById ( arr ) {
        try {
            //fields._id = mongo.ObjectID(fields._id)

            let collection = DB.Client.collection('hf_research');
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