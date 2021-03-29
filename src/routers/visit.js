import Joi from "joi";
import CVisit from "../classes/visit";

export default class {

    static async Add (ctx, next) {
        let value;
        try {
            try {
                //схема
                const schema = Joi.object({
                    doctor_id: Joi.string().min(12).max(12),
                    user_id: Joi.string().min(12).max(12),

                    priceAnalysis: Joi.array().min(1).max(200).items(Joi.string().min(12).max(12)).allow(null).empty('').default(null),
                    priceResearch: Joi.array().min(1).max(200).items(Joi.string().min(12).max(12)).allow(null).empty('').default(null),
                    priceServices: Joi.array().min(1).max(200).items(Joi.string().min(12).max(12)).allow(null).empty('').default(null),
                });

                value = await schema.validateAsync(ctx.request.body);

            } catch (err) {
                console.log(err)
                throw ({...{err: 412, msg: 'Неверные параметры'}, ...err});
            }
            try {
                let result = await CVisit.Add ( value );

                ctx.body = {
                    err: 0,
                    response: result
                };
            } catch (err) {
                throw ({...{err: 10000000, msg: 'RVisit Add'}, ...err});
            }
        } catch (err) {
            ctx.body = err;
        }
    }
}