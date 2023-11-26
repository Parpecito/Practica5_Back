// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import { BookingModelType } from "../db/Booking.ts";
import { Booking } from "../types.ts";
import { BookingModel } from "../db/Booking.ts";
import { getBookingfromModel } from "../controllers/getBookingfromModel.ts";
import { ClientModel } from "../db/Client.ts";
import { RestauranteModel } from "../db/Restaurant.ts";

export const postBooking = async (
  req: Request<unknown, unknown, BookingModelType>,
  res: Response<Booking | { error: unknown }>
) => {
  try {
    const {date,clientID,restaurantID } = req.body;
    
    const booking = new BookingModel({ date,clientID,restaurantID });
    await booking.save();
    await booking.populate("clientID");
    await booking.populate("restaurantID")

    //Al añadir una reservar, en el middleware de guardar, se deberan actualizar las otras dos colecciones
    const guardar_cliente=await ClientModel.findById(clientID);
   // console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    if(guardar_cliente){
        /*const book:Booking={
            id:booking._id,
            date:booking.date,
            restaurantID:booking.restaurantID
        
        }
        */
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
    
    const bookings: Booking = await getBookingfromModel(booking);

    res.status(201).json(bookings).send();
  } catch (error) {
    res.status(500).send(error);
  }
};