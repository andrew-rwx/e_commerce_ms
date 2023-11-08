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
    const LOGIN_PORT=process.env.LOGIN_PORT;

    app.post("/api/login",async(req,res,next)=>{
        console.log("Sono qui grazie a nginx");
        const {username,password}=req.body;
        console.log({username: username,
                    password: password});
        try{
            const token=await validateUser(username,password); //effettua il controllo delle credenziali
            if(token){
                res.status(200).json({token:token});
            }
            else{
                const not_authenticated="Username o password errati";
                res.status(400).json({message:not_authenticated});
            }
        }
        catch(e){
            next(e);
        }
    
    })

    app.listen(LOGIN_PORT,()=>{
        console.log(`Il microservizio Login è in ascolto sulla porta ${LOGIN_PORT}`);
    })
}

start_Service();