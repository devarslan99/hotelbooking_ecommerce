import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js"

export const createHotel=async(req,res,next) =>{

    const newHotel=new Hotel(req.body);
    try {
        
        const hotel=await newHotel.save();

        res.status(200).send(hotel);
    
    } catch (err) {
        
        next(err)
    }

}





export const updateHotel=async(req,res,next) =>{

    try {
    
        const updatehotel=await Hotel.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
    
        res.status(200).send(updatehotel);
        
    } catch (err) {
        
        next(err)
    }
}



export const deleteHotel=async(req,res,next) =>{

   
    try {
        
        const deletehotel=await Hotel.findByIdAndDelete(req.params.id)
    
        res.status(200).json("hotel has been deleted");
        
    } catch (err) {
        
        next(err)
    }

}







export const getHotel=async(req,res,next) =>{

    try {
            
        const hotel=await Hotel.findById(req.params.id)
    
        res.status(200).send(hotel);
        
    } catch (err) {
        
        next(err)
    }

}




export const getHotels = async (req, res, next) => {
    const { min, max,limit,...others } = req.query;
    console.log(min)
    try {
        const hotels = await Hotel.find({
            ...others,
            cheapestPrice: { $gt: min | 1, $lt: max || 999 },
          }).limit(req.query.limit);
      res.status(200).json(hotels);
    } catch (err) {
      next(err);
    }
  };


export const countByCity=async(req,res,next) =>{

    try {
            const cities=req.query.cities.split(",")
        const list=await Promise.all(cities.map(city=>{

            return Hotel.countDocuments({city:city})
        }))
    
        res.status(200).send(list);
        
    } catch (err) {
        
        next(err)
    }

}


export const countByType=async(req,res,next) =>{

    try {
            const hotelCount=await Hotel.countDocuments({type:"hotel"});
            const apartmentCount=await Hotel.countDocuments({type:"apartment"});
            const resortCount=await Hotel.countDocuments({type:"resort"});
            const villaCount=await Hotel.countDocuments({type:"villa"});
            const cabinCount=await Hotel.countDocuments({type:"cabin"});
        

            res.send([
            
                 {type:"hotel",count:hotelCount},
                 {type:"apartments",count:apartmentCount},
                 {type:"resorts",count:resortCount},
                 {type:"villas",count:hotelCount},
                 {type:"cabins",count:hotelCount}

            ])
    } catch (err) {
        
        next(err)
    }

}


export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list)
  } catch (err) {
    next(err);
  }
};