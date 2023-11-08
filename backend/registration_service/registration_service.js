import express from "express";
import "dotenv/config";
import validateUser from "./helpers/validateUser.js";
import connectToDB from "./DB/connectToDB.js";

async function start_Service(){
    try{
        await connectToDB();
    }
    catch(e){
        next(e);
    }

    const app=express();
    app.use(express.json())
    const REGISTRATION_PORT=process.env.REGISTRATION_PORT;

    app.post("/api/login",async(req,res,next)=>{
        console.log("Sono qui grazie a nginx");
        const {username,email,password}=req.body;
        console.log({username: username,
                     email: email,
                     password: password});
        try{
            //crittare la psw con bcrypt controllare la disponibilità di mail,username
            //fare test di conformità
            //salvare sul DB
        }
        catch(e){
            next(e);
        }
    
    })

    app.listen(LOGIN_PORT,()=>{
        console.log(`Il microservizio Login è in ascolto sulla porta ${REGISTRATION_PORT}`);
    })
}

start_Service();