import mongoose from 'mongoose';

async function connectToDB(){
    try{
        const connection=await mongoose.connect("mongodb://credenziali:credenziali@mongo_user");
        if(connection){
            console.log("Connected to DB")
            return true;
        }
    }
    catch(e){
        throw e;
    }
    
}

export default connectToDB;