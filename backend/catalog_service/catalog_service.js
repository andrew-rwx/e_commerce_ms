import express from "express";
import "dotenv/config";
import item from "./DB/Item.js";
import getAll_Items from "./helpers/getAll_Items.js";

const app=express();
app.use(express.json());
const CATALOG_PORT=process.env.CATALOG_PORT;

app.post("/showCatalog",async (req,res,next)=>{
    //l'endpoint effettua una richiesta al DB per richiedere tutti gli oggetti del catalogo
    //restituisce la lista di tutti gli oggetti del catalogo.
    try{
        const catalog=await getAll_Items();
        if(catalog){
            res.status(200).json({catalog: catalog})
        }
        else{
            res.status(400).json({message:"Nessun catalogo"})
        }
    }
    catch(e){
        next(e);
    }
}
    
);


app.listen(CATALOG_PORT,()=>{
    console.log(`Il microservizio Catalog è in ascolto sulla porta ${CATALOG_PORT}`);
})
