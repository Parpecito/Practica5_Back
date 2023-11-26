// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import mongoose from "mongoose";
import { RestauranteModel } from "../db/Restaurant.ts";
import { BookingModel } from "../db/Booking.ts";
import { ClientModel } from "../db/Client.ts";
//elimina todos los restaurantes
/*export const deleteAllRestauran = async (
 
    
};*/