// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import mongoose from "mongoose";
import { Client } from "../types.ts";
import { ClientModel } from "../db/Client.ts";
import { getClientfromModel } from "../controllers/getClientfromModel.ts";



export const getClientId = async (
  req: Request<{ id: mongoose.Types.ObjectId }>,
  res: Response<Client | { error: unknown }>
) => {
  const id = req.params.id;
  try {
    const client = await ClientModel.findOne({_id:id});
    if (!client) {
      res.status(404).send({ error: "Client not found" });
      return;
    }

    const clients: Client = await getClientfromModel(client);

    res.status(200).json(clients).send();
  } catch (error) {
    res.status(500).send(error);
  }
};
