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
    const { min, max,limit, ...others } = req.query;
    console.log("Query Criteria:", { ...others });
    console.log("Price Range:", Number(min), Number(max));
    try {
      const hotels = await Hotel.find({
        ...others,
        cheapestPrice: {
            $gt: Number(min) || 1,
            $lt: Number(max) || 999, 
          }
        
      }).limit(Number(limit))
      
    console.log("Query Results:", hotels);
      res.status(200).json(hotels);
    } catch (err) {
      next(err);
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

  export const countByType = async (req, res, next) => {
    try {
      const hotelCount = await Hotel.countDocuments({ type: "Hotels" });
      const apartmentCount = await Hotel.countDocuments({ type: "Apartments" });
      const resortCount = await Hotel.countDocuments({ type: "Resorts" });
      const villaCount = await Hotel.countDocuments({ type: "Villas" });
  
      res.status(200).json([
        { type: "hotel", count: hotelCount },
        { type: "apartments", count: apartmentCount },
        { type: "resorts", count: resortCount },
        { type: "villas", count: villaCount },
      ]);
    } catch (err) {
      next(err);
    }
  };