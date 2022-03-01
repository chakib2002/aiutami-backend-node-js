const  sequelize  = require('../models/main');
const db = require('../models/model');
const bcrypt = require ('bcrypt');


const get_email = async (email)=>{

}

const get_hash = async (email)=>{

}



const  userby_id= async(id)=>{
    await db.User.sync().then(()=>{
        return db.User.findOne({
            attributes : ['Email'],
            where : {
                id : id
            }
        })
    }).then(data=>data.dataValues.Email)
    .catch (err=> {
        throw err
    })
}

const  id_ofuser= async(Email)=>{
    await db.User.sync().then(()=>{
        return db.User.findOne({
            attributes : ['id'],
            where : {
                Email : Email
            }
        })
    }).then(data=>data.dataValues.id)
    .catch (err=> {
        throw err
    })
}

const add_user = (req, res, next )=>{

}




module.exports={get_email, get_hash, userby_id, id_ofuser, add_user}
