import express from 'express'
import { verifyAdmin } from '../utils/verifyToken.js'
import { createRoom, deleteRoom, getRoom, getRooms, updateRoom } from '../controllers/roomController.js'

const router= express.Router()

//* create
router.post("/:hotelid", verifyAdmin, createRoom)
//*update
router.put("/:id", verifyAdmin, updateRoom);
//*delete
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);
//*get room and rooms
router.get("/:id", getRoom);
router.get("/", getRooms);

router.get("/", (req,res)=>{
    res.send("hello rooms")
})

export default router