import mongo from "mongodb";
import {DB} from "social-framework/build/classes/db";

export default class {

    static async Add ( fields ) {
        try {
            let collection = DB.Client.collection('hf_specialist');
            let result = await collection.findOne(fields)

            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CHfSpecialist Add'}, ...err})
        }
    }

    static async Get (  ) {
        try {
            let collection = DB.Client.collection('hf_specialist');

            return await collection.find().toArray();

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CHfSpecialist Get'}, ...err})
        }
    }
    static async Update ( fields ) {
        try {
            fields.hf_id = new DB().ObjectID(fields.hf_id)
            fields.id = new DB().ObjectID(fields.id)
            let collection = DB.Client.collection('hf');

            //поиск
            let arFields = {
                _id: fields.hf_id,
                specialist_id: fields.id
            }
            let result = await collection.findOne(arFields)

            if (result)
                //удаление
                await collection.update(
                    { _id: fields.hf_id },
                    { $pull: { 'specialist_id': fields.id} }
                )
            else
                //добавление
                await collection.update(
                    { _id: fields.hf_id },
                    { $push: { 'specialist_id': fields.id} }
                )

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CHfSpecialist Get'}, ...err})
        }
    }

}