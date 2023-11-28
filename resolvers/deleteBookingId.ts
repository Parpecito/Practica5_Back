// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import mongoose from "mongoose";
import { BookingModel } from "../db/Booking.ts";

//actualizar cuando se elimine en las otras colecciones

export const deleteBookingID = async (                                                             //Se van a eliminar los bookings por su id
  req: Request<{ id: mongoose.Types.ObjectId }, unknown>,
  res: Response<string | { error: unknown }>
) => {
  try {
    const id = req.params.id;                                                                      //Se obtiene el id del booking para utilizar más adelante
  const booking = await BookingModel.findOneAndDelete({_id:id})                                    //Se busca el booking por su id y se elimina
  if (!booking) {                                                                                 //Si no se ha encontrado ningún booking se devuelve un error
    res.status(404).send({ error: "Booking not found" });
    return;
  }
  

  res.status(200).send("Booking deleted");                                                       //Se devuelve un mensaje de que se ha eliminado el booking por su id
  } catch (error) {
    res.status(500).send(error);
  }
  

};
