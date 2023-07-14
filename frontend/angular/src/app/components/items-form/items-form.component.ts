import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Items } from 'src/app/models/items';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-items-form',
  templateUrl: './items-form.component.html',
  styleUrls: ['./items-form.component.css']
})
export class ItemsFormComponent implements OnInit {

  items!: Items;
  accion: string = "new" // accion tendra los valores de new o update

  constructor(private itemsService: ItemsService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.items = new Items();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id'] == "0") {
        this.accion = "new";
      } else {
        this.accion = "update";
        this.cargarItems(params['id']);
      }
    });
  }

  cargarItems(id: string) {
    this.itemsService.getItem(id).subscribe(
      result => {
        Object.assign(this.items, result);
        //añadir los valores en una lista despleglable
        console.log(result);
      },
      error => {
        console.log(error);
      }
    )
  }

  registrar() {
    this.itemsService.createItem(this.items).subscribe(
      (result: any) => {
        if (result.status == 1) {
          console.log(result.msg);
          this.router.navigate(["items"]);
        }
      },
      error => {
        alert(error.msg);
      }
    )
  }

  actualizarItems() {
    this.itemsService.editItem(this.items).subscribe(
      (result: any) => {
        if (result.status == 1) {
          console.log(result.msg);
          this.router.navigate(['items']);
        }
      },
      error => {
        alert(error.msg);
      }
    )
  }

  volverLista() {
    this.router.navigate(['items'])
  }
}
