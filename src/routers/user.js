import Joi from "joi";
import Config from "../config.json";
import CUser from "../classes/user";
import CAuth from "../classes/auth";

export default class {

    static async HfUserAdd (ctx, next) {
        let value;
        try {
            try {
                if (ctx.request.body.hf) ctx.request.body.hf = ctx.request.body.hf.split(',')
                //схема
                const schema = Joi.object({
                    org_contract_id: Joi.string().min(24).max(24).required(),

                    hf: Joi.array().min(1).max(100).required(),

                    first_name: Joi.string().min(1).max(255).required(),
                    last_name: Joi.string().min(1).max(255).required(),
                    patronymic_name: Joi.string().min(1).max(255).allow(null).empty('').default(null),

                    man: Joi.number().integer().min(0).max(1).required(),

                    date_birth: Joi.date().min('1-1-1900').max('1-1-2030').required(),

                    oms_policy_number: Joi.number().integer().min(999999999999999).max(9999999999999999).allow(null).empty('').default(null),
                    snils: Joi.number().integer().min(9999999999).max(99999999999).allow(null).empty('').default(null),

                    region: Joi.string().min(0).max(255).allow(null).empty('').default(null),
                    city: Joi.string().min(0).max(255).allow(null).empty('').default(null),
                    street: Joi.string().min(0).max(255).allow(null).empty('').default(null),
                    house: Joi.string().min(0).max(255).allow(null).empty('').default(null),
                    housing: Joi.string().min(0).max(255).allow(null).empty('').default(null),
                    apt: Joi.string().min(0).max(255).allow(null).empty('').default(null),
                    building: Joi.string().min(0).max(255).allow(null).empty('').default(null),

                    passport_serial: Joi.number().integer().min(1).max(9999).allow(null).empty('').default(null),
                    passport_number: Joi.number().integer().min(1).max(999999).allow(null).empty('').default(null),
                    passport_date: Joi.date().min('1-1-1900').max('1-1-2030').allow(null).empty('').default(null),

                    passport_issued_by: Joi.string().min(0).max(255).allow(null).empty('').default(null),
                    phone: Joi.number().integer().min(70000000000).max(79999999999).allow(null).empty('').default(null),
                    phone_additional: Joi.number().integer().min(70000000000).max(79999999999).allow(null).empty('').default(null),

                    subdivision: Joi.string().min(0).max(255).allow(null).empty('').default(null),
                    profession: Joi.string().min(0).max(255).allow(null).empty('').default(null),
                    employment_date: Joi.date().min('1-1-1900').max('1-1-2030').allow(null).empty('').default(null),

                    work_place: Joi.string().min(0).max(255).allow(null).empty('').default(null),
                    work_experience: Joi.number().integer().min(0).max(100).allow(null).empty('').default(null),
                });
                value = await schema.validateAsync(ctx.request.body);

            } catch (err) {
                console.log(err)
                throw ({err: 412, msg: 'Неверные параметры'});
            }
            try {
                let fields = {
                    first_name: value.first_name,
                    last_name: value.last_name,
                    patronymic_name: value.patronymic_name,

                    man: value.man,

                    date_birth: value.date_birth,

                    oms_policy_number: value.oms_policy_number,
                    snils: value.snils,

                    region: value.region,
                    city: value.city,
                    street: value.street,
                    house: value.house,
                    housing: value.housing,
                    apt: value.apt,
                    building: value.building,

                    passport_serial: value.passport_serial,
                    passport_number: value.passport_number,
                    passport_date: value.passport_date,

                    passport_issued_by: value.passport_issued_by,
                    phone: value.phone,
                    phone_additional: value.phone_additional,
                }
                let user = await CUser.Add ( fields );

                fields = {
                    user_id: fields._id,

                    org_contract_id: value.org_contract_id,
                    hf: value.hf,

                    subdivision: value.subdivision,
                    profession: value.profession,
                    employment_date: value.employment_date,

                    work_place: value.work_place,
                    work_experience: value.work_experience,
                }
                let hfUser = await CUser.HfUserAdd ( fields );

                ctx.body = {
                    err: 0,
                    response: true
                };
            } catch (err) {
                throw ({...{err: 30100000, msg: 'RUser Add'}, ...err});
            }
        } catch (err) {
            ctx.body = err;
        }
    }

    static async HfUserGet (ctx, next) {
        let value;
        try {
            try {
                //схема
                const schema = Joi.object({
                    org_contract_id: Joi.string().min(24).max(24).required(),
                });
                value = await schema.validateAsync(ctx.request.query);

            } catch (err) {
                console.log(err)
                throw ({err: 412, msg: 'Неверные параметры'});
            }
            try {
                let arFields = {
                    org_contract_id: value.org_contract_id
                }

                let result = await CUser.HfUserGet ( arFields );

                ctx.body = {
                    err: 0,
                    response: result
                };
            } catch (err) {
                throw ({...{err: 30100000, msg: 'RUser HfUserGet'}, ...err});
            }
        } catch (err) {
            ctx.body = err;
        }
    }

    static async Add (ctx, next) {
        let value;
        try {
            try {
                //схема
                const schema = Joi.object({
                    first_name: Joi.string().min(1).max(255).allow(null).empty('').default(null),
                    last_name: Joi.string().min(1).max(255).allow(null).empty('').default(null),
                    patronymic_name: Joi.string().min(1).max(255).allow(null).empty('').default(null),

                    login: Joi.string().min(5).max(255).allow(null).empty('').default(null),
                    password: Joi.string().min(8).max(60).allow(null).empty('').default(null),

                    medical_specialty_ids: Joi.array().min(1).max(200).items(Joi.string().min(12).max(12)).allow(null).empty('').default(null),
                    working_specialty_ids: Joi.array().min(1).max(200).items(Joi.string().min(12).max(12)).allow(null).empty('').default(null),
                    harmful_factor_ids: Joi.array().min(1).max(200).items(Joi.string().min(12).max(12)).allow(null).empty('').default(null),
                });
                value = await schema.validateAsync(ctx.request.body);

            } catch (err) {
                console.log(err)
                throw ({err: 412, msg: 'Неверные параметры'});
            }
            try {
                //список
                let arFields = {
                    login: value.login,
                    password: value.password,
                    first_name: value.login
                }
                let regCode = await CUser.Add ( arFields );

                ctx.body = {
                    err: 0,
                    response: true
                };
            } catch (err) {
                throw ({...{err: 30100000, msg: 'RUser Add'}, ...err});
            }
        } catch (err) {
            ctx.body = err;
        }
    }

    /*
    static async Reg (ctx, next) {
        let value;
        try {
            try {
                //схема
                const schema = Joi.object({
                    email: Joi.string().min(8).max(100).email().required(),

                    login: Joi.string().min(5).max(50).required(),
                    password: Joi.string().min(8).max(60).required(),

                    gtoken: Joi.string().required(),
                });
                value = await schema.validateAsync(ctx.request.body);

                //проверка google reCaptcha
                if (!await reCaptcha(value.gtoken, Config.google.reCaptchaToken)) throw ({err: 910, msg: 'Проверка reCaptcha'})

            } catch (err) {
                console.log(err)
                throw ({err: 412, msg: 'Неверные параметры'});
            }
            try {
                //список
                let arFields = {
                    email: value.email,
                    login: value.login,
                    password: value.password,
                    first_name: value.login
                }
                let regCode = await CUser.Reg ( arFields );

                //коннект
                const transporter = createTransport(Config.mail.reg);
                //отправка
                transporter.sendMail({
                    from: Config.mail.reg.auth.user,
                    to: value.email,
                    subject: 'VoenSet.ru - завершите регистрацию',
                    html: `Для завершения регистрации, перейдите по ссылке - <a href="https://voenset.ru/reg-activate/${regCode}">Завершить регистрацию</a>`
                });

                ctx.body = {
                    err: 0,
                    response: true
                };
            } catch (err) {
                throw ({...{err: 30100000, msg: 'Ошибка формирования результата'}, ...err});
            }
        } catch (err) {
            ctx.body = err;
        }
    }

    static async RegActivate (ctx, next) {
        let value;
        try {
            try {
                //схема
                const schema = Joi.object({
                    code: Joi.string().min(32).max(32).required(),
                });
                value = await schema.validateAsync(ctx.request.body);

            } catch (err) {
                console.log(err)
                throw ({err: 412, msg: 'Неверные параметры'});
            }
            try {

                let items = await CUser.RegActivate ( value.code );

                ctx.body = {
                    err: 0,
                    response: true
                };
            } catch (err) {
                throw ({...{err: 30100000, msg: 'Ошибка формирования результата'}, ...err});
            }
        } catch (err) {
            ctx.body = err;
        }
    }

    static async GetById (ctx, next) {
        let value;
        try {
            try {
                //редактируем массив перед проверкой
                ctx.request.query.ids = ctx.request.query.ids.split(',');

                //схема
                const schema = Joi.object({
                    ids: Joi.array().min(1).max(50).items(Joi.number().integer().min(1).max(9223372036854775807)).required()
                });
                value = await schema.validateAsync(ctx.request.query);

            } catch (err) {
                console.log(err)
                throw ({err: 412, msg: 'Неверные параметры'});
            }
            try {
                let result = await CUser.GetById ( value.ids );

                //фильтр
                if (result)
                    delete result.password

                ctx.body = {
                    err: 0,
                    response: result
                };
            } catch (err) {
                throw ({...{err: 30100000, msg: 'Ошибка формирования результата'}, ...err});
            }
        } catch (err) {
            ctx.body = err;
        }
    }
    static async Search (ctx, next) {
        let value;
        try {
            try {
                //схема
                const schema = Joi.object({
                    q: Joi.string().min(3).max(50).allow(null).empty('').default(null),

                    offset: Joi.number().integer().min(0).max(9223372036854775807).allow(null).empty('').default(0),
                    count: Joi.number().integer().min(0).max(200).allow(null).empty('').default(20)
                });
                value = await schema.validateAsync(ctx.request.query);

            } catch (err) {
                console.log(err)
                throw ({err: 412, msg: 'Неверные параметры'});
            }
            try {
                let arFields = {
                    q: value.q,
                    offset: value.offset,
                    count: value.count
                }
                let items = await CUser.Search ( arFields );
                let count = await CUser.SearchCount ( arFields );

                ctx.body = {
                    err: 0,
                    response: {
                        count: count,
                        items: items,
                    }
                };
            } catch (err) {
                throw ({...{err: 30100000, msg: 'Ошибка формирования результата'}, ...err});
            }
        } catch (err) {
            ctx.body = err;
        }
    }*/
}