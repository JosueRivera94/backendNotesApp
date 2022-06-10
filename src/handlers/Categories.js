const {Model,DataTypes}=require('sequelize');
const sequelize=require('../lib/db');

class Categorie extends Model{}

Categorie.init({
    category:{
        type:DataTypes.STRING
    },


},{
    sequelize,
    modelName:'Categories',
    timestamps:false
    
})



module.exports=Categorie;