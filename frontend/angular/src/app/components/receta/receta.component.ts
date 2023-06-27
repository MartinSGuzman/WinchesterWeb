import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Receta } from 'src/app/models/receta';
import { RecetaService } from 'src/app/services/receta.service';

@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.css']
})
export class RecetaComponent implements OnInit {

  
  recetass!: Array<Receta>;

  constructor(private recetaService: RecetaService,
    private router: Router) {
    // this.ticket = new Ticket();
    this.recetass = new Array<Receta>();
    this.cargarRecetas();
  }

  ngOnInit(): void {
  }

  cargarRecetas() {
    this.recetaService.getRecetas().subscribe(
      result => {
        result.forEach((element: any) => {
          let unReceta: Receta = new Receta();
          Object.assign(unReceta, element)
          this.recetass.push(unReceta)
          unReceta = new Receta();
        });
        console.log(result);
      },
      error => {
        console.log(error);
      }
    )
  }

  modificarReceta(receta: Receta) {
    this.router.navigate(["receta-form", receta._id]);
  }

  eliminarReceta(receta: Receta) {
    this.recetaService.deleteReceta(receta._id).subscribe(
      result => {
        if (result.status == "1") {
          //pasar a toast
          console.log(result.msg);
          this.router.navigate(['receta']);
          this.cargarRecetas();
          window.location.reload();
        }
      },
      error => {
        if (error.status == "0") {
          alert(error.msg);
        }
      }

    )
  }

  agregarReceta() {
    this.router.navigate(['receta-form/', 0])
  }
}
