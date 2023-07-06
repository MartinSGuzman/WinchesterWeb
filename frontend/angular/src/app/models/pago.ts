import { Items } from "./items";
import { Receta } from "./receta";

export class Pago {
    _id!:string;
    monto!: number;
    receta!:Receta;
    items!:string;
    metodo!:string;
    nota!:string;
    horario!:string;
    fecha!:string;
}
