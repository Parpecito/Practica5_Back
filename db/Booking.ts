import mongoose from "mongoose"
import { Booking } from "../types.ts";
import { ClientModel } from "./Client.ts";
import { RestauranteModel } from "./Restaurant.ts";

const Schema=mongoose.Schema;

const BookingSchema=new Schema(
    {
        date:{type: Date, default: Date() },
        idClient:{type:Schema.Types.ObjectId,required:true,ref:"Client"},
        idRestaurante:{type:Schema.Types.ObjectId,required:true,ref:"Restaurante"},
    },{
        timestamps:true
    }
)
BookingSchema.path("idClient").validate(async function(idClient:mongoose.Types.ObjectId){
    try {
        if (!mongoose.isValidObjectId(idClient)) return false;
        const cliente = await ClientModel.findById(idClient);
        if (!cliente) return false;
        return true;
    } catch (_error) {
        return false;
    }
})
BookingSchema.path("idRestaurante").validate(async function(idRestaurante:mongoose.Types.ObjectId){
    try {
        if (!mongoose.isValidObjectId(idRestaurante)) return false;
        const restaurante = await RestauranteModel.findById(idRestaurante);
        if (!restaurante) return false;
        return true;
    } catch (_error) {
        return false;
    }
})

export type BookingModelType=mongoose.Document &
    Omit<Booking,"id"|"client"|"restaurant">&{
        idClient:mongoose.Types.ObjectId;
        idRestaurante:mongoose.Types.ObjectId;
    }
export const BookingModel=mongoose.model<BookingModelType>(
    "Booking",
    BookingSchema
);