import { BookingModel } from "../db/Booking.ts";
import { ClientModelType } from "../db/Client.ts";
import { Client } from "../types.ts";

export const getClientfromModel = async (
  client: ClientModelType,
): Promise<Client> => {
  const {_id,firstname,lastname,email,phoneNumber,DNI}=client;                                  //Se extraen los datos de client
  const booking =await BookingModel.find({clientID:_id});                                       //Se busca la reserva con el id de clientID

  if(!booking){                                                                                 //Si no se encuentra la reserva se lanza un error
     throw new Error("Book not found")
  }
  const bookingsID=booking.map((booking)=>{                                                     //Se crea un array con las reservas y vamos extrayendo los datos que queremos
    return{
        date:booking.date,
        restaurantID:booking.restaurantID,
        id:booking._id.toString()
        
    }
  });
    const cliente:Client={                                                                     //Se crea el objeto cliente con los datos extraidos para asi luego devolverlo y que se muestre en el navegador
        id: _id.toString(),
        firstname: firstname,
        lastname: lastname,
        email: email,
        phoneNumber: phoneNumber,
        DNI: DNI,
        bookingsID: bookingsID
    };
    return cliente;                                                                            //Se devuelve el objeto cliente
};

