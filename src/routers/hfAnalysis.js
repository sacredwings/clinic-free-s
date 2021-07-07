import Joi from "joi";
import CHfAnalysis from "../classes/hfAnalysis";

export default class {

    static async Add (ctx, next) {
        let value;
        try {
            try {
                //схема
                const schema = Joi.object({
                    name: Joi.string().min(1).max(255),
                    price_prof: Joi.number().integer().min(0).max(999999999).allow(null).empty('').default(null),
                    price: Joi.number().integer().min(0).max(999999999).allow(null).empty('').default(null),
                });

                value = await schema.validateAsync(ctx.request.body);

            } catch (err) {
                console.log(err)
                throw ({...{err: 412, msg: 'Неверные параметры'}, ...err});
            }
            try {
                let result = await CHfAnalysis.Add ( value );

                ctx.body = {
                    err: 0,
                    response: result
                };
            } catch (err) {
                throw ({...{err: 10000000, msg: 'RHfAnalysis Add'}, ...err});
            }
        } catch (err) {
            ctx.body = err;
        }
    }
}