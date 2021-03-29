import Joi from "joi";
import CPriceServices from "../classes/priceServices";

export default class {

    static async Add (ctx, next) {
        let value;
        try {
            try {
                //схема
                const schema = Joi.object({
                    code: Joi.string().min(1).max(255).required(),
                    name: Joi.string().min(1).max(255).required(),
                    user_id: Joi.array().min(1).max(200).items(Joi.string().min(12).max(12)).required(),
                    price: Joi.number().integer().min(0).max(999999999).required(),
                });

                value = await schema.validateAsync(ctx.request.body);

            } catch (err) {
                console.log(err)
                throw ({...{err: 412, msg: 'Неверные параметры'}, ...err});
            }
            try {
                let result = await CPriceServices.Add ( value );

                ctx.body = {
                    err: 0,
                    response: result
                };
            } catch (err) {
                throw ({...{err: 10000000, msg: 'RPriceResearch Add'}, ...err});
            }
        } catch (err) {
            ctx.body = err;
        }
    }
}