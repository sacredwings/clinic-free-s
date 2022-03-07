import Joi from "joi";
import CHfResearch from "../classes/hfResearch";
import CHfSpecialist from "../classes/hfSpecialist";
import CHarmfulFactor from "../classes/hf";

export default class {

    static async Add (ctx, next) {
        let value;
        try {
            try {
                //схема
                const schema = Joi.object({
                    name: Joi.string().min(1).max(255),
                    //price_prof: Joi.number().integer().min(0).max(999999999).allow(null).empty('').default(null),
                    //price: Joi.number().integer().min(0).max(999999999).allow(null).empty('').default(null),
                });

                value = await schema.validateAsync(ctx.request.body);

            } catch (err) {
                console.log(err)
                throw ({...{err: 412, msg: 'Неверные параметры'}, ...err})
            }
            try {
                let result = await CHfResearch.Add ( value )

                ctx.body = {
                    err: 0,
                    response: result
                };
            } catch (err) {
                throw ({...{err: 10000000, msg: 'RHfResearch Add'}, ...err})
            }
        } catch (err) {
            ctx.body = err
        }
    }
    static async Get (ctx, next) {
        let value;
        try {
            try {
                let result = await CHfResearch.Get ()

                ctx.body = {
                    err: 0,
                    response: {
                        items: result
                    }
                };
            } catch (err) {
                throw ({...{err: 10000000, msg: 'RHfResearch Get'}, ...err})
            }
        } catch (err) {
            ctx.body = err
        }
    }
    static async UpdateHf (ctx, next) {
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
                throw ({...{err: 412, msg: 'Неверные параметры'}, ...err})
            }
            try {
                let result = await CHfResearch.UpdateHf ( value )

                ctx.body = {
                    err: 0,
                    response: result
                };
            } catch (err) {
                throw ({...{err: 10000000, msg: 'RHfResearch Add'}, ...err})
            }
        } catch (err) {
            ctx.body = err
        }
    }
    static async Update (ctx, next) {
        let value;
        try {
            try {
                //схема
                const schema = Joi.object({
                    id: Joi.string().min(24).max(24).required(),
                    name: Joi.string().min(1).max(255).required(),
                });

                value = await schema.validateAsync(ctx.request.body)

            } catch (err) {
                console.log(err)
                throw ({...{err: 412, msg: 'Неверные параметры'}, ...err})
            }
            try {
                let arFields = {
                    name: value.name
                }
                let result = await CHfResearch.Update ( value._id, arFields )

                ctx.body = {
                    err: 0,
                    response: result
                };
            } catch (err) {
                throw ({...{err: 10000000, msg: 'RHfResearch Update'}, ...err})
            }
        } catch (err) {
            ctx.body = err
        }
    }
    static async Delete (ctx, next) {
        let value;
        try {
            try {
                //схема
                const schema = Joi.object({
                    id: Joi.string().min(24).max(24).required(),
                });

                value = await schema.validateAsync(ctx.request.body)

            } catch (err) {
                console.log(err)
                throw ({...{err: 412, msg: 'Неверные параметры'}, ...err})
            }
            try {
                let arFields = {
                    name: value.name
                }
                let result = await CHfResearch.Delete ( value._id )

                ctx.body = {
                    err: 0,
                    response: result
                };
            } catch (err) {
                throw ({...{err: 10000000, msg: 'RHfResearch Delete'}, ...err})
            }
        } catch (err) {
            ctx.body = err
        }
    }
}