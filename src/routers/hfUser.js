import Joi from "joi";
import Config from "../config.json";
import CUser from "../classes/user";
import CHfUser from "../classes/hfUser";
import CAuth from "../classes/auth";

export default class {

    static async Add (ctx, next) {
        let value;
        try {
            try {
                if (ctx.request.body.hf) ctx.request.body.hf = ctx.request.body.hf.split(',')
                //схема
                const schema = Joi.object({
                    contract_id: Joi.string().min(24).max(24).required(),

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

                    contract_id: value.contract_id,
                    hf: value.hf,

                    subdivision: value.subdivision,
                    profession: value.profession,
                    employment_date: value.employment_date,

                    work_place: value.work_place,
                    work_experience: value.work_experience,
                }
                let hfUser = await CHfUser.Add ( fields );

                ctx.body = {
                    err: 0,
                    response: true
                };
            } catch (err) {
                throw ({...{err: 30100000, msg: 'RHfUser Add'}, ...err});
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
                    contract_id: Joi.string().min(24).max(24).required(),
                });
                value = await schema.validateAsync(ctx.request.query);

            } catch (err) {
                console.log(err)
                throw ({err: 412, msg: 'Неверные параметры'});
            }
            try {
                let arFields = {
                    contract_id: value.contract_id
                }

                let result = await CHfUser.Get ( arFields );

                ctx.body = {
                    err: 0,
                    response: {
                        items: result
                    }
                };
            } catch (err) {
                throw ({...{err: 30100000, msg: 'RHfUser HfUserGet'}, ...err});
            }
        } catch (err) {
            ctx.body = err;
        }
    }

}