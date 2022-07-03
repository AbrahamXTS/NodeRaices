import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export function generateJWT(payload) {
    
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1d"
    });

    return token;
}

export function validateJWT(token) {
    
    return jwt.verify(token, process.env.JWT_SECRET)
}