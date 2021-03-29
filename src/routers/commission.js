import Joi from "joi";
import CCommission from "../classes/commission";

export default class {

    static async Add (ctx, next) {
        let value;
        try {
            try {
                //схема
                const schema = Joi.object({
                    harmful_factor_ids: Joi.array().min(1).max(100).items(Joi.string().min(12).max(12)).required(),
                    analysis_ids: Joi.array().min(1).max(100).items(Joi.string().min(12).max(12)).required(),
                });

                value = await schema.validateAsync(ctx.request.body);

            } catch (err) {
                console.log(err)
                throw ({...{err: 412, msg: 'Неверные параметры'}, ...err});
            }
            try {
                let result = await CCommission.Add ( value );

                ctx.body = {
                    err: 0,
                    response: result
                };
            } catch (err) {
                throw ({...{err: 10000000, msg: 'RCommission Add'}, ...err});
            }
        } catch (err) {
            ctx.body = err;
        }
    }
}