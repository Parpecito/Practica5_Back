// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import mongoose from "mongoose";
import { RestauranteModel } from "../db/Restaurant.ts";
import { BookingModel } from "../db/Booking.ts";
//import { ClientModel } from "../db/Client.ts";
//actualizar cuando se elimine en las otras colecciones
export const deleteRestaurantID = async (
  req: Request<{ id: mongoose.Types.ObjectId }, unknown>,
  res: Response<string | { error: unknown }>
) => {
  const id = req.params.id;
  const restaurant = await RestauranteModel.findByIdAndDelete(id).exec();
  if (!restaurant) {
    res.status(404).send({ error: "restaurant not found" });
    return;
  }
  const eliminar_reservas=await BookingModel.deleteMany({restaurantID:id}).exec();
  if(!eliminar_reservas){
    res.status(404).send({error:"bookings not found"});
    return;
  }


  res.status(200).send("restaurant deleted");




  

  /*
  
    const eliminar_clientes=await ClientModel.deleteMany({clienteID:id}).exec();
    if(!eliminar_clientes){
        res.status(404).send({error:"clients not found"});
        return;
    }*/
  
};