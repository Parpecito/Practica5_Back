// @deno-types="npm:@types/express@4"
import express from "express"
import mongoose from "mongoose"
import {postRestaurant} from "./resolvers/postRestaurant.ts"
import {getRestauranteId} from "./resolvers/getRestaurantId.ts"
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
  .get("/restaurant/:id", getRestauranteId)
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});