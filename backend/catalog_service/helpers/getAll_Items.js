//import mongoose?//
import item from "../DB/Item.js";

async function getAll_Items(){
    try{
        const catalog=await item.find({});
        return catalog;
    }
    catch(e){
        throw e;
    }
 
}

export default getAll_Items;