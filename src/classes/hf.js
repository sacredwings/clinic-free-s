//Модуль для работы с базой
import { DB } from 'social-framework/build/classes/db';

export default class {

    static async Add ( fields ) {
        try {
            let collection = DB.Client.collection('hf');
            let result = await collection.findOne(fields)

            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CHarmfulFactor Add'}, ...err})
        }
    }

    static async Get (  ) {
        try {
            let collection = DB.Client.collection('hf');

            return await collection.find().toArray();

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CHarmfulFactor Get'}, ...err})
        }
    }

    static async GetByCode ( arCode ) {
        try {
            let collection = DB.Client.collection('hf');

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
                            from: 'hf_specialist',
                            localField: 'specialist_id',
                            foreignField: '_id',
                            as: 'specialist'
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