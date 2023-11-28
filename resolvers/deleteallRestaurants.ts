// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";


import { RestauranteModel } from "../db/Restaurant.ts";


//actualizar cuando se elimine en las otras colecciones
export const deleteallRestaurant = async (                                                              //Se van a eliminar todos los restaurantes
  _req: Request,
  res: Response<string | { error: unknown }>
) => {
  try {
    const restaurant = await RestauranteModel.deleteMany({})                                            //Se eliminan todos los restaurantes de la base de datos utilizando el método deleteMany
    if (!restaurant) {                                                                                 //Si no se ha encontrado ningún restaurante se devuelve un error
        res.status(404).send({ error: "Restaurant not found" });
        return;
    }
    
    res.status(200).send("All restaurants deleted");                                                  //Se devuelve un mensaje de que se han eliminado todos los restaurantes
  } catch (error) {
    res.status(500).send(error);
  }

};
