// @deno-types="npm:@types/express@4"
import {Request,Response} from "express"
import mongoose from "mongoose"
import { Restaurante } from "../types.ts";
import { RestauranteModel } from "../db/Restaurant.ts";
import { getRestaurantfromModel } from "../controllers/getRestaurantfromModel.ts";

export const getRestauranteId = async (
    req: Request<{ id: mongoose.Types.ObjectId }>,
    res: Response<Restaurante | { error: unknown }>
  ) => {
    const id = req.params.id;
    try {
      const restaurant = await RestauranteModel.findOne({_id:id});
        if (!restaurant) {
            res.status(404).send({ error: "Client not found" });
            return;
        }
        
        const restaurantes=await getRestaurantfromModel(restaurant);
        res.status(200).json(restaurantes).send();
        
      
    } catch (error) {
      res.status(500).send(error);
    }
};