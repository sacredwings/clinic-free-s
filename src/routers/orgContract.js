import Joi from "joi";
import CContract from "../classes/contract";

export default class {

    static async Add (ctx, next) {
        let value;
        try {
            try {
                //схема
                const schema = Joi.object({
                    name: Joi.string().min(1).max(255).required(),
                    org_id: Joi.array().min(1).max(200).items(Joi.string().min(12).max(12)).required()
                });

                value = await schema.validateAsync(ctx.request.body);

            } catch (err) {
                console.log(err)
                throw ({...{err: 412, msg: 'Неверные параметры'}, ...err});
            }
            try {
                let result = await CContract.Add ( value );

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