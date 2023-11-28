import mongoose from "mongoose"
import { Booking } from "../types.ts";
import { ClientModel } from "./Client.ts";
import { RestauranteModel } from "./Restaurant.ts";
import { getBookingfromModel } from "../controllers/getBookingfromModel.ts";
const Schema=mongoose.Schema;

const BookingSchema=new Schema(                                                                                         //Aqui creamos el esquema de Booking
    {
        date:{type: Date, default: Date() },
        clientID:{type:Schema.Types.ObjectId,required:true,ref:"Client"},
        restaurantID:{type:Schema.Types.ObjectId,required:true,ref:"Restaurante"},
    },{
        timestamps:true
    }
)
BookingSchema.path("clientID").validate(async function(clientID:mongoose.Types.ObjectId){                            //Validamos que el id del cliente sea valido
    try {
        if (!mongoose.isValidObjectId(clientID)) return false;
        const cliente = await ClientModel.findById(clientID);
        if (!cliente) return false;
        return true;
    } catch (_error) {
        return false;
    }
})
BookingSchema.path("restaurantID").validate(async function(restaurantID:mongoose.Types.ObjectId){                   //Validamos que el id del restaurante sea valido
    try {
        if (!mongoose.isValidObjectId(restaurantID)) return false;
        const restaurante = await RestauranteModel.findById(restaurantID);
        if (!restaurante) return false;
        return true;
    } catch (_error) {
        return false;
    }
})
BookingSchema.pre("findOne", function (next) {                                                                        //Hacemos dos populate para acceder a los datos de los clientes y restaurantes y con el next ya  se hace la busqueda antes de que se haga el findOne
    this.populate("clientID");
    this.populate("restaurantID");
    next();
});
BookingSchema.post("findOne", async function (doc, next) {                                                            //Hacemos un post para que se imprima los valores despues de que se haga la busqueda findOne
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

BookingSchema.pre("save",function(next){                                                                              //Hacemos dos populate para acceder a los datos de los clientes y restaurantes y con el next ya  se hace la busqueda antes de que se haga el save
    this.populate("clientID");
    this.populate("restaurantID");
    next()
});
BookingSchema.post("save",async function(doc,next) {                                                                 //Hacemos un post para que se imprima los valores despues de que se haga el save
    try {   
        const guardar_cliente=await ClientModel.findById(doc.clientID);                                              //Se busca el cliente con el id de clientID
         if(guardar_cliente){                                                                                        //Si se encuentra el cliente se añade el id de la reserva al array de ids de las reservas del cliente para que asi se guarde en la base de datos
             guardar_cliente?.bookingsID.push(doc.id);
             await guardar_cliente?.save();
         }
         const guardar_restaurante=await RestauranteModel.findById(doc.restaurantID);                              //Se busca el restaurante con el id de restaurantID
         if(guardar_restaurante){                                                                                  //Si se encuentra el restaurante se añade el id de la reserva al array de ids de las reservas del restaurante para que asi se guarde en la base de datos
             guardar_restaurante?.bookingsID.push(doc.id);
             await guardar_restaurante?.save();
         }
         
    } catch (_error) {
        console.log(_error)
    }
    next()
})

export type BookingModelType = mongoose.Document & Booking;                                                         //Aqui creamos el tipo de BookingModelType

  

export const BookingModel=mongoose.model<BookingModelType>(                                                         //Aqui creamos el modelo de la base de datos
    "Booking",
    BookingSchema
);