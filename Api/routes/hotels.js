import  express  from "express";
import {  getHotel, getHotels, createHotel, deleteHotel,  updateHotel, countByCity, countByType, getHotelRooms } from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router=express.Router();


//////create hotel
router.post("/",verifyAdmin,createHotel)

//update hotel

router.put("/:id",verifyAdmin,updateHotel)

////delete the hotel

router.delete("/:id",verifyAdmin,deleteHotel)

    ///////get a single hotel
    router.get("/find/:id",getHotel)

////////get all hotel

router.get("/",getHotels);
router.get("/countByCity",countByCity);
router.get("/countByType",countByType);
router.get("/room/:id", getHotelRooms);




export default router