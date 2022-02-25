const Sequelize = require('sequelize')
const sequelize = require('./main');



const Provinces = sequelize.define('Provinces',{
    province:{
        type : Sequelize.DataTypes.STRING,
        primaryKey : true,
        unique: true,
        allowNull : false,
    }
},{
    freezeTableName : true
})

const User = sequelize.define('Users',{
    id :{
        type : Sequelize.DataTypes.INTEGER,
        primaryKey :true,
        autoIncrement: true,
        allowNull: false,
        unique : true

    },
    first_name :{
        type : Sequelize.DataTypes.STRING,
        allowNull : false,
    },
    last_name:{
        type : Sequelize.DataTypes.STRING,
        allowNull: false
    },
    email :{
        type : Sequelize.DataTypes.STRING,
        allowNull : false
    },
    hash :{
        type : Sequelize.DataTypes.STRING(500),
        allowNull : false
    },
    link :{
        type : Sequelize.DataTypes.STRING,
        allowNull:true
    },
    care_type :{
        type : Sequelize.DataTypes.STRING,
        allowNull : false
    },
    occupation :{
        type:Sequelize.DataTypes.STRING,
        allowNull: false
    },
    province : {
        type:Sequelize.DataTypes.STRING,
        allowNull: false
    },
    about_me : {
        type : Sequelize.DataTypes.STRING,
        allowNull: false
    },
    age : {
        type : Sequelize.DataTypes.INTEGER,
        allowNull : false
    }
},{
    freezeTableName :true
})

const Jobs = sequelize.define('Jobs',{
    id :{
        type : Sequelize.DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true,
        unique : true,
        allowNull : false
    },
    id_user : {
        type : Sequelize.DataTypes.INTEGER,
        allowNull : false,
    },
    full_name : {
        type : Sequelize.DataTypes.STRING,
        allowNull : false
    },
    phone_number : {
        type : Sequelize.DataTypes.STRING,
        allowNull:false
    },
    location:{
        type : Sequelize.DataTypes.JSON,
        allowNull : false
    },
    job_description : {
        type : Sequelize.DataTypes.STRING(500),
        allowNull: false
    },
    time : {
        type : Sequelize.DataTypes.DATE,
        defaultValue : Sequelize.DataTypes.NOW,
        allowNull : false
    }
},{
    freezeTableName : true
})

const Housekeeper = sequelize.define('Housekeepers',{
    id_user : {
        type : Sequelize.DataTypes.INTEGER,
        primaryKey : true, 
        allowNull: false, 
        unique: true
    },
    availability : {
        type :  Sequelize.DataTypes.JSON,
        allowNull : false,
    },
    price : {
        type : Sequelize.DataTypes.INTEGER,
        allowNull : true
    }
},{
    freezeTableName : true
})

const Seniorcare = sequelize.define('Seniorcare',{
    id_user : {
        type : Sequelize.DataTypes.INTEGER,
        primaryKey : true, 
        allowNull: false, 
        unique: true
    },
    availability : {
        type : Sequelize.DataTypes.JSON,
        allowNull : false
    },
    transportation : {
        type : Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue : false
    },
    house_hold_tasks : {
        type : Sequelize.DataTypes.BOOLEAN,
        allowNull : false, 
        defaultValue : false 
    },
    personal_care :  {
        type : Sequelize.DataTypes.BOOLEAN,
        allowNull : false, 
        defaultValue : false 
    },
    mobility_assistance :  {
        type : Sequelize.DataTypes.BOOLEAN,
        allowNull : false, 
        defaultValue : false 
    },
    companionship :  {
        type : Sequelize.DataTypes.BOOLEAN,
        allowNull : false, 
        defaultValue : false 
    },
    specialized_care :  {
        type : Sequelize.DataTypes.BOOLEAN,
        allowNull : false, 
        defaultValue : false 
    }, 
    price : {
        type : Sequelize.DataTypes.INTEGER,
        allowNull : false, 
    }


},{
    freezeTableName : true
})

const Tutors = sequelize.define('Tutors',{
    id_user : {
        type : Sequelize.DataTypes.INTEGER,
        primaryKey : true, 
        allowNull: false, 
        unique: true
    },
    primary_school :  {
        type : Sequelize.DataTypes.BOOLEAN,
        allowNull : false, 
        defaultValue : false 
    }, 
    middle_school :  {
        type : Sequelize.DataTypes.BOOLEAN,
        allowNull : false, 
        defaultValue : false 
    }, 
    high_school :  {
        type : Sequelize.DataTypes.BOOLEAN,
        allowNull : false, 
        defaultValue : false 
    }, 
    education : {
        type : Sequelize.DataTypes.STRING,
        allowNull: false
    },
    availability : {
        type : Sequelize.DataTypes.JSON,
        allowNull : false
    },
    price : {
        type : Sequelize.DataTypes.INTEGER,
        allowNull : false, 
    }
    

},{
    freezeTableName:true
})

const Subjects = sequelize.define('Subjects', {
    id : {
        type : Sequelize.DataTypes.INTEGER,
        primaryKey : true,
        allowNull: false,
        unique : true,
        autoIncrement : true
    },
    id_user : {
        type : Sequelize.DataTypes.INTEGER,
        allowNull: false
    },
    subject : {
        type : Sequelize.DataTypes.STRING,
        allowNull : false
    }
},{
    freezeTableName : true
})

module.exports ={User, Provinces, Jobs, Housekeeper, Seniorcare, Tutors, Subjects}