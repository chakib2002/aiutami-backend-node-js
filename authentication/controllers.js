const db = require('../models/model');
const sequelize = require('../models/main');
const bcrypt = require('bcrypt');
const res = require('express/lib/response');


const get_email = async (email)=>{
    const res = await db.User.findOne({
        Attributes :['email'],
        where : {
            email : email
        }
    })
        return await res ;
}

exports.user_exist = async (req, res, next)=>
    new Promise(async (resolve, reject)=>{
        const email = req.params.email;
        try {
            const result = await get_email(email);
            if(result){
                reject("user found")
            }else {
                resolve("user not found")
            }            
        } catch (error) {
            reject('an error has occured')
        }
    }).then((response)=>res.status(200).json({message : response}))
    .catch((response)=>res.status(304).json({message : response}))



exports.add_user = async (req, res, next)=>{
    const result = await get_email(req.body.email);
    if(result){
        res.status(409).json({message :"user already exists"})
    }else{
        try {
            const hash = bcrypt.hashSync(req.body.password, 10);
        await sequelize.transaction(async (tOne)=>{
            const user = await db.User.create({
                first_name : req.body.first_name,
                last_name : req.body.last_name,
                email : req.body.email,
                hash : hash,
                link : req.body.link,
                care_type : req.body.care_type,
                occupation : req.body.occupation,
                province : req.body.province,
                about_me : req.body.about_me,
                age : req.body.age,
                price : req.body.price,
                availability : req.body.availability
            }, {transaction : tOne});
            if(req.body.care_type == 'Senior caregiver'){
                await db.Seniorcare.create({
                    id_user : user.dataValues.id,
                    transportation : req.body.transportation,
                    house_hold_tasks : req.body.house_hold_tasks,
                    personal_care : req.body.personal_care,
                    mobility_assistance : req.body.mobility_assistance,
                    companionship : req.body.companionship,
                    specialized_care : req.body.specialized_care
                }, {transaction : tOne})
            res.status(200).json({message: "user signed up successfully ."})
            
            }else if (req.body.care_type == "housekeeper"){
                await db.Housekeeper.create({
                    id_user : user.dataValues.id
                },{transaction : tOne})

            res.status(200).json({message: "user signed up successfully ."})
           
            }else if (req.body.care_type =='Tutor'){
                await db.Tutors.create({
                        id_user : user.dataValues.id,
                        level : req.body.level,
                        schoolyear : req.body.schoolyear,
                        education : req.body.education,
                        subject : req.body.subject
                    }, {transaction : tOne})
                res.status(200).json({message: "user signed up successfully ."})
            }else{
                res.status(500).json({error : 'An error has occured'})
            }
        })
        } catch (error) {
            res.status(500).json({error : error})
        }
    
    }
}

exports.logout =  (req, res, next) => {
    req.session.destroy(function (err) {
        if (err){ 
            throw err 
        }else{
            res.status(200).json({message :"You have logged out successfully ."});
        }
    });
}

exports.login = (req,res) =>{
    if(req.user){
        res.status(200).json({
            message: "you have logged in successfully .",
            id : req.user.id,
            first_name : req.user.first_name,
            last_name : req.user.last_name,
            link : req.user.link
        })
    }else{
        res.status(401).json({message: "Email / password combination is wrong please login again ."})
    }
}
