// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import { RestauranteModelType } from "../db/Restaurant.ts";
import { Restaurante } from "../types.ts";
import { RestauranteModel } from "../db/Restaurant.ts";
import { getRestaurantfromModel } from "../controllers/getRestaurantfromModel.ts";

export const postRestaurant = async (
  req: Request<unknown, unknown, RestauranteModelType>,
  res: Response<Restaurante | { error: unknown }>
) => {
  try {
    const { name, CIF, address,bookingsID } = req.body;
    
    const restaurante = new RestauranteModel({ name, CIF, address,bookingsID });
    await restaurante.save();
    await restaurante.populate("bookingsID");
    
    const restaurantes: Restaurante = await getRestaurantfromModel(restaurante);

    res.status(201).json(restaurantes).send();
  } catch (error) {
    res.status(500).send(error);
  }
};