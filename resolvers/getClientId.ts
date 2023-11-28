// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import mongoose from "mongoose";
import { Client } from "../types.ts";
import { ClientModel } from "../db/Client.ts";
import { getClientfromModel } from "../controllers/getClientfromModel.ts";



export const getClientId = async (                                                          //Se obtiene un cliente por su id
  req: Request<{ id: mongoose.Types.ObjectId }>,
  res: Response<Client | { error: unknown }>
) => {
  const id = req.params.id;                                                                 //Se obtiene el id del cliente para utilizar más adelante
  try {
    const client = await ClientModel.findOne({_id:id});                                     //Se busca el cliente por su id y se va a utilizar el findOne ya que findById no funciona con middleware
    if (!client) {                                                                         //Si no se ha encontrado ningún cliente se devuelve un error
      res.status(404).send({ error: "Client not found" });
      return;
    }

    const clients: Client = await getClientfromModel(client);                             //Se obtiene el cliente con el método getClientfromModel que hemos creado como controlador

    res.status(200).json(clients).send();                                                //Se devuelve el cliente
  } catch (error) {
    res.status(500).send(error);
  }
};
