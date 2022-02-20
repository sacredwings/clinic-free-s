import Router from 'koa-router'
import authorization from './authorization'

//классы api
import routersInit from './routers/init'
import routersAuth from './routers/auth'
import routersUser from './routers/user'

import routersHfResearch from './routers/hfResearch.js'
import routersHfSpecialist from './routers/hfSpecialist'
import routersHf from './routers/hf'
import routersHfOrg from './routers/hfOrg'
import routersHfContract from './routers/hfContract'
import routersHfUser from './routers/hfUser'
import routersHfPrice from './routers/hfPrice'

const routerInit = new Router({prefix: '/init'})
routerInit.post('/hf', routersInit.Hf)

//МАРШРУТЫ
const routerAuth = new Router({prefix: '/auth'})
routerAuth.post('/login', routersAuth.Login)

const routerUser = new Router({prefix: '/user'})
routerUser.post('/add', routersUser.Add)

const routerHf = new Router({prefix: '/hf'})
routerHf.post('/add', routersHf.Add)
routerHf.get('/get', routersHf.Get)

const routerHfSpecialist = new Router({prefix: '/hf-specialist'})
routerHfSpecialist.post('/add', routersHfSpecialist.Add)
routerHfSpecialist.post('/update', routersHfSpecialist.Update)
routerHfSpecialist.get('/get', routersHfSpecialist.Get)

const routerHfResearch = new Router({prefix: '/hf-research'})
routerHfResearch.post('/add', routersHfResearch.Add)
routerHfResearch.get('/get', routersHfResearch.Get)

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
//routerHfOrg.get('/priceGet', routersHfOrg.PriceGet)
//routerHfOrg.post('/priceEdit', routersHfOrg.PriceEdit)
routerHfOrg.get('/pdfUser', routersHfOrg.PdfUser)

const routerHfContract = new Router({prefix: '/hf-contract'})
routerHfContract.post('/add', routersHfContract.Add)
routerHfContract.get('/get', routersHfContract.Get)
routerHfContract.get('/getById', routersHfContract.GetById)
//routerHfContract.get('/statistic', routersHfContract.Statistic)
//routerHfContract.get('/statisticByUser', routersHfContract.StatisticByUser)

const routerHfUser = new Router({prefix: '/hf-user'})
routerHfUser.post('/add', routersHfUser.Add)
routerHfUser.get('/get', routersHfUser.Get)

const routerHfPrice = new Router({prefix: '/hf-price'})
routerHfPrice.get('/get', routersHfPrice.Get)
routerHfPrice.post('/edit', routersHfPrice.Edit)
routerHfPrice.post('/editUserFiz', routersHfPrice.EditUserFiz)


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
    routerHfPrice.routes(),
    routerHf.routes(),

    routerHfSpecialist.routes(),
    routerHfResearch.routes(),
);
export default router