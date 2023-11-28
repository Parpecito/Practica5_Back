// @deno-types="npm:@types/express@4"
import express,{Request,Response} from "express"
import mongoose from "mongoose"

import {postRestaurant} from "./resolvers/postRestaurant.ts"
import {getRestauranteId} from "./resolvers/getRestaurantId.ts"
import { postClient } from "./resolvers/postClient.ts"
import { getClientId } from "./resolvers/getClientId.ts"
import { postBooking } from "./resolvers/postbookings.ts"
import { getBookingId } from "./resolvers/getbookingsID.ts"
import { deleteRestaurantID } from "./resolvers/deleteRestaurantId.ts"
import { deleteBookingID } from "./resolvers/deleteBookingId.ts"
import { deleteallRestaurant } from "./resolvers/deleteallRestaurants.ts"

const MONGO_URL=Deno.env.get("MONGO_URL");                                                //Se obtiene la url de la base de datos de mongo

if (!MONGO_URL) {                                                                        //Si no se ha encontrado la url de la base de datos se devuelve un error
  console.log("No mongo URl found");
  throw new Error("Mongo URL not found");
}
await mongoose.connect(MONGO_URL);                                                       //Se conecta a la base de datos
console.log("Se ha conectado a la base de datos");
const app = express();                                                                  //Se crea la aplicación
app.use(express.json()); 

app                                                                                    //Se crean los endpoints
  .post("/restaurant", postRestaurant)
  .post("/client",postClient)
  .post("/booking",postBooking)
  .get("/restaurant/:id", getRestauranteId)
  .get("/client/:id",getClientId)
  .get("/booking/:id",getBookingId)
  .get("",(_req:Request,res:Response)=>{
    res.send("Escribe por pantalla lo que quieras hacer")
  })
  .delete("/deleterestaurant/:id",deleteRestaurantID)
  .delete("/deletebooking/:id",deleteBookingID)
  .delete("/deleteallrestaurants",deleteallRestaurant)

  
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});