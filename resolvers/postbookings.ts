// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import { BookingModelType } from "../db/Booking.ts";
import { Booking } from "../types.ts";
import { BookingModel } from "../db/Booking.ts";
import { getBookingfromModel } from "../controllers/getBookingfromModel.ts";

export const postBooking = async (                                                            //Se va a crear una reserva
  req: Request<unknown, unknown, BookingModelType>,
  res: Response<Booking | { error: unknown }>
) => {
  try {
    const {date,clientID,restaurantID } = req.body;                                          //Se obtienen los datos de la reserva
    
    const booking = new BookingModel({ date,clientID,restaurantID });                       //Se crea la reserva con los datos que le pasaremos en el body
    await booking.save();                                                                  //Se guarda la reserva 
    
    const bookings: Booking = await getBookingfromModel(booking);                         //Se obtiene la reserva con el método getBookingfromModel que hemos creado como controlador

    res.status(201).json(bookings).send();                                              //Se devuelve la reserva
  } catch (error) {
    res.status(500).send(error);
  }
};
    
    /*


    const guardar_cliente=await ClientModel.findById(clientID);


   // console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    if(guardar_cliente){
        /*const book:Booking={
            id:booking._id,
            date:booking.date,
            restaurantID:booking.restaurantID
        
        }
        
       // console.log("aaaaaaaaaaaaaaaaaaaaaaabkfkkdkdlld")
        guardar_cliente?.bookingsID.push(booking._id);
       // console.log("aaaaaaaaaaakkksmfksnmfkmsikfniabkfkkdkdlld")
        await guardar_cliente?.save();
    }
    //console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb")
    const guardar_restaurante=await RestauranteModel.findById(restaurantID);
    if(guardar_restaurante){
        guardar_restaurante?.bookingsID.push(booking._id);
        await guardar_restaurante?.save();
    }

    //console.log("ccccccccccccccccccccccc")
    */
    
   