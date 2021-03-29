import Joi from "joi";
import CAuth from "../classes/auth";
import Config from "../config.json";

export default class {

    static async Login (ctx, next) {
        let value;
        try {
            try {
                //схема
                const schema = Joi.object({
                    login: Joi.string().min(5).max(30),
                    password: Joi.string().min(8).max(30)
                });

                value = await schema.validateAsync(ctx.request.body);

            } catch (err) {
                console.log(err)
                throw ({...{err: 412, msg: 'Неверные параметры'}, ...err});
            }
            try {

                let arFields = {
                    login: value.login,
                    password: value.password,
                    ip: ctx.request.ip,
                    browser: ctx.headers['user-agent']
                }

                let result = await CAuth.Login ( arFields );

                ctx.body = {
                    err: 0,
                    response: result
                };
            } catch (err) {
                throw ({...{err: 10000000, msg: 'RAuth Add'}, ...err});
            }
        } catch (err) {
            ctx.body = err;
        }
    }
}