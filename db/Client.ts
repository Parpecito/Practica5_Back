import mongoose from "mongoose"
import { Client } from "../types.ts";
import { BookingModelType } from "./Booking.ts";
import { getClientfromModel } from "../controllers/getClientfromModel.ts";

const Schema=mongoose.Schema;

const ClientSchema=new Schema(                                                                                  //Creo el esquema de la base de datos
    {
        firstname:{type: String, required: true },
        lastname:{type: String, required: true },
        email: { type: String, required: true, unique: true },
        phoneNumber:{type:String, required: true},
        DNI:{type:String,required:true},
        bookingsID:[
            {type:Schema.Types.ObjectId,required:true,ref:"Booking"}
        ]
    },{
        timestamps:true
    }
)
/*Para lo de la validación utilizando expresiones regulares lo he sacado de aqui 
    https://www.youtube.com/watch?v=QmUSmRKsLik
*/
ClientSchema.path("phoneNumber").validate(function(phoneNumber:string) {                                        //Valido en formato de telefono
    try {
        const validarTelefono=/^\+?\d{2}(\s\d{3}){2}\s\d{4}$/;
        if(validarTelefono.test(phoneNumber)){
            return true;
        }
    
    } catch (_error) {
        return false;
    }
    
})
ClientSchema.path("email").validate(function(email:string){                                                    //Valido en formato de email
    try {
        const validad_Email=/[a-z]([a-z]|[0-9])*@[a-z]+(-[a-z]+)?\.[a-z]+/
        if(validad_Email.test(email)){
            return true
        }
    } catch (_error) {
        return false;
    }
})
ClientSchema.path("DNI").validate(function(DNI:string){                                                       //Valido en formato de DNI
    try {
        const validar_DNi=/[0-9]{8}[A-Za-z]/
        if(validar_DNi.test(DNI)){
            return true;
        }
    } catch (_error) {
        return false;
    }
})
ClientSchema.pre("findOne", function (next) {                                                                  //Hago un populate para que me muestre los datos de las reservas y se haga antes de que se haga la busqueda findOne
    this.populate("bookingsID");
    next();
  });
  
ClientSchema.post("findOne", async function (doc, next) {                                                      //Hago un post para que se imprima los valores despues de que se haga la busqueda findOne
    if(doc){
        await getClientfromModel(doc);
        
    }
    next();
});

ClientSchema.pre("save",function(next){                                                                       //Hago un populate para que me muestre los datos de las reservas y se haga antes de que se haga la busqueda save
    this.populate("bookingsID");
    next()
});
ClientSchema.post("save",async function(doc,next) {                                                           //Hago un post para que se imprima los valores despues de que se haga la busqueda save
    if(doc){
        await getClientfromModel(doc);
    }
    next();
})

export type ClientModelType=mongoose.Document &
    Omit<Client,"id">&{
        bookingsID:Array<mongoose.Types.ObjectId>|BookingModelType[]                                            //Aqui le digo que el tipo de bookingsID puede ser un array de ObjectID o un array de BookingModelType
    }
export const ClientModel=mongoose.model<ClientModelType>(                                                        //Creo el modelo de la base de datos
    "Client",
    ClientSchema
);