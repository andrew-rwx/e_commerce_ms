import express from "express";
import "dotenv/config";

const app=express();
const CART_PORT=process.env.CART_PORT;


app.post("api/cart/addToCart",async (req,res,next)=>{
    //l'endpoint push un prodotto nella proprietà cart dell'oggetto Utente nel DB
    //restituisce una conferma dell'operazione
})

app.listen(CART_PORT,()=>{
    console.log(`Il microservizio Cart è in ascolto  sulla porta ${CART_PORT}`);
})
