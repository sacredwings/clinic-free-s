import Joi from "joi";
import CHfOrg from "../classes/hfOrg";
import CHfResearch from "../classes/hfResearch";
import CHfAnalysis from "../classes/hfAnalysis";
import CHfSpecialty from "../classes/hfSpecialty";


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
                let result = await CHfOrg.Add ( value );

                ctx.body = {
                    err: 0,
                    response: result
                };
            } catch (err) {
                throw ({...{err: 10000000, msg: 'RHfOrg Add'}, ...err});
            }
        } catch (err) {
            ctx.body = err;
        }
    }

    static async GetById (ctx, next) {
        let value;
        try {
            try {
                //схема
                const schema = Joi.object({
                    id: Joi.string().min(24).max(24).required(),
                });

                value = await schema.validateAsync(ctx.request.query);

            } catch (err) {
                console.log(err)
                throw ({...{err: 412, msg: 'Неверные параметры'}, ...err});
            }
            try {
                let fields = {
                    _id: value.id
                }
                let result = await CHfOrg.GetById (fields);

                ctx.body = {
                    err: 0,
                    response: result[0]
                };
            } catch (err) {
                throw ({...{err: 10000000, msg: 'RHfOrg GetById'}, ...err});
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
                    contract: Joi.number().integer().min(0).max(1).allow(null).empty('').default(0),
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
                    contract: value.contract
                }

                let params = {
                    offset: value.offset,
                    count: value.count
                }
                let result = await CHfOrg.Get (fields, params);

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

    static async PriceGet (ctx, next) {
        let value;
        try {
            try {
                //схема
                const schema = Joi.object({
                    org_id: Joi.string().min(24).max(24).allow(null).empty('').default(null),
                    contract_id: Joi.string().min(24).max(24).allow(null).empty('').default(null),
                });

                value = await schema.validateAsync(ctx.request.query);

            } catch (err) {
                console.log(err)
                throw ({...{err: 412, msg: 'Неверные параметры'}, ...err});
            }
            try {
                console.log(value)
                let resultResearch = await CHfResearch.PriceGet (value);
                let resultAnalysis = await CHfAnalysis.PriceGet (value);
                let resultSpecialty = await CHfSpecialty.PriceGet (value);

                ctx.body = {
                    err: 0,
                    response: {
                        research: resultResearch,
                        analysis: resultAnalysis,
                        specialty: resultSpecialty
                    }
                };
            } catch (err) {
                throw ({...{err: 10000000, msg: 'ROrg Get'}, ...err});
            }
        } catch (err) {
            ctx.body = err;
        }
    }

    static async PriceEdit (ctx, next) {
        let value;
        try {
            try {
                //схема
                const schema = Joi.object({
                    org_id: Joi.string().min(24).max(24).allow(null).empty('').default(null),
                    contract_id: Joi.string().min(24).max(24).allow(null).empty('').default(null),
                    object_id: Joi.string().min(24).max(24).required(),
                    price: Joi.number().integer().min(1).max(999999).required(),
                });

                value = await schema.validateAsync(ctx.request.body);

            } catch (err) {
                console.log(err)
                throw ({...{err: 412, msg: 'Неверные параметры'}, ...err});
            }
            try {
                let result = await CHfOrg.PriceEdit ( value );

                ctx.body = {
                    err: 0,
                    response: result
                };
            } catch (err) {
                throw ({...{err: 10000000, msg: 'RHfOrg Add'}, ...err});
            }
        } catch (err) {
            ctx.body = err;
        }
    }
}