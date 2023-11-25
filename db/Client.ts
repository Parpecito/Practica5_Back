import mongoose from "mongoose"
import { Client } from "../types.ts";
import { BookingModelType } from "./Booking.ts";

const Schema=mongoose.Schema;

const ClientSchema=new Schema(
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
ClientSchema.path("phoneNumber").validate(function(phoneNumber:string) {
    try {
        const validarTelefono=/^\+?\d{2}(\s\d{3}){2}\s\d{4}$/;
        if(validarTelefono.test(phoneNumber)){
            return true;
        }
    
    } catch (_error) {
        return false;
    }
    
})
ClientSchema.path("email").validate(function(email:string){
    try {
        const validad_Email=/[a-z]([a-z]|[0-9])*@[a-z]+(-[a-z]+)?\.[a-z]+/
        if(validad_Email.test(email)){
            return true
        }
    } catch (_error) {
        return false;
    }
})
ClientSchema.path("DNI").validate(function(DNI:string){
    try {
        const validar_DNi=/[0-9]{8}[A-Za-z]/
        if(validar_DNi.test(DNI)){
            return true;
        }
    } catch (_error) {
        return false;
    }
})
export type ClientModelType=mongoose.Document &
    Omit<Client,"id">&{
        bookingsID:Array<mongoose.Types.ObjectId>|BookingModelType[]
    }
export const ClientModel=mongoose.model<ClientModelType>(
    "Client",
    ClientSchema
);