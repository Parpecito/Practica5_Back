// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import { RestauranteModelType } from "../db/Restaurant.ts";
import { Restaurante } from "../types.ts";
import { RestauranteModel } from "../db/Restaurant.ts";
import { getRestaurantfromModel } from "../controllers/getRestaurantfromModel.ts";
import { BookingModel } from "../db/Booking.ts";

export const postRestaurant = async (                                                             //Se va a crear un restaurante
  req: Request<unknown, unknown, RestauranteModelType>,
  res: Response<Restaurante | { error: unknown }>
) => {
  try {
    const { name, CIF, address,bookingsID } = req.body;                                         //Se obtienen los datos del restaurante que se van a pasar por el body
    
    const restaurante = new RestauranteModel({ name, CIF, address });                        //Se crea el restaurante con los datos que le pasaremos en el body
    await restaurante.save();                                                              //Se guarda el restaurante
    
    const reservas=bookingsID?.map((booking)=>{                                            //Se crea un array con las reservas y vamos a ir guardando los datos de reserva que queremos
        const {date,clientID}=booking;
        const b=new BookingModel({date,clientID,restaurantID:restaurante._id});
        b.save();
    });

    await Promise.all(reservas);                                                              //Se va a esperar a que se guarden todas las reservas
    

    const restaurantes: Restaurante = await getRestaurantfromModel(restaurante);            //Se obtiene el restaurante con el método getRestaurantfromModel que hemos creado como controlador

    res.status(201).json(restaurantes).send();                                            //Se devuelve el restaurante
  } catch (error) {
    res.status(500).send(error);
  }
};