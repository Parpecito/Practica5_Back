import mongoose from "mongoose"

export type Client={                                                                                  //Se crea el tipo Client
  firstname:string,
  lastname:string,
  email:string,
  phoneNumber:string,
  DNI:string,
  bookingsID:Array<Omit<Booking,"clientID">>,
  id:mongoose.Types.ObjectId
}

export type Restaurante={                                                                            //Se crea el tipo Restaurante
  name:string,
  CIF:string,
  address:string,
  bookingsID:Array<Omit<Booking,"restaurantID">>,
  id:mongoose.Types.ObjectId
}

export type Booking={
  date?:Date,
  clientID?:Omit<Client,"bookingsID">,
  nombre_cliente?:string, //se va a utilizar para la condicion que si al buscar una reserva, se mostrara el nombre del cliente si se ha encontrado ya que el simbolo ? indica que puede no estar definido
  restaurantID?:Omit<Restaurante,"bookingsID">
  id?:mongoose.Types.ObjectId,
  nombre_restaurante?:string //se va a utilizar para la condicion que si al buscar una reserva, se mostrara el nombre del restaurante si se ha encontrado ya que el simbolo ? indica que puede no estar definido
}