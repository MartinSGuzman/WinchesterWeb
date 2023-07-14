import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { Receta } from 'src/app/models/receta';
import { ProductoService } from 'src/app/services/producto.service';
import { RecetaService } from 'src/app/services/receta.service';

@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.css']
})
export class RecetaComponent implements OnInit {

  receta!: Receta;
  recetass!: Array<Receta>;

  constructor(private recetaService: RecetaService,
    private productoService: ProductoService,
    private router: Router) {
    this.receta = new Receta();
    this.recetass = new Array<Receta>();
    this.cargarRecetas();
  }

  ngOnInit(): void {
  }

  arrayRecetas: Receta[] = [];

  cargarRecetas() {
    this.recetaService.getRecetas().subscribe(
      (result: Receta[]) => {
        this.arrayRecetas = result;
        console.log(this.arrayRecetas);
        this.agregarProductoReceta();
      },
      error => {
        console.log(error);
        console.log('No hay pedidos');
      }
    );
  }

  modificarReceta(receta: Receta) {
    this.router.navigate(['receta-form/', receta._id]);
  }

  eliminarReceta(receta: Receta) {
    this.recetaService.deleteReceta(receta._id).subscribe(
      result => {
        if (result.status == "1") {
          console.log(result.msg);

          this.cargarRecetas();

        }
      },
      error => {
        if (error.status == "0") {
          alert(error.msg);
        }
      }

    )
  }

  public agregarProductoReceta() {
    const observables: Observable<any>[] = [];

    this.arrayRecetas.forEach(rece => {
      console.log('Receta:', rece);

      rece.obProducto = []; // Inicializar el arreglo de recetas para cada pedido

      if (rece.producs && rece.producs.length > 0) {
        rece.producs.forEach(re => {
          console.log('Rec:', re);

          if (re && re.produ) { // Verificar si el objeto y la propiedad existen
            const id = re.produ;
            console.log('ID:', id);

            const observable: Observable<any> = this.productoService.getProducto(id);
            observables.push(observable);
          } else {
            console.log('Propiedad "Producto" faltante o incorrecta en el objeto Receta');
          }
        });
      } else {
        console.log('Arreglo "Producto" faltante o vacío en el objeto Reecta');
      }
    });

    forkJoin(observables).subscribe(
      respuestas => {
        let index = 0;
        this.arrayRecetas.forEach(recetaaa => {
          recetaaa.obProducto = respuestas.slice(index, index + recetaaa.producs.length);
          index += recetaaa.producs.length;
        });
        console.log(respuestas);
      },
      error => {
        console.log(error);
        console.log('No hay producto para Receta');
      }
    );
  }

  agregarReceta() {
    this.router.navigate(['receta-form/', 0])
  }
}