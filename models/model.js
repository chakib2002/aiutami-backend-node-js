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
    freezeTableName : true,
    timestamps : false
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
    about_me : {
        type : Sequelize.DataTypes.STRING,
        allowNull: false
    },
    age : {
        type : Sequelize.DataTypes.INTEGER,
        allowNull : false
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
    freezeTableName :true,
    timestamps : false
})

Provinces.hasMany(User
, {
    foreignKey: {
        name :'province',
        type : Sequelize.DataTypes.STRING,
        allowNull : false,
        onDelete : 'cascade',
        onUpdate : 'cascade'
    }
}
)
User.belongsTo(Provinces
, {
    foreignKey: {
        name :'province',
        type : Sequelize.DataTypes.STRING,
        allowNull : false,
        onDelete : 'cascade',
        onUpdate : 'cascade'
    }
}
)


const Jobs = sequelize.define('Jobs',{
    id :{
        type : Sequelize.DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true,
        unique : true,
        allowNull : false
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
    freezeTableName : true,
    timestamps : false
})

User.hasMany(Jobs, {
    foreignKey : {
        name : 'id_user',
        type : Sequelize.DataTypes.INTEGER,
        allowNull : false,
        onDelete :'cascade',
        onUpdate :'cascade'
    }
})
Jobs.belongsTo(User, {
    foreignKey : {
        name : 'id_user',
        type : Sequelize.DataTypes.INTEGER,
        allowNull : false,
        onDelete :'cascade',
        onUpdate :'cascade'
    }
})



const Housekeeper = sequelize.define('Housekeepers',{
    id_user : {
        type : Sequelize.DataTypes.INTEGER,
        primaryKey : true, 
        allowNull: false, 
        unique: true
    },

},{
    freezeTableName : true,
    timestamps : false
})

User.hasOne(Housekeeper ,{
    foreignKey :{
        name : 'id_user',
        type : Sequelize.DataTypes.INTEGER,
        allowNull: false,
        unique : true,

    }
})
Housekeeper.belongsTo(User, {
    foreignKey :{
        name : 'id_user',
        type : Sequelize.DataTypes.INTEGER,
        allowNull: false,
        unique : true,

    }
})

const Seniorcare = sequelize.define('Seniorcare',{
    id_user : {
        type : Sequelize.DataTypes.INTEGER,
        primaryKey : true, 
        allowNull: false, 
        unique: true
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



},{
    freezeTableName : true,
    timestamps : false
})

User.hasOne(Seniorcare ,{
    foreignKey :{
        name : 'id_user',
        type : Sequelize.DataTypes.INTEGER,
        allowNull: false,
        unique : true,

    }
})
Seniorcare.belongsTo(User, {
    foreignKey :{
        name : 'id_user',
        type : Sequelize.DataTypes.INTEGER,
        allowNull: false,
        unique : true,

    }
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

    

},{
    freezeTableName:true,
    timestamps : false
})

User.hasOne(Tutors ,{
    foreignKey :{
        name : 'id_user',
        type : Sequelize.DataTypes.INTEGER,
        allowNull: false,
        unique : true,

    }
})
Tutors.belongsTo(User, {
    foreignKey :{
        name : 'id_user',
        type : Sequelize.DataTypes.INTEGER,
        allowNull: false,
        unique : true,

    }
})

const Subjects = sequelize.define('Subjects', {
    id : {
        type : Sequelize.DataTypes.INTEGER,
        primaryKey : true,
        allowNull: false,
        unique : true,
        autoIncrement : true
    },
    subject : {
        type : Sequelize.DataTypes.STRING,
        allowNull : false
    }
},{
    freezeTableName : true,
    timestamps : false
})

Tutors.hasMany(Subjects, {
    foreignKey : {
        name : 'id_user',
        type : Sequelize.DataTypes.INTEGER,
        allowNull : false,
        onDelete :'cascade',
        onUpdate :'cascade'
    }
})
Subjects.belongsTo(Tutors, {
    foreignKey : {
        name : 'id_user',
        type : Sequelize.DataTypes.INTEGER,
        allowNull : false,
        onDelete :'cascade',
        onUpdate :'cascade'
    }
})


module.exports ={User, Provinces, Jobs, Housekeeper, Seniorcare, Tutors, Subjects}