import mongoose from 'mongoose';

async function connectToDB(){
    try{
        const connection=await mongoose.connect("URI");
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