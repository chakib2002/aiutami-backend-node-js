const sequelize = require('../models/main');
const db = require('../models/model');
const client = require ('../redis/redis_config.js');


exports.fetch_seniorcare = async(req, res)=>{
    const care_type =  req.params.care_type.toString();
    const location =  req.params.location.toString();
    const params =  req.params
    const array = Object.values(params)

    for(let i =2; i<= 7; i++){
        if (array[i]=="true") {
            array[i]=true;            
        } else {
            array[i]=false
        }
    }

    await db.User.sync().then(async ()=>{
        return await db.User.findAll({
            attributes: {exclude: ['hash'] }, where: {
                care_type: care_type,
                province :  location,
            }, include : {
                model : db.Seniorcare,
                where : {
                    transportation : array[2],
                    house_hold_tasks : array[3],
                    personal_care :array[4],
                    mobility_assistance : array[5],
                    companionship: array[6],
                    specialized_care : array[7],
                }
            },
        })    
    }
)
.then((data)=> {
    res.status(200).json(data)
})

.catch((err)=>res.status(500).json({error : 'An error has occured'}))}

exports.fetch_housekeeping = async (req, res)=>{
    const care_type = req.params.care_type.toString();
    const location = req.params.location.toString();
    await db.User.sync().then(async()=>{
        return await db.User.findAll({
            attributes: {
                exclude: ['hash'] 
            }, where: {
                care_type: care_type,
                province :  location,
            }
        })
    })
    .then((data)=> res.status(200).json(data))
    .catch((err)=> {
        res.status(500).json({error : 'An error has occured'})
    })
}

exports.fetch_tutoring = async(req, res)=>{
    const param = req.params ;
    await db.User.sync().then(async()=>{
        return await db.User.findAll({
            attributes: {exclude: ['hash'] }, where: {
                care_type: param.care_type,
                province :  param.location,
            },
            include : {
                model : db.Tutors,
                where : {
                    level : param.level,
                    schoolyear : param.schoolyear,
                    subject : param.subject
                }
            },
    
        })
    })
    .then((data)=>res.status(200).json(data))
    .catch((err)=>{
        res.status(500).json({error : 'An error has occured'})
        console.log(err)
    })
}



exports.client_request = async (req, res, next)=>
    new Promise(async(resolve, reject)=>{

        const tTransaction = await sequelize.transaction()
        try {
            // get the id of the last row in jobs .
            let lastId ;
            let id ;
            const time = new Date();

            const counter =  await db.Jobs.findAll({
                attributes :["id"],
                order : [["id", "desc"]],
                limit :1
            }, {transaction : tTransaction} )
            lastId = await counter.length === 0 || await counter === undefined  ? lastId =0 : await counter[0].dataValues.id ;
            id = await lastId + 1 ;
            // Write the notification in the redis temporary storage
            await client.sendCommand(['XADD','user-'+req.params.user_id ,
                '*',
                'id', id ,
                'user_id', req.params.user_id,
                'full_name', req.body.full_name,
                'phone_number',req.body.phone_number,
                'location',req.body.location,
                'time', time ,
                'job_description', req.body.job_description
            ])
            // write the notification in the database
            await db.Jobs.create({
                id: id ,
                id_user : req.params.user_id,
                full_name : req.body.full_name,
                phone_number : req.body.phone_number,
                location : req.body.location,
                job_description : req.body.job_description,
                time : time
            },{transaction : tTransaction})

            await tTransaction.commit();
            resolve('Success');
            
        } catch (error) {   
            await tTransaction.rollback();
            reject('failure')
            console.error(error)         
        }

    })
    .then((response)=>res.status(200).json({message : response}))
    .catch((error)=>res.status(500).json({message : error}))

exports.client_profile = async (req, res, next)=>{}

