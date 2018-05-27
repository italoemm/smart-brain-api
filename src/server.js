const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');


const register = require('./controllers/registerControl.js')
const signin = require('./controllers/signinControl.js')
const getUser = require('./controllers/getUserControl.js')
const image = require('./controllers/imageControl.js')

 const db=knex({
    client: 'pg',
    connection: {
    host : '127.0.0.1',
    user : 'italo',
    password : 'minhasenha',
    database : 'smartBrain'
        }
    });

const app = express();

app.use(bodyParser.json());
app.use(cors()); // it's going grant access to use this server to get and send information

const database = {
    users: [{
                id: '1',
                name: 'italo',
                email: 'italo@hotmail.com',
                password: '123456',
                entries: 0,
                joined: new Date()
            },
            {
                id: '2',
                name: 'agueda',
                email: 'agueda@hotmail.com',
                password: '123456',
                entries: 0,
                joined: new Date()
            } ]
}


app.get('/', (req,res) => res.json(database.users)); //1º

app.get('/profile/:id', (req,res) => getUser.getUserControl(req,res,db)) //2º
  /* const user = database.users.filter((user) => user.id === id) // filter return a array not object
    
    if(user === undefined){
        res.json('user not found');
    }else{
         res.json(user);
    }*/

app.put('/image', (req,res) => image.imageControl(req,res,db)) //3º 
/*    const user = database.users.filter((user) => user.id === id) // referring to the object that match with ID
    
    if(user === undefined){
        res.json('user not found');
    }else{
         user[0].entries++
         res.json(user[0].entries);
    }*/

app.post('/signin', (req,res) => signin.signinControl(req,res,bcrypt,db)); //4º 
 /*   
    if(email === database.users[0].email && password === database.users[0].password){
          res.json(database.users[0])
    }else{
       res.status(400).json('email or password invalid')
    }*/

app.post('/register', (req,res) => register.registerControl(req,res,bcrypt,db)); //5º

app.post('/imageApiCall', (req,res) => image.imageApiCall(req,res))

app.listen(3001,() => console.log('it is running'));


/*
req.params
    This property is an object containing properties mapped to the named route “parameters”. For example, if you have the route /user/:name, then the “name” property is available as req.params.name. This object defaults to {}.
    
req.body
    Contains key-value pairs of data submitted in the request body. By default, it is undefined, and is populated when you use body-parsing middleware such as body-parser and multer.*/



//1º
// show all user
// "get" cause it's going make request through URL



//2º
// search for user
// "get" cause it's going make request and send data through URL



//3º
// how many times the user's image was searched
// "put" beacause it's going be incremented on web site ,other words it is going be altered



//4º
// response with a user if it match with database's user and browser's user
// "post" cause it's going make request and send data through form or json

//5º
// register in database a browser's user
// "post" cause it's going make request and send data through form or json