import mongo from "mongodb";
import {DB} from "social-framework/build/classes/db";

export default class {

    static async Add ( fields ) {
        try {
            let collection = DB.Client.collection('hf_research');
            let result = await collection.insertOne(fields)
            return fields

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

    static async Update ( id, fields ) {
        try {
            let collection = DB.Client.collection('hf_research');
            id = new DB().ObjectID(id)

            let result = collection.updateOne({_id: id}, {$set: fields})
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CHfResearch Update'}, ...err})
        }
    }

    static async UpdateHf ( fields ) {
        try {
            fields.hf_id = new DB().ObjectID(fields.hf_id)
            fields.id = new DB().ObjectID(fields.id)
            let collection = DB.Client.collection('hf');

            //поиск
            let arFields = {
                _id: fields.hf_id,
                research_id: fields.id
            }
            let result = await collection.findOne(arFields)

            if (result)
                //удаление
                await collection.update(
                    { _id: fields.hf_id },
                    { $pull: { 'research_id': fields.id} }
                )
            else
                //добавление
                await collection.update(
                    { _id: fields.hf_id },
                    { $push: { 'research_id': fields.id} }
                )

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CHfResearch UpdateHf'}, ...err})
        }
    }

    static async Delete ( id ) {
        try {
            let collection = DB.Client.collection('hf_research');
            id = new DB().ObjectID(id)

            let result = collection.deleteOne({_id : id})
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CHfResearch Delete'}, ...err})
        }
    }

    static async GetById ( ids ) {
        try {
            ids = new DB().arObjectID(ids)

            let collection = DB.Client.collection('hf_research');
            let result = await collection.find({_id: { $in: ids}}).toArray()
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CHfResearch GetById'}, ...err})
        }
    }


}