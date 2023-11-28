import { RestauranteModelType } from "../db/Restaurant.ts";
import { Restaurante } from "../types.ts";  
import { BookingModel } from "../db/Booking.ts";

export const getRestaurantfromModel = async (
  restaurant: RestauranteModelType,
): Promise<Restaurante> => { 
  const {_id,name,CIF,address}=restaurant;                                                        //Se extraen los datos del restaurante
  const booking =await BookingModel.find({restaurantID:_id})                                     //Se busca la reserva con el id de restaurantID

  if(!booking){                                                                                  //Si no se encuentra la reserva se lanza un error
      throw new Error("Book not found")
  } 
  const bookingsID=booking.map((booking)=>{                                                      //Se crea un array con las reservas y vamos extrayendo los datos que queremos
    return{
        date:booking.date,
        clientID:booking.clientID,
        id:booking._id.toString()
        
    }
  });
    const restaurante:Restaurante={                                                            //Se crea el objeto restaurante con los datos extraidos para asi luego devolverlo y que se muestre en el navegador
        id: _id.toString(),
        name: name,
        CIF: CIF,
        address: address,
        bookingsID: bookingsID,
    };
    return restaurante;                                                                        //Se devuelve el objeto restaurante
};

