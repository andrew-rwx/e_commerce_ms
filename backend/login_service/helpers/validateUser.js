import bcrypt from "bcrypt";
import user from "../DB/User.js";
import createToken from "./createToken.js";

async function validateUser(username,password){
    //User.find()
    try{
        const user_found=await user.find({username:username});
        if(user_found){
            //check password with bctypt
            const psw_matching=await bcrypt.compare(password,user_found.password)
            //if psw compare successfull
            if(psw_matching){ //psw_matchin contiene il salt 
                const token=createToken();
                return token
            }   
            else{
                return false; //password errata
            }    
        }
        else{
            return false; //nome utente errato 
        }
    }
    catch(e){
        throw e;
    }
}

export default validateUser;