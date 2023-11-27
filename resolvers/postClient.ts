// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import { ClientModelType } from "../db/Client.ts";
import { ClientModel } from "../db/Client.ts";
import { Client } from "../types.ts";
import { getClientfromModel } from "../controllers/getClientfromModel.ts";
import { BookingModel } from "../db/Booking.ts";

export const postClient = async (
  req: Request<unknown, unknown, ClientModelType>,
  res: Response<Client | { error: unknown }>
) => {
  try {
    const {firstname,lastname,email,phoneNumber,DNI,bookingsID}=req.body
    
    const cliente = new ClientModel({ firstname,lastname,email,phoneNumber,DNI });
    await cliente.save();
    const reservas=bookingsID.map((booking)=>{
      const {date,restaurantID}=booking;
      const b=new BookingModel({date,restaurantID,clientID:cliente._id});
      b.save();
  });

  await Promise.all(reservas);//Se va a esperar a que se guarden todas las reservas
  const clientes: Client = await getClientfromModel(cliente);

    res.status(201).json(clientes).send();
  } catch (error) {
    res.status(500).send(error);
  }
};