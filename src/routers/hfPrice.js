import Joi from "joi";
import CHfOrg from "../classes/hfOrg";
import CHfPrice from "../classes/hfPrice";

export default class {
    static async Get (ctx, next) {
        let value;
        try {
            try {
                //схема
                const schema = Joi.object({
                    contract_id: Joi.string().min(24).max(24).allow(null).empty('').default(null)
                });

                value = await schema.validateAsync(ctx.request.query);

            } catch (err) {
                console.log(err)
                throw ({...{err: 412, msg: 'Неверные параметры'}, ...err});
            }
            try {
                let resultResearch = await CHfPrice.Get (value.contract_id, 'research');
                let resultAnalysis = await CHfPrice.Get (value.contract_id, 'specialty');
                let resultSpecialty = await CHfPrice.Get (value.contract_id, 'analysis');

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

    static async EditUserFiz (ctx, next) {
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

    static async Edit (ctx, next) {
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
