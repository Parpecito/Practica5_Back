// @deno-types="npm:@types/express@4"
import express from "express"
import mongoose from "mongoose"

import {postRestaurant} from "./resolvers/postRestaurant.ts"
import {getRestauranteId} from "./resolvers/getRestaurantId.ts"
import { postClient } from "./resolvers/postClient.ts"
import { getClientId } from "./resolvers/getClientId.ts"
import { postBooking } from "./resolvers/postbookings.ts"
import { getBookingId } from "./resolvers/getbookingsID.ts"
import { deleteRestaurantID } from "./resolvers/deleteRestaurantId.ts"

const MONGO_URL=Deno.env.get("MONGO_URL");

if(!MONGO_URL)
{
  console.log("No mongo URl found")
  Deno.exit(1);
}
await mongoose.connect(MONGO_URL);
console.log("Se ha conectado a la base de datos");
const app = express();
app.use(express.json());

app
  .post("/restaurant", postRestaurant)
  .post("/client",postClient)
  .post("/booking",postBooking)
  .get("/restaurant/:id", getRestauranteId)
  .get("/client/:id",getClientId)
  .get("/booking/:id",getBookingId)
  .delete("/deleterestaurant/:id",deleteRestaurantID)
  
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});