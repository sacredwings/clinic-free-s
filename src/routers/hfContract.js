import Joi from "joi";
import CHfContract from "../classes/hfContract";
import CHfUser from "../classes/hfUser";
import CHf from "../classes/hf";

export default class {

    static async Add (ctx, next) {
        let value;
        try {
            try {
                //схема
                const schema = Joi.object({
                    org_id: Joi.string().min(24).max(24).required(),
                    name: Joi.string().min(3).max(255).required(),

                    code: Joi.string().min(1).max(255).allow(null).empty('').default(null),
                    date_from: Joi.string().min(3).max(255).allow(null).empty('').default(null),
                    date_to: Joi.string().min(3).max(255).allow(null).empty('').default(null),
                });

                value = await schema.validateAsync(ctx.request.body);

            } catch (err) {
                console.log(err)
                throw ({...{err: 412, msg: 'Неверные параметры'}, ...err});
            }
            try {
                let result = await CHfContract.Add ( value );

                ctx.body = {
                    err: 0,
                    response: result
                };
            } catch (err) {
                throw ({...{err: 10000000, msg: 'CHfContract Add'}, ...err});
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
                    org_id: Joi.string().min(24).max(24).required(),

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
                    org_id: value.org_id
                }
                let params = {
                    offset: value.offset,
                    count: value.count
                }
                let result = await CHfContract.Get (fields, params);

                ctx.body = {
                    err: 0,
                    response: {
                        items: result
                    }
                };
            } catch (err) {
                throw ({...{err: 10000000, msg: 'COrgContract Get'}, ...err});
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
                let result = await CHfContract.GetById (fields);

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

    static async Statistic (ctx, next) {
        let value;
        try {
            try {
                //схема
                const schema = Joi.object({
                    contract_id: Joi.string().min(24).max(24).required(),
                });

                value = await schema.validateAsync(ctx.request.query);


            } catch (err) {
                console.log(err)
                throw ({...{err: 412, msg: 'Неверные параметры'}, ...err});
            }
            try {

                //люди в договоре
                let arFields = {
                    contract_id: value.contract_id
                }
                let arUser = await CHfUser.Get ( arFields );

                //массив вредных факторов (с повторами для дальнейших умножений)
                let arCode = []
                //у пользователя массив
                arUser.forEach((item, i) => {
                    for (let code of item.hf)
                        arCode.push(code)
                })

                //вредные факторы (в единичном экземляре)
                let arHf = await CHf.GetByCode ( arCode )
                let research = []
                let specialty = []
                arHf.forEach((item, i) => {

                    //количество повторов вредных факторов
                    let count = hfCount(item.code, arCode)

                    //на каждый элемент - количество
                    for (let item_research of item.research)
                        research.push({research: item_research, count: count})

                    //на каждый элемент - количество
                    for (let item_specialty of item.specialty)
                        specialty.push({specialty: item_specialty, count: count})
                })



                /*
let arCode = await Promise.all(arUser.map(async (item, i) => {
    return item.hf;
}));*/

                ctx.body = {
                    err: 0,
                    response: {
                        items: arUser,
                        code: arCode,
                        hf: arHf,
                        research: research,
                        specialty: specialty
                    }
                };
            } catch (err) {
                throw ({...{err: 10000000, msg: 'COrgContract Get'}, ...err});
            }
        } catch (err) {
            ctx.body = err;
        }
    }
}

const hfCount = (code, arCode) => {
    let i = 0

    arCode.forEach((item) => {
        if (item === code)
            i++
    })
    return i
}