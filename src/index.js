const express = require("express");
const sequelize=require('./lib/db')
const Note=require('../src/handlers/Notes')
const Categorie=require('../src/handlers/Categories')
const cors = require('cors');

sequelize.sync({ alter: true }).then(()=>console.log('Db is ready'));

sequelize.sync({ force: true })
  .then(() => {
    console.log(`Tables & data created!`);

    Categorie.bulkCreate([
      { category: 'Personal'},
      { category: 'Work'},
      { category: 'Daily'},
   
    ]).then(function() {
      return Categorie.findAll();
    }).then(function(categories) {
     // console.log(categories);
    });
  });

const app = express();


app.use(express.json());
app.use(cors())

app.post('/notes',async(req,res)=>{
    try {
        await Note.create(req.body);
        res.send('Note added')

    } catch (error) {
        res.status(500).send({
            errorMessage:"There was an error trying to create a note",
            errorDetails:error,
        });
    }
   
})

//Get all the notes
app.get('/notes',async(req,res,next)=>{
    try {
        const notes = await Note.findAll({where:{archive:false}});
        if(!notes){
            response.status(404).send({message:"notes not found"});
            next();
        }
        res.send(notes);

    } catch (error) {
        res.status(500).send({
            errorMessage:"There was an error trying to get the notes",
            errorDetails:error,
        });
    }
    
})

//Get all the categories
app.get('/categories',async(req,res,next)=>{
    try {
        const categories = await Categorie.findAll();
        if(!categories){
            response.status(404).send({message:"categories not found"});
            next();
        }
        res.send(categories);

    } catch (error) {
        res.status(500).send({
            errorMessage:"There was an error trying to get the categories",
            errorDetails:error,
        });
    }
    
})

app.get('/archive',async(req,res,next)=>{
    try {
        const notes = await Note.findAll({where:{archive:true}});
        if(!notes){
            response.status(404).send({message:"notes not found"});
            next();
        }
        res.send(notes);

    } catch (error) {
        res.status(500).send({
            errorMessage:"There was an error trying to get the notes",
            errorDetails:error,
        });
    }
    
})

app.get('/notes/:id',async(req,res)=>{
    try {
        const requestedId=req.params.id;
        const note= await Note.findOne({where:{id:requestedId}});
        res.send(note);

    } catch (error) {
        res.status(500).send({
            errorMessage:"There was an error trying to get the especified note",
            errorDetails:error,
        });
    }
    
})

app.put('/notes/:id',async(req,res)=>{
    try {
        const requestedId=req.params.id;
        const note= await Note.findOne({where:{id:requestedId}});
         note.title=req.body.title;
         note.content=req.body.content;
         note.archive=req.body.archive;
        await note.save();
         res.send('Updated');

    } catch (error) {
        res.status(500).send({
            errorMessage:"There was an error trying to edit the especified note",
            errorDetails:error,
        });
    }
    
})




app.delete('/notes/:id',async(req,res)=>{
    try {
        const requestedId=req.params.id;
        await Note.destroy({where:{id:requestedId}})
        res.send('Removed');
    } catch (error) {
        res.status(500).send({
            errorMessage:"There was an error trying to delete the especified note",
            errorDetails:error,
        });
    }
   
})
 


app.listen(4000,()=>{
    console.log("App is running");
});