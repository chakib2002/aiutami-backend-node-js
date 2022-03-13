const client = require ('../redis/redis_config.js');
const db = require('../models/model');

exports.checkNotifications = async (req, res, next )=>{
    const user_id = await req.session.passport.user;
    const ids = req.body.ids;
    await client.EXISTS('user-'+user_id)
    .then(async (existence) =>{
        if( existence === 1){

            const data = await client.XRANGE('user-'+user_id, '-','+')
            const result = JSON.stringify(data)
            const response = await JSON.parse(result)

            const processedResponse =await response.filter(element => {
                const exists = !!ids.find(current =>{
                    return current == element.message.id
                })

                if(exists === false){
                    return element
                }

            })
            
            return await processedResponse ;

        }else{
            next();
        }
    })

    .then(data=>res.status(200).json(data))

    .catch(err => console.error(err) )
}

exports.updateNotifications = async (req, res, next )=>
    new Promise(async (resolve, reject)=>{    
        const user_id = req.session.passport.user;
        const ids = req.body.ids; 
        let array = [];
        try{
        const existence = await client.EXISTS('user-'+user_id);
            if(existence === 0 ){
                resolve('process completed')
            }else{
                const data = await client.XRANGE('user-'+user_id, '-', '+');
                const stringify = JSON.stringify(data);
                const response = await JSON.parse(stringify);
                await response.forEach(element => {
                    console.log(element)
                    const exists = !!ids.find(current =>{
                        return current == element.message.id
                    });
                    if(exists===true){
                        array.push(element.id)
                    }
                    
                });
                array.forEach(async(element)=>{
                    console.log(element);
                    await client.XDEL('user-'+user_id, element)
                })

                await db.Jobs.update({seen : 1}, {
                    where : {
                        id : ids
                    }
                })
                resolve ('process completed')

            }
        }catch(err){
            reject("An error has occured")
        }

        }).then((data)=>res.status(200).json({message : data}))
          .catch((err)=>res.status(500).json({message : err}))