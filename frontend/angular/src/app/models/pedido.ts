import { Receta } from "./receta";
import { Producto } from "./producto";

export class Pedido {
    _id!:string;
    receta!:string[];
    obReceta!:Receta[];
    items!:string[];
    obItemsExtra!:Producto[];
    estado!:string;
    fecha!:string;
    nota!:string;
    horario!:string;
  }