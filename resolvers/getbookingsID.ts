// @deno-types="npm:@types/express@4"
import {Request,Response} from "express"
import mongoose from "mongoose"
import { Booking } from "../types.ts";
import { BookingModel } from "../db/Booking.ts";
import { getBookingfromModel } from "../controllers/getBookingfromModel.ts";

export const getBookingId = async (                                                         //Se obtiene una reserva por su id
    req: Request<{id:mongoose.Types.ObjectId}>,
    res:Response<Booking|{error:unknown}>  
  ) => {
    const id = req.params.id;                                                                //Se obtiene el id de la reserva para utilizar más adelante
    try {
        const booking=await BookingModel.findOne({_id:id});                                  //Se busca la reserva por su id y se va a utilizar el findOne ya que findById no funciona con middleware
        
        if(!booking){                                                                        //Si no se ha encontrado ninguna reserva se devuelve un error
            res.status(404).send({error:"Booking not found"});
            return;
        }
    
        const book=await getBookingfromModel(booking);                                        //Se obtiene la reserva con el método getBookingfromModel que hemos creado como controlador
        
        res.status(200).json(book).send();                                                  //Se devuelve la reserva
    } catch (error) {
        res.status(500).send(error);
    }
    
};
