// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import { ClientModelType } from "../db/Client.ts";
import { ClientModel } from "../db/Client.ts";
import { Client } from "../types.ts";
import { getClientfromModel } from "../controllers/getClientfromModel.ts";
import { BookingModel } from "../db/Booking.ts";

export const postClient = async (                                                           //Se va a crear un cliente
  req: Request<unknown, unknown, ClientModelType>,
  res: Response<Client | { error: unknown }>
) => {
  try {
    const {firstname,lastname,email,phoneNumber,DNI,bookingsID}=req.body                     //Se obtienen los datos del cliente que se van a pasar por el body
    
    const cliente = new ClientModel({ firstname,lastname,email,phoneNumber,DNI });         //Se crea el cliente con los datos que le pasaremos en el body
    await cliente.save();                                                                //Se guarda el cliente
    const reservas=bookingsID?.map((booking)=>{                                          //Se crea un array con las reservas y vamos a ir guardando los datos de reserva que queremos
      const {date,restaurantID}=booking;
      const b=new BookingModel({date,restaurantID,clientID:cliente._id});
      b.save();
  });

  await Promise.all(reservas);                                                          //Se va a esperar a que se guarden todas las reservas
  const clientes: Client = await getClientfromModel(cliente);                         //Se obtiene el cliente con el método getClientfromModel que hemos creado como controlador

    res.status(201).json(clientes).send();                                           //Se devuelve el cliente
  } catch (error) {
    res.status(500).send(error);
  }
};