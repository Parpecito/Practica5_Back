import { BookingModel } from "../db/Booking.ts";
import { ClientModelType } from "../db/Client.ts";
import { Client } from "../types.ts";

export const getClientfromModel = async (
  client: ClientModelType,
): Promise<Client> => {
  const {_id,firstname,lastname,email,phoneNumber,DNI}=client;
  const booking =await BookingModel.find({clientID:_id});

  if(!booking){
     throw new Error("Book not found")
  }
  const bookingsID=booking.map((booking)=>{
    return{
        date:booking.date,
        restaurantID:booking.restaurantID,
        id:booking._id
        
    }
  });
    const cliente:Client={
        id: _id.toString(),
        firstname: firstname,
        lastname: lastname,
        email: email,
        phoneNumber: phoneNumber,
        DNI: DNI,
        bookingsID: bookingsID,
    };
    return cliente;
};





/*const clientResponse: Client = {
    id: client._id,
    firstname: client.firstname,
    lastname: client.lastname,
    email: client.email,
    phoneNumber: client.phoneNumber,
    DNI: client.DNI,
    bookingsID: client.bookingsID,
  };
  return clientResponse;*/