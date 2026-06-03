const mysql = require('mysql2');
const express = require('express');
const app = express();
PORT = 5000;
const cors = require("cors");

app.use(cors());

app.use(express.json());


const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    database:"login_game",
    password:"198114",
});




app.post("/login",(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    
    const query = `
    select email,password
    from user
    where email= ? AND password = ?;
    `
    connection.query(query,[email,password],(err,result)=>{
        if(err){
             console.log(err);
             return;
            };
            console.log("mysql connected...");
            
            
            if(result.length>0){
                return res.json({
                    success:true,
                    message:"Login Successful"
                });
            }
            res.status(401).json({
                success:false,
                message:"Invalid Email or Password"
           }); 
    });
    

});


app.listen(PORT,()=>{
    console.log(`Running on localhost/${PORT}`);
})