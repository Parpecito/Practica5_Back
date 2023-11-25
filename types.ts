import mongoose from "mongoose"

export type Client={
  firstname:string,
  lastname:string,
  email:string,
  phoneNumber:string,
  DNI:string,
  bookings:Array<Omit<Booking,"client">>,
  id:mongoose.Types.ObjectId
}

export type Restaurante={
  name:string,
  CIF:string,
  address:string,
  bookings:Array<Omit<Booking,"restaurant">>,
  id:mongoose.Types.ObjectId
}

export type Booking={
  date:Date,
  client:Omit<Client,"bookings">,
  restaurant:Omit<Restaurante,"bookings">
  id:mongoose.Types.ObjectId
}