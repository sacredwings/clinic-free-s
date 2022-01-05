//ПОДКЛЮЧЕНИЕ МОДУЛЕЙ
//Основной модуль
import Koa from 'koa'

global.__dirname = __dirname

//Парсер
import cookie from 'koa-cookie';
import koaBody from 'koa-body';

//Кросдоменный запрос
import cors from '@koa/cors';

//Для статичных файлов
import serve from 'koa-static' /* Подключение статичных файлов */
import mount from 'koa-mount'  /* Подмена/дополнение путей к фалам */

//Подключение маршрутов / API
import routers from "./routers";

//Модуль для работы с базой
import config from "./config.json";

//Модуль для работы с базой
import { DB } from 'social-framework/build/classes/db';

//ЗАПУСК МОДУЛЕЙ
const app = new Koa(); /* Основной модуль */
app.use(cors()); /* Кросдоменный запрос */
app.use(cookie()); /* Парсер куки */
app.use(koaBody());
app.use(routers.routes()); /* Маршруты */

//Загреженные файлы
const filesStatic = new Koa()
filesStatic.use(serve('./public'))
app.use(mount('/files', filesStatic))

//запуск сервера
app.listen(config.server.port);

Start().then().catch();
async function Start () {
    console.log('Работаю')

    const dbName = 'clinic'
    const parameters = {
        host: '',
        port: '',
        login: '',
        password: '',
        source: 'admin'
    }

    //с ожиданием
    DB.Client = await new DB().Init(parameters, dbName)

    //let connect = await mongo.MongoClient('mongodb://localhost:27017', { useUnifiedTopology: true })
    //mongo.db = await connect.db('clinic')

}