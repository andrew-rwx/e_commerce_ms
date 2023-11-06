import mongoose from "mongoose";
const item_schema=new mongoose.Schema({
    id_:String,
    categoria:String,
    nome:String,
    immagine:String,
    costo:Number,
    descrizione:String
    
})

const item=mongoose.model("Item",item_schema);
export default item;
