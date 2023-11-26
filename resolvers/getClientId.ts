// @deno-types="npm:@types/express@4"
import {Request,Response} from "express"
import { Client } from "../types.ts";
import mongoose from "mongoose"
import { ClientModel } from "../db/Client.ts";
import { getClientfromModel } from "../controllers/getClientfromModel.ts";

export const getClientId = async (
    req: Request<{ id: mongoose.Types.ObjectId }>,
    res: Response<Client | { error: unknown }>
  ) => {
    const id = req.params.id;
    try {
      const client = await ClientModel.findById(id).populate("bookingsID")
        if (!client) {
            res.status(404).send({ error: "Client not found" });
            return;
        }
        //Lo que va a pasar es que mongoose cargara automaticamente los datos referenciados(objetos completos) en lugar de solo la id
        
        
        const c=await getClientfromModel(client);
        res.status(200).json(c).send();
        
      
    } catch (error) {
      res.status(500).send(error);
    }
};