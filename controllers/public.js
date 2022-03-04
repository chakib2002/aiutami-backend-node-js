const { use } = require('passport/lib');
const sequelize = require('../models/main');
const db = require('../models/model');

exports.fetch_seniorcare = async(req, res)=>{
    const care_type = req.params.care_type.toString();
    const location = req.params.location.toString();
    const params = req.params
    const array =Object.values(params)

    for(let i =2; i<= 7; i++){
        if (array[i]=="true") {
            array[i]=true;            
        } else {
            array[i]=false
        }
    }

    await db.User.sync().then(()=>{
        return db.User.findAll({
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

.catch((err)=>console.log(err))}

exports.fetch_housekeeping = async (req, res)=>{
    const care_type = req.params.care_type.toString();
    const location = req.params.location.toString();
    await db.User.sync().then(()=>{
        return db.User.findAll({
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
        res.status(500).json({"error" : "Something went wrong please try again !"})
        console.log(err)
    })
}

exports.fetch_tutoring = async(req, res)=>{
    const param = req.params ;
    await db.User.sync().then(()=>{
        return db.User.findAll({
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
        res.status(500).json({"error" : "Something went wrong please try again !"})
        console.log(err)
    })
}

exports.client_request = async (req, res, next)=>{
    await db.Jobs.sync().then(()=>{
        return db.Jobs.create({
            id_user : req.params.user_id,
            full_name : req.body.full_name,
            phone_number : req.body.phone_number,
            location : req.body.location,
            job_description : req.body.job_description,
        })
        .then(()=>res.status(200).json({"message":"request have been sent successfully ."}))
        .catch(()=>res.status(500).json({"message": "an error has occured please send again the request ."}))

    })

}


