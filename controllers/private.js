const client = require ('../redis/redis_config.js');
const db = require('../models/model');


// look up for new notifications in redis store
exports.checkForNewNotifications = async (req, res, next )=>{
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
    .catch(err => res.status(500).json({error : 'An error has occured'}))
}

// delete the notification from the redis store and update the "new" column of the jobs table in the db 
exports.DeleteNotificationsFromRedisStore = async (req, res, next )=>
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

                await db.Jobs.update({new : 0}, {
                    where : {
                        id_user : req.session.passport.user,
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

// get all viewed notifications (not new notifications)
exports.fetchNotifications = async (req, res, next)=>{
    await db.Jobs.sync().then(async()=>{
        return await db.Jobs.findAll({
            where : {
                id_user : req.session.passport.user,
                new : 0
            }
        })
        .then(data => res.status(200).json(data))
        .catch(err=> res.status(500).json({error : 'An error has occured'}))
    })
}

// get all accepted notifications 
exports.fetchAcceptedJobRequestNotifications = async (req, res, next)=>{
    await db.Jobs.sync().then(async()=>{
        return await db.Jobs.findAll({
            where : {
                id_user : req.session.passport.user,
                accepted : 1
            }
        })
        .then(data => res.status(200).json(data))
        .catch(err=> res.status(500).json({error : 'An error has occured'}))
    })
}

// delete a notification
exports.deleteNotification = async (req, res, next)=>{
    await db.Jobs.sync().then(async()=>{
        return await db.Jobs.destroy({
            where : {
                id_user : req.session.passport.user,
                id : req.params.id
            }
        })
        .then((data) => (
            data === 0? 
                res.status(404).json({message : 'Unkown notification'}) 
                    :
                res.status(200).json({message : 'Notification deleted successfuly'})
            )
        )
        .catch( err =>res.status(500).json({error : 'An error has occured'}))
    })
}

// update seen 
exports.updateSeen = async (req, res, next)=>{
    const id = req.params.id
    await db.Jobs.sync().then(async()=>{
        return await db.Jobs.update({
            seen : 1
        },{
            where : {
                id : id,
                id_user : req.session.passport.user,
            }
        })
        .then(data => res.status(200).json(data))
        .catch(err=> res.status(500).json({error : 'An error has occured'}))
    })
}

// update accepted
exports.updateAccepted = async (req, res, next)=>{
    const id = req.params.id
    await db.Jobs.sync().then(async()=>{
        return await db.Jobs.update({
            accepted : 1
        },{
            where : {
                id : id,
                id_user : req.session.passport.user,
            }
        })
        .then(data => res.status(200).json(data))
        .catch(err=> res.status(500).json({error : 'An error has occured'}))
    })
}