// @deno-types="npm:@types/express@4"
import {Request,Response} from "express"
import { Client } from "../types.ts";
import mongoose from "mongoose"
import { ClientModel } from "../db/Client.ts";

export const getSubject = async (
    req: Request<{ id: mongoose.Types.ObjectId }>,
    res: Response<Client | { error: unknown }>
  ) => {
    const id = req.params.id;
    try {
      const client = await ClientModel.findById(id).exec();
      client?.populate("bookingsID");
      if (!client) {
        res.status(404).send({ error: "Subject not found" });
        return;
      }
      //const subjectResponse = await getSubjectFromModel(subject);
      //res.status(200).json(subjectResponse).send();
    } catch (error) {
      res.status(500).send(error);
    }
  };