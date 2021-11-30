import Joi from "joi";
import CHfContract from "../classes/hfContract";
import CHfUser from "../classes/hfUser";
import CHf from "../classes/hf";
import CHfResearch from "../classes/hfResearch";
import CHfSpecialty from "../classes/hfSpecialty";

export default class {

    static async Add (ctx, next) {
        let value;
        try {
            try {
                //схема
                const schema = Joi.object({
                    org_id: Joi.string().min(24).max(24).required(),
                    name: Joi.string().min(3).max(255).required(),

                    date_from: Joi.date().allow(null).empty('').default(null),
                    date_to: Joi.date().allow(null).empty('').default(null),
                    price: Joi.number().integer().min(0).max(999999).allow(null).empty('').default(null),
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
/*
    static async StatisticByUser (ctx, next) {
        let value;
        try {
            try {
                //схема
                const schema = Joi.object({
                    contract_id: Joi.string().min(24).max(24).required(),
                    user_id: Joi.string().min(24).max(24).required(),
                });

                value = await schema.validateAsync(ctx.request.query);

            } catch (err) {
                console.log(err)
                throw ({...{err: 412, msg: 'Неверные параметры'}, ...err});
            }
            try {

                //люди в договоре
                let arFields = {
                    contract_id: value.contract_id,
                    user_id: value.user_id
                }
                let arUser = await CHfUser.GetById ( arFields );

                //пользователей нет - выходим
                if (!arUser.length) {
                    ctx.body = {
                        err: 0,
                        response: {
                        }
                    };
                    return false
                }

                //массив вредных факторов (с повторами для дальнейших умножений)
                let arCode = []
                //у пользователя массив
                arUser.forEach((item, i) => {
                    for (let code of item.hf)
                        arCode.push(code)
                })

                //вредные факторы (в единичном экземляре)
                let arHf = await CHf.GetByCode ( arCode )

                //списки
                let arHfResearch = []
                let arHfSpecialty = []

                arHf.forEach((item, i) => {
                    //достаем каждый элемент /в строке обязательно
                    for (let item_research_id of item.research_id)
                        arHfResearch.push(item_research_id)

                    for (let item_specialty_id of item.specialty_id)
                        arHfSpecialty.push(item_specialty_id)
                })

                //arHfResearch = new Set(arHfResearch);
                //arHfResearch = new Set(arHfResearch);

                arHfResearch = await CHfResearch.GetById ( arHfResearch )
                arHfSpecialty = await CHfSpecialty.GetById ( arHfSpecialty )

                ctx.body = {
                    err: 0,
                    response: {
                        user: arUser[0].user[0],
                        //items: arUser,
                        //code: arCode,
                        hf: arUser[0].hf,
                        //arHfResearchCount: arHfOneResearch,
                        //arHfSpecialtyCount: arHfOneSpecialty,
                        research: arHfResearch,
                        specialty: arHfSpecialty
                    }
                };
            } catch (err) {
                throw ({...{err: 10000000, msg: 'COrgContract StatisticByUser'}, ...err});
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

                //пользователей нет - выходим
                if (!arUser.length) {
                    ctx.body = {
                        err: 0,
                        response: {
                        }
                    };
                    return false
                }

                //вредные факторы (в единичном экземляре) на всех пользователей
                let arHf = await hrUsers(arUser)

                console.log(arHf)
                console.log(arUser)
                /*
                let arHfResearchCount = []
                let arHfSpecialtyCount = []
                let arHfOneResearch = []
                let arHfOneSpecialty = []
                arHf.forEach((item, i) => {

                    //количество повторов вредных факторов
                    let count = hfCount(item.code, arCode)

                    //на каждый элемент - количество
                    for (let item_research of item.research)
                        arHfOneResearch.push({...item_research, count: count})

                    //на каждый элемент - количество
                    for (let item_specialty of item.specialty)
                        arHfOneSpecialty.push({...item_specialty, count: count})

                    //---
                    for (let item_research of item.research) {

                        let exit = false

                        for (let arHfResearch of arHfResearchCount) {
                            console.log(item_research._id)
                            console.log(arHfResearch._id)

                            //console.log(item_research)
                            //console.log(arHfResearch)

                            if (item_research._id.toString() === arHfResearch._id.toString()) {
                                console.log('!!!!!!!!!!!')
                                arHfResearch.count += count

                                exit = true
                                continue
                            }
                            console.log('----------------')
                        }

                        if (exit) continue

                        arHfResearchCount.push({...item_research, count: count})

                    }

                    //---
                    for (let item_specialty of item.specialty) {

                        let exit = false

                        for (let arHfSpecialty of arHfSpecialtyCount) {
                            console.log(item_specialty._id)
                            console.log(arHfSpecialty._id)

                            //console.log(item_research)
                            //console.log(arHfResearch)

                            if (item_specialty._id.toString() === arHfSpecialty._id.toString()) {
                                console.log('!!!!!!!!!!!')
                                arHfSpecialty.count += count

                                exit = true
                                continue
                            }
                            console.log('----------------')
                        }

                        if (exit) continue

                        arHfSpecialtyCount.push({...item_specialty, count: count})

                    }

                })*/
/*
                console.log('111111111111111')
                //Объединение в одно
                let resResearch = []
                let resSpecialty = []

                let result = arHfOneResearch.reduce((acc, val) => {

                })*/
/*
                arHfOneResearch.forEach((item) => {

                    if (!resResearch.length)
                        resResearch.push(item)

                    else {
                        for (let i = 0; i < resResearch.length; i++) {
                            console.log(item._id)
                            console.log(resResearch[i]._id)
                            console.log('---------------')
                            if (item._id === resResearch[i]._id) {
                                console.log('совпадение')
                                resResearch[i].count += item.count
                                continue
                            }

                            //resResearch.push(item)
                        }
                    }



                })*/



                /*
let arCode = await Promise.all(arUser.map(async (item, i) => {
    return item.hf;
}));*/
/*
                ctx.body = {
                    err: 0,
                    response: {
                        items: arUser,
                        code: arCode,
                        hf: arHf,
                        arHfResearchCount: arHfOneResearch,
                        arHfSpecialtyCount: arHfOneSpecialty,
                        research: arHfResearchCount,
                        specialty: arHfSpecialtyCount
                    }
                };
            } catch (err) {
                throw ({...{err: 10000000, msg: 'COrgContract Get'}, ...err});
            }
        } catch (err) {
            ctx.body = err;
        }
    }*/
}

const hrUsers = async (arUsers) => {
    //массив вредных факторов (с повторами для дальнейших умножений)
    let arCode = []
    //у пользователя массив
    arUsers.forEach((item, i) => {
        for (let code of item.hf)
            arCode.push(code)
    })

    //вредные факторы (в единичном экземляре)
    return await CHf.GetByCode ( arCode )
}

const hrUserElements = async () => {

}

const hrCode = async (code, arUserCode) => {
    let research = []
    let specialty = []
}

const hfCount = (code, arCode) => {
    let i = 0

    arCode.forEach((item) => {
        if (item === code)
            i++
    })
    return i
}

const hfOneCount = (arr) => {
    let result = []

    for (let itemArr of arr) {

        let exit = false

        for (let itemResult of result) {
            //console.log(item_research._id)
            //console.log(arHfResearch._id)

            //console.log(item_research)
            //console.log(arHfResearch)

            if (itemArr._id.toString() === itemResult._id.toString()) {
                result.count += count

                exit = true
                continue
            }
        }

        if (exit) continue

        result.push({...itemArr, count: count})

    }

    return result
}