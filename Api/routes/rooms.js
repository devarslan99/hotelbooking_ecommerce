import  express  from "express";
import { verifyAdmin } from "../utils/verifyToken.js";
import { createRoom, deleteRoom, getRoom, getRooms, updateRoom, updateRoomAvailability } from "../controllers/room.js";

const router=express.Router();

//////create Room
router.post("/:hotelid",verifyAdmin,createRoom)

//update Room

router.put("/:id",verifyAdmin,updateRoom)
router.put("/availability/:id",updateRoomAvailability)

////delete the Room

router.delete("/:id/:hotelid",verifyAdmin,deleteRoom)

    ///////get a single Room
    router.get("/:id",getRoom)

////////get all Room

router.get("/",getRooms)

export default router