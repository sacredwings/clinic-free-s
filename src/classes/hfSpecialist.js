import mongo from "mongodb";
import {DB} from "social-framework/build/classes/db";

export default class {

    static async Add ( fields ) {
        try {
            let collection = DB.Client.collection('hf_specialist');
            let result = await collection.insertOne(fields)
            return fields

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
    static async Update ( id, fields ) {
        try {
            let collection = DB.Client.collection('hf_specialist');
            id = new DB().ObjectID(id)

            let result = collection.updateOne({_id: id}, {$set: fields})
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CHfSpecialist Update'}, ...err})
        }
    }

    static async UpdateHf ( fields ) {
        try {
            fields.hf_id = new DB().ObjectID(fields.hf_id)
            fields.id = new DB().ObjectID(fields.id)
            let collection = DB.Client.collection('hf')

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
            throw ({...{err: 7001000, msg: 'CHfSpecialist UpdateHf'}, ...err})
        }
    }

    static async Delete ( id ) {
        try {
            let collection = DB.Client.collection('hf_specialist');
            id = new DB().ObjectID(id)

            let result = collection.deleteOne({_id : id})
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CHfSpecialist Delete'}, ...err})
        }
    }

    static async GetById ( ids ) {
        try {
            ids = new DB().arObjectID(ids)

            let collection = DB.Client.collection('hf_specialist');
            let result = await collection.find({_id: { $in: ids}}).toArray()
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CHfSpecialist GetById'}, ...err})
        }
    }
}