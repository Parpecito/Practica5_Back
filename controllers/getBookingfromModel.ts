import { BookingModelType } from "../db/Booking.ts";
import { Booking } from "../types.ts";
import { ClientModel } from "../db/Client.ts";
import { RestauranteModel } from "../db/Restaurant.ts";

export const getBookingfromModel = async (
  booking: BookingModelType,
): Promise<Booking> => {

  const {_id,date,clientID,restaurantID}=booking;                                             //Se extraen los datos de booking
  const client = await ClientModel.findById(clientID)                                        //Se busca el cliente con el id de clientID
  if(!client) {                                                                            //Si no se encuentra el cliente se lanza un error
    throw new Error("Client not found")
  }

  const restaurant = await RestauranteModel.findById(restaurantID)                         //Se busca el restaurante con el id de restaurantID
  if(!restaurant){                                                                       //Si no se encuentra el restaurante se lanza un error
     throw new Error("Restaurant not found")
  }

  const book:Booking={                                                                  //Se crea el objeto book con los datos extraidos para asi luego devolverlo y que se muestre en el navegador
    id: _id.toString(),
    date: date,
    clientID: client?._id,
    nombre_cliente: client?.firstname,
    restaurantID: restaurant?._id,
    nombre_restaurante: restaurant?.name,
  };
  return book;                                                                        //Se devuelve el objeto book
};