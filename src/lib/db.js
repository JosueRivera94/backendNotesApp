const {Sequelize}=require('sequelize')

const sequelize=new Sequelize('notesDb','user','pass',{
    dialect:'sqlite',
    host:'./dev.sqlite'
   
})

module.exports=sequelize;