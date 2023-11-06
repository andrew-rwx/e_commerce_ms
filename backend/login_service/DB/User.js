import mongoose, { Schema } from "mongoose";

const user_schema=new Schema(
    {
        username:String,
        password:String,
        cart:[Object]
    }    
);
    
    

const user=mongoose.model("User",user_schema);
export default user;