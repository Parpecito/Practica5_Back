import mongoose from "mongoose"
import { Restaurante } from "../types.ts";
import { getRestaurantfromModel } from "../controllers/getRestaurantfromModel.ts";
import { BookingModelType } from "./Booking.ts";
import { BookingModel } from "./Booking.ts";
import { ClientModel } from "./Client.ts";

const Schema=mongoose.Schema;

const RestauranteSchema = new Schema(                                                                 //Se crea el esquema de la base de datos
    {
      name: { type: String, required: true },
      CIF: { type: String, required: true },
      address: { type: String, required: true, unique: true },
      bookingsID: [
        { type: Schema.Types.ObjectId, required: true, ref: "Booking" }
      ]
    },
    {
      timestamps: true
    }
  );
  
RestauranteSchema.path("CIF").validate(function(CIF:string) {                                         //Valido en formato de CIF
    try {
        const validad_CIF=/[A-Za-z][0-9]{8}/
        if(validad_CIF.test(CIF)){
            return true
        }
    } catch (_error) {
        return false;
    }
})
RestauranteSchema.pre("findOne", function (next) {                                                     //Hago un populate para acceder a los datos y se haga antes de que se haga la busqueda findOne
    this.populate("bookingsID");
    next();
  });
  
RestauranteSchema.post("findOne", async function (doc, next) {                                         //Hago un post para que se imprima los valores despues de que se haga la busqueda findOne
    if(doc){
        await getRestaurantfromModel(doc);
    }
    next();
});
RestauranteSchema.pre("save",function(next){                                                          //Hago un populate para acceder a los datos y se haga antes de que se haga el save
    this.populate("bookingsID");
    next()
});
RestauranteSchema.post("save",async function(doc,next) {                                             //Hago un post para que se imprima los valores despues de que se haga el save
    if(doc){
        await getRestaurantfromModel(doc);
    }
    next();
})
RestauranteSchema.post("findOneAndDelete", async function (doc,next) {                               //Hago un post para que se imprima los valores despues de que se haga la busqueda findOneAndDelete
    try {
        await BookingModel.deleteMany({restaurantID:doc._id})
        await ClientModel.deleteMany({ restaurantID: doc._id })
    } catch (error) {
        console.log(error)
    }
    next();
})

RestauranteSchema.post("deleteMany", async function (doc,next) {                                   //Hago un post para que se imprima los valores despues de que se haga la busqueda deleteMany
    try {
        await BookingModel.deleteMany({restaurantID:doc._id})
        } catch (error) {
          console.log(error)
          }
          next();
    })
export type RestauranteModelType = mongoose.Document &
  Omit<Restaurante, "id"> & {
    bookingsID: Array<mongoose.Types.ObjectId>|BookingModelType[];                                  //Aqui le digo que el tipo de bookingsID puede ser un array de ObjectID o un array de BookingModelType
  };

export const RestauranteModel=mongoose.model<RestauranteModelType>(                                 //Creo el modelo de la base de datos
    "Restaurante",
    RestauranteSchema 
);