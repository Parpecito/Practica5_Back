// @deno-types="npm:@types/express@4"
import {Request,Response} from "express"
import mongoose from "mongoose"
import { Booking } from "../types.ts";
import { BookingModel } from "../db/Booking.ts";
import { getBookingfromModel } from "../controllers/getBookingfromModel.ts";

export const getBookingId = async (
    req: Request<{id:mongoose.Types.ObjectId}>,
    res:Response<Booking|{error:unknown}>  
  ) => {
    const id = req.params.id;
    try {
        const booking=await BookingModel.findOne({_id:id});
        if(!booking){
            res.status(404).send({error:"Booking not found"});
            return;
        }
    
        const book=await getBookingfromModel(booking);
        res.status(200).json(book).send();
    } catch (error) {
        res.status(500).send(error);
    }
    
};
