const express = require('express');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const helmet = require('helmet');

const app = express();

app.use(express.json());
app.use(helmet());

let users=[];

app.post('/signup',async(req,res)=>{

const {email,password}=req.body;

if(!validator.isEmail(email)){
return res.send("Invalid email");
}

const hashedPassword=
await bcrypt.hash(password,10);

users.push({
email:email,
password:hashedPassword
});

res.send("User created");

});

app.post('/login',async(req,res)=>{

const {email,password}=req.body;

const user=users.find(u=>u.email===email);

if(!user){
return res.send("User not found");
}

const match=
await bcrypt.compare(password,user.password);

if(!match){
return res.send("Wrong password");
}

const token=
jwt.sign({email:user.email},"secret");

res.send(token);

});

app.listen(3000,()=>{

console.log("Secure app running");

});
