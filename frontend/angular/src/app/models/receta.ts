import { Producto } from "./producto";

export class Receta {
    _id!: string;
    nombre!: string;
    precio!: number;
    producs: { produ: string, cantidad: number }[] = [];
    obProducto: Producto[] = [];
    //impuestos!: number;
    descripcion!: string;
    //productos!: Producto;
    cantidad!: number;
}
