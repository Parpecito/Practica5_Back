import mongoose from "mongoose"
import { Booking } from "../types.ts";
import { ClientModel } from "./Client.ts";
import { RestauranteModel } from "./Restaurant.ts";
import { getBookingfromModel } from "../controllers/getBookingfromModel.ts";
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
BookingSchema.pre("findOne", function (next) {
    this.populate("clientID");
    this.populate("restaurantID");
    next();
});
BookingSchema.post("findOne", async function (doc, next) {
    if(doc){
        await getBookingfromModel(doc);
    }
    next();
});
/*
    De aqui he sacado la explicación del operador $pull ya que queremos eliminar el id de la reserva de los arrays de ids de los clientes y restaurantes
    https://www.mongodb.com/docs/manual/reference/operator/update/pull/
*/
BookingSchema.post("findOneAndDelete", async function (doc,next) {
    try {
        await ClientModel.updateMany({bookingsID:doc.id},{$pull:{bookingsID:doc.id}})
        await RestauranteModel.updateMany({bookingsID:doc.id},{$pull:{bookingsID:doc.id}})
    } catch (error) {
        console.log(error)
    }
    next();
})

BookingSchema.pre("save",function(next){
    this.populate("clientID");
    this.populate("restaurantID");
    next()
});
BookingSchema.post("save",async function(doc,next) {
    try {   
        const guardar_cliente=await ClientModel.findById(doc.clientID);
         if(guardar_cliente){
             guardar_cliente?.bookingsID.push(doc.id);
             await guardar_cliente?.save();
         }
         const guardar_restaurante=await RestauranteModel.findById(doc.restaurantID);
         if(guardar_restaurante){
             guardar_restaurante?.bookingsID.push(doc.id);
             await guardar_restaurante?.save();
         }
         
    } catch (_error) {
        console.log(_error)
    }
    next()
})

export type BookingModelType = mongoose.Document & Booking;

  

export const BookingModel=mongoose.model<BookingModelType>(
    "Booking",
    BookingSchema
);