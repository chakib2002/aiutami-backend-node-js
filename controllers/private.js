const client = require ('../redis/redis_config.js');


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

