import { Receta } from "./receta";
import { Producto } from "./producto";

export class Pedido {
  _id!: string;
  recetas: { receta: string, cantidad: number }[] = [];
  obReceta: Receta[] = [];
  items: { item: string, cantidad: number }[] = [];
  obItemsExtra: Producto[] = [];
  estado!: string;
  fecha!: Date;
  nota!: string;
  horario!: string;
}