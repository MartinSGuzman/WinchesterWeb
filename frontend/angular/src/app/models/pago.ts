import { Items } from "./items";
import { Receta } from "./receta";

export class Pago {
    _id!:string;
    total!: number;
    metodo!:string;
    nota!:string;
    horario!:string;
    fecha!:string;
    pedido!:string;
    nombreCliente!:string;
    mesa!:string;
}
