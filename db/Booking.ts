import mongoose from "mongoose"
import { Booking } from "../types.ts";
import { ClientModel } from "./Client.ts";
import { RestauranteModel } from "./Restaurant.ts";

const Schema=mongoose.Schema;

const BookingSchema=new Schema(
    {
        date:{type: Date, default: Date() },
        clientID:{type:Schema.Types.ObjectId,required:true,ref:"Client"},
        restaurantID:{type:Schema.Types.ObjectId,required:true,ref:"Restaurante"},
    },{
        timestamps:true
    }
)
BookingSchema.path("clientID").validate(async function(clientID:mongoose.Types.ObjectId){
    try {
        if (!mongoose.isValidObjectId(clientID)) return false;
        const cliente = await ClientModel.findById(clientID);
        if (!cliente) return false;
        return true;
    } catch (_error) {
        return false;
    }
})
BookingSchema.path("restaurantID").validate(async function(restaurantID:mongoose.Types.ObjectId){
    try {
        if (!mongoose.isValidObjectId(restaurantID)) return false;
        const restaurante = await RestauranteModel.findById(restaurantID);
        if (!restaurante) return false;
        return true;
    } catch (_error) {
        return false;
    }
})
export type BookingModelType = mongoose.Document & Booking;

  
/*
export type BookingModelType=mongoose.Document &
    Omit<Booking,"id">&{
        clientID:mongoose.Types.ObjectId,
        restaurantID:mongoose.Types.ObjectId
    }

*/
export const BookingModel=mongoose.model<BookingModelType>(
    "Booking",
    BookingSchema
);