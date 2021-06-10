import Joi from "joi";
import COrganization from "../classes/organization";

export default class {

    static async Add (ctx, next) {
        let value;
        try {
            try {
                //схема
                const schema = Joi.object({
                    name: Joi.string().min(1).max(255).required(),
                    inn: Joi.number().integer().min(0).max(9223372036854775807).required(),
                });

                value = await schema.validateAsync(ctx.request.body);

            } catch (err) {
                console.log(err)
                throw ({...{err: 412, msg: 'Неверные параметры'}, ...err});
            }
            try {
                let result = await COrganization.Add ( value );

                ctx.body = {
                    err: 0,
                    response: result
                };
            } catch (err) {
                throw ({...{err: 10000000, msg: 'ROrganization Add'}, ...err});
            }
        } catch (err) {
            ctx.body = err;
        }
    }
}