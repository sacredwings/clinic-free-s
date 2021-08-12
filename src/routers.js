import Router from 'koa-router'
import authorization from './authorization'

//классы api
import routersInit from './routers/init'
import routersAuth from './routers/auth'
import routersUser from './routers/user'

import routersHfResearch from './routers/hfResearch.js'
import routersHfAnalysis from './routers/hfAnalysis'
import routersHfSpecialty from './routers/hfSpecialty'

import routersHfOrg from './routers/hfOrg'
import routersHfContract from './routers/hfContract'
import routersHfUser from './routers/hfUser'

const routerInit = new Router({prefix: '/init'})
routerInit.post('/hf', routersInit.Hf)

//МАРШРУТЫ
const routerAuth = new Router({prefix: '/auth'})
routerAuth.post('/login', routersAuth.Login)

const routerUser = new Router({prefix: '/user'})
routerUser.post('/add', routersUser.Add)

/*
const routerResearch = new Router({prefix: '/hf-research'})
routerResearch.post('/add', routersResearch.Add)

const routerAnalysis = new Router({prefix: '/hf-analysis'})
routerAnalysis.post('/add', routersAnalysis.Add)

const routerSpecialty = new Router({prefix: '/hf-specialty'})
routerSpecialty.post('/add', routersSpecialty.Add)
*/

const routerHfOrg = new Router({prefix: '/hf-org'})
routerHfOrg.post('/add', routersHfOrg.Add)
routerHfOrg.get('/getById', routersHfOrg.GetById)
routerHfOrg.get('/get', routersHfOrg.Get)
routerHfOrg.get('/priceGet', routersHfOrg.PriceGet)
routerHfOrg.get('/priceEdit', routersHfOrg.PriceEdit)

const routerHfContract = new Router({prefix: '/hf-contract'})
routerHfContract.post('/add', routersHfContract.Add)
routerHfContract.get('/get', routersHfContract.Get)
routerHfContract.get('/getById', routersHfContract.GetById)
routerHfContract.get('/statistic', routersHfContract.Statistic)
routerHfContract.get('/statisticByUser', routersHfContract.StatisticByUser)

const routerHfUser = new Router({prefix: '/hf-user'})
routerHfUser.post('/add', routersHfUser.Add)
routerHfUser.get('/get', routersHfUser.Get)

//объединеный, общий маршрут
const router = new Router()
router.use(authorization) //проверка авторизиции перед дальнейшими действиями
router.use(
    '/api',
    routerInit.routes(),
    routerAuth.routes(),
    routerUser.routes(),

    routerHfOrg.routes(),
    routerHfContract.routes(),
    routerHfUser.routes(),

);
export default router