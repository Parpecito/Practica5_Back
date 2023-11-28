// @deno-types="npm:@types/express@4"
import {Request,Response} from "express"
import mongoose from "mongoose"
import { Restaurante } from "../types.ts";
import { RestauranteModel } from "../db/Restaurant.ts";
import { getRestaurantfromModel } from "../controllers/getRestaurantfromModel.ts";

export const getRestauranteId = async (                                                             //Se van a devolver los restaurantes por su id
    req: Request<{ id: mongoose.Types.ObjectId }>,
    res: Response<Restaurante | { error: unknown }>
  ) => {
    const id = req.params.id;                                                               //Se obtiene el id del restaurante para utilizar más adelante
    try {
      const restaurant = await RestauranteModel.findOne({_id:id});                        //Se busca el cliente por su id y se va a utilizar el findOne ya que findById no funciona con middleware
        if (!restaurant) {                                                                 //Si no se ha encontrado ningún cliente se devuelve un error
            res.status(404).send({ error: "Client not found" });
            return;
        }
        
        const restaurantes=await getRestaurantfromModel(restaurant);                     //Se obtiene el cliente con el método getRestaurantfromModel que hemos creado como controlador
        res.status(200).json(restaurantes).send();                                     //Se devuelve el cliente
        
      
    } catch (error) {
      res.status(500).send(error);
    }
};