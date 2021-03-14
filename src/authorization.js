import CAuth from "./classes/auth";

export default async function (ctx, next) {
    console.log(ctx.path);

    const privileges = {
        '/api/auth/login': {auth: 0},
    };

    if ((!privileges[ctx.path]) || (!privileges[ctx.path].auth)) {
        return next();
    }

    if ((!ctx.cookie) || ((!ctx.cookie.tid) || (!ctx.cookie.token))) {
        //ctx.response.status = 401;
        ctx.body = {err: 401};
        return;
    }

    //поиск ключа
    let token = await CAuth.GetById( ctx.cookie.tid );
    if ((!token) || (!token.token) || (token.token !== ctx.cookie.token)) {
        //ctx.response.status = 401;
        ctx.body = {err: 401};
        return;
    }

    ctx.auth = {
        user_id: Number (token.user_id)
    };

    return next();
}
