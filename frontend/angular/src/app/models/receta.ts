import { Producto } from "./producto";

export class Receta {
    _id!: string;
    nombre!: string;
    costoTotal!: number;
    precio!: number;
    alergenos!: string;
    impuestos!: number;
    descripcion!: string;
    productos!: Producto;
}
