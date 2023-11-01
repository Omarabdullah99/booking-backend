import Hotel from '../models/hotelModel.js'
import { createError } from "../utils/error.js"

export const createHotel= async(req,res)=>{
    const newHotel= new Hotel(req.body)
    try {
        const savedHotel= await newHotel.save()
        res.status(200).json(savedHotel)
    } catch (error) {
        res.status(500).json(error)
        
    }
}

export const updateHotel= async(req,res)=>{
    try {
        const updateHotel= await Hotel.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new:true}
        )
        res.status(200).json(updateHotel)
        
    } catch (error) {
        res.status(500).json(error)
    }
}

export const deleteHotel= async(req,res)=>{
    try {
        const deleteHotel= await Hotel.findByIdAndDelete(
            req.params.id,
        )
        res.status(200).json("Hotel has benn deleted")
        
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getHotelById= async(req,res)=>{
    try {
        const getHotelById= await Hotel.findById(
            req.params.id,
        )
        res.status(200).json(getHotelById)
        
    } catch (error) {
        res.status(500).json(error)
    }
}

export const geAlltHotel= async(req,res,next)=>{
    try {
        const getAllHotel= await Hotel.find()
        res.status(200).json(getAllHotel)
        
    } catch (err) {
        next(err)
    }
}

export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",");
    try {
      const list = await Promise.all(
        cities.map((city) => {
          return Hotel.countDocuments({ city: city });
        })
      );
      res.status(200).json(list);
    } catch (err) {
      next(err);
    }
  };