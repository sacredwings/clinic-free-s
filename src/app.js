//ПОДКЛЮЧЕНИЕ МОДУЛЕЙ
//Основной модуль
import Koa from 'koa'

//Парсер
import cookie from 'koa-cookie';
import koaBody from 'koa-body';

//Кросдоменный запрос
import cors from '@koa/cors';

//Подключение маршрутов / API
import routers from "./routers";

//Модуль для работы с базой
import config from "./config.json";

//Модуль для работы с базой
import mongo from 'mongodb';

//ЗАПУСК МОДУЛЕЙ
const app = new Koa(); /* Основной модуль */
app.use(cors()); /* Кросдоменный запрос */
app.use(cookie()); /* Парсер куки */
app.use(koaBody());
app.use(routers.routes()); /* Маршруты */

//запуск сервера
app.listen(config.server.port);

Start().then().catch();
async function Start () {
    console.log('Работаю')
    //Сохраняем коннект
    let connect = await mongo.MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true })
    mongo.db = await connect.db('clinic')

}