import Router from 'koa-router'
import authorization from './authorization'

//классы api
import routersInit from './routers/init'
import routersAuth from './routers/auth'
import routersUser from './routers/user'

import routersHfResearch from './routers/hfResearch.js'
import routersHfAnalysis from './routers/hfAnalysis'
import routersHfSpecialty from './routers/hfSpecialty'

import routersOrg from './routers/org'
import routersOrgContract from './routers/orgContract'

const routerInit = new Router({prefix: '/init'})
routerInit.post('/vf', routersInit.VF)

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

const routerOrg = new Router({prefix: '/org'})
routerOrg.post('/add', routersOrg.Add)

const routerOrgContract = new Router({prefix: '/org-contract'})
routerOrgContract.post('/add', routersOrgContract.Add)

//объединеный, общий маршрут
const router = new Router()
router.use(authorization) //проверка авторизиции перед дальнейшими действиями
router.use(
    '/api',
    routerInit.routes(),
    routerAuth.routes(),
    routerUser.routes(),

    routerOrg.routes(),
    routerOrgContract.routes(),

);
export default router