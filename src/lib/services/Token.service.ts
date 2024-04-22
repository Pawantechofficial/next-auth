import  Jwt, { JwtPayload }  from "jsonwebtoken";
const JWT_KEYs:any= process.env.JWT_KEY
const JWT_KEY_RESET:any= process.env.JWT_KEY_RESET

export const GenerateToken = async (user:string) => {
    return await Jwt.sign({ userId: user }, JWT_KEYs, {expiresIn:"1d"});
}

export const VerifyToken = async (token:string) => {
    const verifyData = await Jwt.verify(token, JWT_KEYs) as JwtPayload;
    const userId = verifyData["userId"];
    return userId;
}

//////Reset
export const GenerateTokenReset = async (user:string) => {
    return await Jwt.sign({ userId: user }, JWT_KEY_RESET, {expiresIn:"1h"});
}

export const VerifyTokenReset = async (token:string) => {
    const verifyData = await Jwt.verify(token, JWT_KEY_RESET) as JwtPayload;
    const userId = verifyData["userId"];
    return userId;
}