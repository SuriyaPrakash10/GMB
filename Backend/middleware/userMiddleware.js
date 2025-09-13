// import user from "../Model/User.js";
// import jwt from "jsonwebtoken"

// export const userProtect = async(req,res,next)=> {
//     const auth = req.headers.authorization
//     console.log(auth)
//     const token = auth.split(" ")[1]    
//     const decodeToken = jwt.verify(token, process.env.JWT_SECRET)
//     const person = await user.findById(decodeToken.id).select("-Password")
//     req.user = person
//     next()
// }
