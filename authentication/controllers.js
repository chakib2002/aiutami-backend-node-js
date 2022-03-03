const db = require('../models/model');
const sequelize = require('../models/main');
const bcrypt = require('bcrypt');


const get_email = async (email)=>{
    const res = await db.User.findOne({
        Attributes :['email'],
        where : {
            email : email
        }
    })
        return await res ;
}

exports.add_user = async (req, res, next)=>{
    const result = await get_email(req.body.email);
    if(result){
        res.status(404).json({"message":"user already exists !"})
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
            if(req.body.care_type == 'seniorcare'){
                await db.Seniorcare.create({
                    id_user : user.dataValues.id,
                    transportation : req.body.transportation,
                    house_hold_tasks : req.body.house_hold_tasks,
                    personal_care : req.body.personal_care,
                    mobility_assistance : req.body.mobility_assistance,
                    companionship : req.body.companionship,
                    specialized_care : req.body.specialized_care
                }, {transaction : tOne})
            res.status(200).json({"message": "user signed up successfully ."})
            
            }else if (req.body.care_type == "housekeeper"){
                await db.Housekeeper.create({
                    id_user : user.dataValues.id
                },{transaction : tOne})

            res.status(200).json({"message": "user signed up successfully ."})
           
            }else if (req.body.care_type =='tutor'){
                await db.Tutors.create({
                        id_user : user.dataValues.id,
                        level : req.body.level,
                        schoolyear : req.body.schoolyear,
                        education : req.body.education,
                        subject : req.body.subject
                    }, {transaction : tOne})
                res.status(200).json({"message": "user signed up successfully ."})
            }else{
                res.status(500).json({"message": "An error has occured please sign up again ."})
                throw new Error()
            }
        })
        } catch (error) {
            res.status(500).json({"message": "An error has occured please sign up again ."})
        }
    
    }
}

exports.logout =  (req, res, next) => {
    req.session.destroy(function (err) {
        if (err){ 
            throw err 
        }else{
            res.status(200).json({"message" :"You have logged out successfully ."});
        }
    });
}

exports.login = (req,res) =>{
    if(req.session){
        res.status(200).json({"message": "you have logged in successfully ."})
    }else{
        res.status(401).json({"message": "Email / password combination is wrong please login again ."})
    }
}
