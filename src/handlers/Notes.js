const {Model,DataTypes}=require('sequelize');
const sequelize=require('../lib/db');

class Note extends Model{}

Note.init({
    title:{
        type:DataTypes.STRING
    },
    content:{
        type:DataTypes.STRING
    },
    archive:{
        type:DataTypes.BOOLEAN,
        defaultValue: false
    },
    category:{
        type:DataTypes.STRING
    },

},{
    sequelize,
    modelName:'Notes',
    timestamps:false
    
})

module.exports=Note;