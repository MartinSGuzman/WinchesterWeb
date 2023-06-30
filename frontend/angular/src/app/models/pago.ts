import { Items } from "./items";
import { Receta } from "./receta";

export class Pago {
    _id!:string;
    monto!: number;
    receta!:Receta;
    items!:Items;
    metodo!:string;
    nota!:string;
    horario!:string;
    fecha!:Date;
}
