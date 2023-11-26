import mongoose from "mongoose"

export type Client={
  firstname:string,
  lastname:string,
  email:string,
  phoneNumber:string,
  DNI:string,
  bookingsID:Array<Omit<Booking,"client">>,
  id:mongoose.Types.ObjectId
}

export type Restaurante={
  name:string,
  CIF:string,
  address:string,
  bookingsID:Array<Omit<Booking,"restaurant">>,
  id:mongoose.Types.ObjectId
}

export type Booking={
  date?:Date,
  clientID?:Omit<Client,"bookings">,
  nombre_cliente?:string, //se va a utilizar para la condicion que si al buscar una reserva, se mostrara el nombre del cliente si se ha encontrado ya que el simbolo ? indica que puede ser undefined
  restaurantID?:Omit<Restaurante,"bookings">
  id:mongoose.Types.ObjectId,
  nombre_restaurante?:string //se va a utilizar para la condicion que si al buscar una reserva, se mostrara el nombre del restaurante si se ha encontrado ya que el simbolo ? indica que puede ser undefined
}