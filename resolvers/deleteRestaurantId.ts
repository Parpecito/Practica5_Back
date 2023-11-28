// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import mongoose from "mongoose";
import { RestauranteModel } from "../db/Restaurant.ts";

//actualizar cuando se elimine en las otras colecciones
export const deleteRestaurantID = async (                                                            //Se van a eliminar los restaurantes por su id
  req: Request<{ id: mongoose.Types.ObjectId }, unknown>,
  res: Response<string | { error: unknown }>
) => {
  try {
    const id = req.params.id;                                                                     //Se obtiene el id del booking para utilizar más adelante
  const restaurant = await RestauranteModel.findOneAndDelete({_id:id})                            //Se busca el booking por su id y se elimina
  if (!restaurant) {                                                                             //Si no se ha encontrado ningún booking se devuelve un error
    res.status(404).send({ error: "Restaurant not found" });
    return;
  }
  

  res.status(200).send("Restaurant deleted");                                                   //Se devuelve un mensaje de que se ha eliminado el booking por su id
  } catch (error) {
    res.status(500).send(error);
  }
  

};


  

  /*
  
    const eliminar_clientes=await ClientModel.deleteMany({clienteID:id});
    if(!eliminar_clientes){
        res.status(404).send({error:"clients not found"});
        return;
    }*/
  
