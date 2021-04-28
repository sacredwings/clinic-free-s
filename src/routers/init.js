import mongo from 'mongodb';

export default class {

    static async VF (ctx, next) {
        let value;
        try {
            try {
                let collection = mongo.db.collection('price_research')

                let arResearch = [
                    ['Спирометрия ',0],
                    ['Пульсоксиметрия ',0],
                    ['Биомикроскопия глаза ',0],
                    ['Исследование уровня ретикулоцитов ',0],
                    ['Исследование уровня метгемоглобина в крови ',0],
                    ['Визометрия ',0],
                    ['',0],
                    ['',0],
                    ['',0],
                    ['',0],
                    ['',0],
                    ['',0],
                    ['',0],
                    ['',0],
                    ['',0],
                    ['',0],
                    ['',0],
                    ['',0],
                    ['',0],
                    ['',0],
                    ['',0],
                    ['',0],
                    ['',0],
                    ['',0],
                    ['',0],
                    ['',0],
                    ['',0],
                    ['',0],
                    ['',0],
                    ['',0],
                    ['',0],
                ]

                arResearch = arResearch.map((item, i)=>{
                    return {name: item[0], price: item[1]}
                })

                await collection.insert(arResearch)

                console.log(arResearch)

                let arHarmfulFactor = [
                    ['1.1',  'Азота неорганические соединения (в том числе азота оксиды0, азота диоксид0)', [
                        arResearch[1]._id
                    ]],
                    ['',0],
                    ['',0],
                    ['',0],
                    ['',0],
                    ['',0],
                    ['',0],
                    ['',0],
                    ['',0],
                    ['',0],
                    ['',0],
                    ['',0],
                    ['',0],
                    ['',0],
                    ['',0],
                    ['',0],
                    ['',0],
                    ['',0],
                    ['',0],
                    ['',0],
                    ['',0],
                    ['',0],
                    ['',0],
                    ['',0],
                    ['',0],
                    ['',0],
                ]

                arHarmfulFactor = arHarmfulFactor.map((item, i)=>{
                    return {code: item[0], name: item[1], research: item[2]}
                })

                console.log(arHarmfulFactor)

                let collectionHarmfulFactor = mongo.db.collection('harmful_factor')
                await collectionHarmfulFactor.insert(arHarmfulFactor)

                console.log(arHarmfulFactor)

                ctx.body = {
                    err: 0,
                    //response: collectionHarmfulFactor
                };
            } catch (err) {
                throw ({...{err: 10000000, msg: 'RInit VF'}, ...err});
            }
        } catch (err) {
            ctx.body = err;
        }
    }
}