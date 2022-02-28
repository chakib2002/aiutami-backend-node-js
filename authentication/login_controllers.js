const db = require('../models/model');


const get_email = async(email)=>{
    await db.User.sync().then(()=>{
        return db.User.findOne({
            attributes : ['Email'],
            where : {
                Email : email
            }
        })
    })
    .then((data)=> data? true : false )
    .catch((err)=> {
        throw err
    })
}

const get_password = async(email)=>{
    await db.User.sync().then(()=>{
        return db.User.findOne({
            attributes : ['hash'],
            where : {
                Email : email
            }
        })
    }).then(data=>data.dataValues.hash)
    .catch(err=>{
        throw err
    })
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

module.exports={get_email, get_password, userby_id, id_ofuser}
