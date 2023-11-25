import { BookingModelType } from "../db/Booking.ts";
import { Booking } from "../types.ts";
import { ClientModel } from "../db/Client.ts";
import { RestauranteModel } from "../db/Restaurant.ts";

export const getBookingfromModel = async (
  booking: BookingModelType,
): Promise<Booking> => {

  const {_id,date,clientID,restaurantID}=booking;
  const client = await ClientModel.findById(clientID)
  if(!client) {
    throw new Error("Client not found")
  }

  const restaurant = await RestauranteModel.findById(restaurantID)
  if(!restaurant){
     throw new Error("Restaurant not found")
  }

  const book:Booking={
    id: _id.toString(),
    date: date,
    clientID: client?._id,
    nombre_cliente: client?.firstname,
    restaurantID: restaurant?._id,
    nombre_restaurante: restaurant?.name,
  };
  return book;
};