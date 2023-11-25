// @deno-types="npm:@types/express@4"
import express from "express"
import mongoose from "mongoose"

const MONGO_URL=Deno.env.get("MONGO_URL");

if(!MONGO_URL)
{
  
  throw new Error("No mongo URl found")
}
await mongoose.connect(MONGO_URL);
console.log("Se ha conectado a la base de datos");
const app = express();
app.use(express.json());


app.listen(3000, () => {
  console.log("Server listening on port 3000");
});