import Router from 'koa-router'
import authorization from './authorization'

//классы api
import routersAuth from './routers/auth'
import routersUser from './routers/user'

//МАРШРУТЫ
const routerAuth = new Router({prefix: '/auth'});
routerAuth.post('/login', routersAuth.Login);

const routerUser = new Router({prefix: '/user'});
routerUser.post('/add', routersUser.Add);

//объединеный, общий маршрут
const router = new Router();
router.use(authorization); //проверка авторизиции перед дальнейшими действиями
router.use(
    '/api',
    routerAuth.routes(),
    routerUser.routes(),
);
export default router;