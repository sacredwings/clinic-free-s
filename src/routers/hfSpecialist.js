import Joi from "joi";
import CHfSpecialist from "../classes/hfSpecialist";

export default class {

    static async Add (ctx, next) {
        let value;
        try {
            try {
                //схема
                const schema = Joi.object({
                    name: Joi.string().max(255).required()
                    //price_prof: Joi.number().integer().min(0).max(999999999).allow(null).empty('').default(null)
                });

                value = await schema.validateAsync(ctx.request.body);

            } catch (err) {
                console.log(err)
                throw ({...{err: 412, msg: 'Неверные параметры'}, ...err});
            }
            try {
                let result = await CHfSpecialist.Add ( value );

                ctx.body = {
                    err: 0,
                    response: result
                };
            } catch (err) {
                throw ({...{err: 10000000, msg: 'RHfSpecialist Add'}, ...err});
            }
        } catch (err) {
            ctx.body = err;
        }
    }
    static async Get (ctx, next) {
        let value;
        try {
            try {
                let result = await CHfSpecialist.Get ()

                ctx.body = {
                    err: 0,
                    response: {
                        items: result
                    }
                };
            } catch (err) {
                throw ({...{err: 10000000, msg: 'RHfSpecialist Get'}, ...err});
            }
        } catch (err) {
            ctx.body = err;
        }
    }
    static async Update (ctx, next) {
        let value;
        try {
            try {
                //схема
                const schema = Joi.object({
                    hf_id: Joi.string().max(24).max(24).required(),
                    id: Joi.string().max(24).max(24).required(),
                });

                value = await schema.validateAsync(ctx.request.body);

            } catch (err) {
                console.log(err)
                throw ({...{err: 412, msg: 'Неверные параметры'}, ...err});
            }
            try {
                let result = await CHfSpecialist.Update ( value );

                ctx.body = {
                    err: 0,
                    response: result
                };
            } catch (err) {
                throw ({...{err: 10000000, msg: 'RHfSpecialist Add'}, ...err});
            }
        } catch (err) {
            ctx.body = err;
        }
    }
}