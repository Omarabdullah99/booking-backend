import express from "express";
import { verifyAdmin } from '../utils/verifyToken.js'
import { countByCity, countByType, createHotel, deleteHotel, geAlltHotel, getHotelById, updateHotel } from "../controllers/hotelController.js";


const router = express.Router()



//CREATE
router.post("/", verifyAdmin, createHotel);

//UPDATE
router.put("/:id", verifyAdmin, updateHotel);
//DELETE
router.delete("/:id", verifyAdmin, deleteHotel);
//GET

router.get("/find/:id", getHotelById);
//GET ALL Hotels
router.get("/", geAlltHotel);

router.get("/countByCity",countByCity)
router.get("/countByType",countByType)


export default router;