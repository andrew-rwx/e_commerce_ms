import jwt from "jsonwebtoken";
import "dotenv/config";
    function createToken(payload){
    const TOKEN_KEY=process.env.TOKEN_KEY;
    const token=jwt.sign(payload, TOKEN_KEY,{
        expiresIn: "3h"
    })
    return token;
}

export default createToken;