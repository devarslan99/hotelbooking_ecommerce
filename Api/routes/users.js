import  express  from "express";
import { updateUser,deleteUser,getUser,getUsers } from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router=express.Router();

router.get("/checkauthentication",verifyToken,(req,res,next)=>{

    res.send("hello user you r =logged")
})

router.get("/checkuser/:id",verifyUser,(req,res,next)=>{

    res.send("hello user you are logged in and you can delete account")
})

router.get("/checkadmin/:id",verifyAdmin,(req,res,next)=>{

    res.send("hello user you are logged in and you can delete account")
})


//update user

router.put("/:id",verifyUser,updateUser)

////delete the user

router.delete("/:id",verifyUser,deleteUser)

    ///////get a single user
    router.get("/:id",verifyUser,getUser)

////////get all user

router.get("/",verifyAdmin,getUsers)


export default router