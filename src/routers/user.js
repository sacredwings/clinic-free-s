import Joi from "joi";
import Config from "../config.json";
import CUser from "../classes/user";
import CAuth from "../classes/auth";

export default class {

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