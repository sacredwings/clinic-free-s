import Router from 'koa-router'
import authorization from './authorization'

//классы api
import routersAuth from './routers/auth'
import routersUser from './routers/user'
import routersResearch from './routers/research'
import routersAnalysis from './routers/analysis'
import routersSpecialty from './routers/specialty'


//МАРШРУТЫ
const routerAuth = new Router({prefix: '/auth'})
routerAuth.post('/login', routersAuth.Login)

const routerUser = new Router({prefix: '/user'})
routerUser.post('/add', routersUser.Add)

const routerResearch = new Router({prefix: '/research'})
routerResearch.post('/add', routersResearch.Add)

const routerAnalysis = new Router({prefix: '/analysis'})
routerAnalysis.post('/add', routersAnalysis.Add)

const routerSpecialty = new Router({prefix: '/specialty'})
routerSpecialty.post('/add', routersSpecialty.Add)

//объединеный, общий маршрут
const router = new Router()
router.use(authorization) //проверка авторизиции перед дальнейшими действиями
router.use(
    '/api',
    routerAuth.routes(),
    routerUser.routes(),
    routerResearch.routes(),
    routerAnalysis.routes(),
    routerSpecialty.routes(),
);
export default router