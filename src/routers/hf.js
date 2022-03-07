import Joi from "joi";
import CHarmfulFactor from "../classes/hf";

export default class {

    static async Add (ctx, next) {
        let value;
        try {
            try {
                //схема
                const schema = Joi.object({
                    //code: Joi.string().min(1).max(255).required(),
                    name: Joi.string().min(1).max(255).required(),
                    //specialty_ids: Joi.array().min(1).max(200).items(Joi.string().min(12).max(12)).required(),
                    //research_ids: Joi.array().min(1).max(200).items(Joi.string().min(12).max(12)).required()
                });

                value = await schema.validateAsync(ctx.request.body);

            } catch (err) {
                console.log(err)
                throw ({...{err: 412, msg: 'Неверные параметры'}, ...err});
            }
            try {
                let result = await CHarmfulFactor.Add ( value );

                ctx.body = {
                    err: 0,
                    response: result
                };
            } catch (err) {
                throw ({...{err: 10000000, msg: 'RHarmfulFactor Add'}, ...err});
            }
        } catch (err) {
            ctx.body = err;
        }
    }
    static async Get (ctx, next) {
        let value;
        try {
            try {
                let result = await CHarmfulFactor.Get ()

                ctx.body = {
                    err: 0,
                    response: {
                        items: result
                    }
                };
            } catch (err) {
                throw ({...{err: 10000000, msg: 'RHarmfulFactor Get'}, ...err});
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
                    id: Joi.string().min(24).max(24).required(),
                    name: Joi.string().min(1).max(255).required(),
                });

                value = await schema.validateAsync(ctx.request.body);

            } catch (err) {
                console.log(err)
                throw ({...{err: 412, msg: 'Неверные параметры'}, ...err});
            }
            try {
                let arFields = {
                    name: value.name
                }
                let result = await CHarmfulFactor.Update ( value._id, arFields );

                ctx.body = {
                    err: 0,
                    response: result
                };
            } catch (err) {
                throw ({...{err: 10000000, msg: 'RHarmfulFactor Update'}, ...err});
            }
        } catch (err) {
            ctx.body = err;
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

                value = await schema.validateAsync(ctx.request.body);

            } catch (err) {
                console.log(err)
                throw ({...{err: 412, msg: 'Неверные параметры'}, ...err});
            }
            try {
                let arFields = {
                    name: value.name
                }
                let result = await CHarmfulFactor.Delete ( value._id );

                ctx.body = {
                    err: 0,
                    response: result
                };
            } catch (err) {
                throw ({...{err: 10000000, msg: 'RHarmfulFactor Delete'}, ...err});
            }
        } catch (err) {
            ctx.body = err;
        }
    }
}