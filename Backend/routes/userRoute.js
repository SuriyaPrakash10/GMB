import express from "express"
import { userProtect } from "../middleware/userMiddleware.js"
import { deleteUser, getUser, updateUser } from "../Controllers/userController.js"

const userRoute = express.Router()

userRoute.get("/getUser",userProtect,getUser)

userRoute.put("/updateUser", userProtect, updateUser)

userRoute.delete("/deleteUser", userProtect,deleteUser)

export default userRoute