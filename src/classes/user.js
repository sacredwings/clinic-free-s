import mongo from 'mongodb';
import crypto from "crypto";
import bcrypt from "bcrypt";

export default class {

    //поиск по login
    static async Add ( fields ) {
        try {

            if (fields.login) {
                //в нижний регистр
                fields.login = fields.login.toLowerCase()

                //поиск пользователя по логину
                let user = await this.GetByLogin(fields.login);
                if (user)
                    throw ({err: 1001001, msg: 'Пользователь уже существует'});

                //создаем hash код
                let hash = new Date().toString();
                hash = crypto.createHash('md5').update(hash).digest("hex");

                //создаем hash пароль
                const saltRounds = 10;
                let passwordSalt = await bcrypt.genSalt(saltRounds);
                fields.password = await bcrypt.hash(fields.password, passwordSalt);
            }

            let collection = mongo.db.collection('user')

            //fields.org_contract_id = mongo.ObjectID(fields.org_contract_id)
            let result = await collection.insertOne(fields)

            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CUser Add'}, ...err})
        }
    }

    //поиск по login
    static async GetByLogin ( login ) {
        try {
            //в нижний регистр
            login = login.toLowerCase()

            let collection = mongo.db.collection('user');
            let result = await collection.findOne({login: login})

            return result

        } catch (err) {
            console.log(err)
            throw ({err: 7001000, msg: 'CUser GetByLogin'})
        }
    }
}