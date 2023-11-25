import mongoose from "mongoose"
import { Restaurante } from "../types.ts";


const Schema=mongoose.Schema;

const RestauranteSchema=new Schema(
    {
        name:{type: String, required: true },
        CIF:{type: String, required: true },
        address: { type: String, required: true, unique: true },
        bookingsID:[
            {type:Schema.Types.ObjectId,required:true,ref:"Booking"}
        ]
    },{
        timestamps:true
    }
)
RestauranteSchema.path("CIF").validate(function(CIF:string) {
    try {
        const validad_CIF=/[A-Za-z][0-9]{8}/
        if(validad_CIF.test(CIF)){
            return true
        }
    } catch (_error) {
        return false;
    }
})

export type RestauranteModelType=mongoose.Document &
    Omit<Restaurante,"id">&{
        bookingsId:Array<mongoose.Types.ObjectId>
    }
export const RestauranteModel=mongoose.model<RestauranteModelType>(
    "Restaurante",
    RestauranteSchema
);