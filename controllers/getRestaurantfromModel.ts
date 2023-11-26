import { RestauranteModelType } from "../db/Restaurant.ts";
import { Restaurante } from "../types.ts";  
import { BookingModel } from "../db/Booking.ts";

export const getRestaurantfromModel = async (
  restaurant: RestauranteModelType,
): Promise<Restaurante> => { 
  const {_id,name,CIF,address}=restaurant;
  const booking =await BookingModel.find({restaurantID:_id})

  if(!booking){
      throw new Error("Book not found")
  } 
  const bookingsID=booking.map((booking)=>{
    return{
        date:booking.date,
        clientID:booking.clientID,
        id:booking._id
        
    }
  });
    const restaurante:Restaurante={
        id: _id.toString(),
        name: name,
        CIF: CIF,
        address: address,
        bookingsID: bookingsID,
    };
    return restaurante;
};

