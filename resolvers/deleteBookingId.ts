// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import mongoose from "mongoose";
import { BookingModel } from "../db/Booking.ts";
//actualizar cuando se elimine en las otras colecciones
export const deleteBookingID = async (
  req: Request<{ id: mongoose.Types.ObjectId }, unknown>,
  res: Response<string | { error: unknown }>
) => {
  const id = req.params.id;
  const booking = await BookingModel.findOneAndDelete({_id:id})
  if (!booking) {
    res.status(404).send({ error: "Booking not found" });
    return;
  }
  

  res.status(200).send("Booking deleted");

};
