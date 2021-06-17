import Joi from "joi";
import COrg from "../classes/org";

export default class {

    static async Add (ctx, next) {
        let value;
        try {
            try {
                //схема
                const schema = Joi.object({
                    name: Joi.string().min(3).max(255).required(),
                    full_name: Joi.string().min(3).max(255).allow(null).empty('').default(null),

                    inn: Joi.number().integer().min(0).max(9223372036854775807).allow(null).empty('').default(null),
                    kpp: Joi.number().integer().min(0).max(9223372036854775807).allow(null).empty('').default(null),
                    ogrn: Joi.number().integer().min(0).max(9223372036854775807).allow(null).empty('').default(null),

                    payment_account: Joi.number().integer().min(0).max(9223372036854775807).allow(null).empty('').default(null),

                    post_code: Joi.number().integer().min(0).max(9223372036854775807).allow(null).empty('').default(null),
                    country: Joi.string().min(1).max(255).allow(null).empty('').default(null),
                    region: Joi.string().min(1).max(255).allow(null).empty('').default(null),
                    district: Joi.string().min(1).max(255).allow(null).empty('').default(null),
                    locality: Joi.string().min(1).max(255).allow(null).empty('').default(null),
                    street: Joi.string().min(1).max(255).allow(null).empty('').default(null),
                    house: Joi.string().min(1).max(255).allow(null).empty('').default(null),
                    corps: Joi.string().min(1).max(255).allow(null).empty('').default(null),
                    structure: Joi.string().min(1).max(255).allow(null).empty('').default(null),
                    flat: Joi.number().integer().min(0).max(9223372036854775807).allow(null).empty('').default(null),
                });

                value = await schema.validateAsync(ctx.request.body);

            } catch (err) {
                console.log(err)
                throw ({...{err: 412, msg: 'Неверные параметры'}, ...err});
            }
            try {
                let result = await COrg.Add ( value );

                ctx.body = {
                    err: 0,
                    response: result
                };
            } catch (err) {
                throw ({...{err: 10000000, msg: 'ROrg Add'}, ...err});
            }
        } catch (err) {
            ctx.body = err;
        }
    }

    static async Get (ctx, next) {
        let value;
        try {
            try {
                //схема
                const schema = Joi.object({
                    offset: Joi.number().integer().min(0).max(9223372036854775807).allow(null).empty('').default(0),
                    count: Joi.number().integer().min(0).max(200).allow(null).empty('').default(20)
                });

                value = await schema.validateAsync(ctx.request.query);

            } catch (err) {
                console.log(err)
                throw ({...{err: 412, msg: 'Неверные параметры'}, ...err});
            }
            try {
                let fields = {
                    offset: value.offset,
                    count: value.count
                }
                let result = await COrg.Get ( fields);

                ctx.body = {
                    err: 0,
                    response: {
                        items: result
                    }
                };
            } catch (err) {
                throw ({...{err: 10000000, msg: 'ROrg Get'}, ...err});
            }
        } catch (err) {
            ctx.body = err;
        }
    }
}