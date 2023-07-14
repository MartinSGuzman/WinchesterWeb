import { Receta } from "./receta";
import { Producto } from "./producto";
import { Items } from "./items";

export class Pedido {
  _id!: string;
  recetas: { receta: string, cantidad: number }[] = [];
  obReceta: Receta[] = [];
  items: { item: string, cantidad: number }[] = [];
  obItemsExtra: Items[] = [];
  estado!: string;
  fecha!: Date;
  nota!: string;
  alergenos!: string;
  horario!: string;
  total!:number;
  nombreCliente !: string;
  mesa!: string;
}