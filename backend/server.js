const express = require('express');
const {MongoClient , ObjectID} =require('mongodb');
const assert = require('assert');

const app = express() ;
const port = 5000 ;
const mongo_url = 'mongodb://localhost:27017';
const dataBase = 'contacts';


app.use(express.json());
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['http://localhost:3000']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

MongoClient.connect(mongo_url,  { useUnifiedTopology: true }, (err , client) => {
    assert.equal(err , null ,'connexion to dataBase failed')

    const db = client.db(dataBase)


    app.get('/contacts', (req , res)=>{
        db.collection('contactlist').find().toArray((err ,data) => {
            err ? res.send('cannot fetch data'): res.send(data) 
        })
    });

    app.post('/new_contact' , (req , res)=>{
          db.collection('contactlist').insertOne( req.body  , (err ,data) => {
                err? res.send(err) : res.send(data)
            } )  
    });

    app.delete('/contacts/:id' ,(req , res)=> {
        let contactId = ObjectID(req.params.id) ;
        db.collection('contactlist').findOneAndDelete({_id:contactId} , (err ,data)=>{
            err? res.send(err) : res.send(data) 
        })
    });

    app.put('/edit/:id',(req, res)=>{
        let contactId= ObjectID(req.params.id) ;
        
           db.collection('contactlist').updateOne({_id:contactId}, {$set: req.body} ,(err, data)=>{
            err? res.send(err): res.send(data)
        })    
                 

    })
})

app.listen(port , (err)=> {
    err ? console.log(err) : console.log(`server is running on port: ${port}`)
})