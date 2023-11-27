import mongoose from "mongoose"
import { Restaurante } from "../types.ts";
import { getRestaurantfromModel } from "../controllers/getRestaurantfromModel.ts";
import { BookingModelType } from "./Booking.ts";
import { BookingModel } from "./Booking.ts";
import { ClientModel } from "./Client.ts";

const Schema=mongoose.Schema;

const RestauranteSchema = new Schema(
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
RestauranteSchema.pre("findOne", function (next) {
    this.populate("bookingsID");
    next();
  });
  
RestauranteSchema.post("findOne", async function (doc, next) {
    if(doc){
        await getRestaurantfromModel(doc);
    }
    next();
});
RestauranteSchema.pre("save",function(next){
    this.populate("bookingsID");
    next()
});
RestauranteSchema.post("save",async function(doc,next) {
    if(doc){
        await getRestaurantfromModel(doc);
    }
    next();
})
RestauranteSchema.post("findOneAndDelete", async function (doc,next) {
    try {
        await BookingModel.deleteMany({restaurantID:doc.id})
        await ClientModel.deleteMany({ restaurantID: doc.id })
    } catch (error) {
        console.log(error)
    }
    next();
})
export type RestauranteModelType = mongoose.Document &
  Omit<Restaurante, "id"> & {
    bookingsID: Array<mongoose.Types.ObjectId>|BookingModelType[];
  };

export const RestauranteModel=mongoose.model<RestauranteModelType>(
    "Restaurante",
    RestauranteSchema
);