import { Items } from "./items";
import { Receta } from "./receta";

export class Pago {
    _id!:string;
    monto!: number;
    receta!:string;
    items!:string;
    metodo!:string;
    nota!:string;
    horario!:string;
    fecha!:string;
}
