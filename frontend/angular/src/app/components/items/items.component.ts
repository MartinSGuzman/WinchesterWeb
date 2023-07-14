import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Items } from 'src/app/models/items';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  items!: Items;
  itemsss!: Array<Items>;
  constructor(private itemsService: ItemsService,
    private router: Router) {

    this.items = new Items();
    this.itemsss = new Array<Items>();
    this.cargarItems();
  }

  ngOnInit(): void {
  }

  cargarItems() {
    this.itemsService.getItems().subscribe(
      result => {
        result.forEach((element: any) => {
          let unItems: Items = new Items();
          Object.assign(unItems, element)
          this.itemsss.push(unItems)
          unItems = new Items();
        });
        console.log(result);
      },
      error => {
        console.log(error);
      }
    )
  }

  modificarItem(items: Items) {
    this.router.navigate(['items-form', items._id]);
  }

  eliminarItem(items: Items) {
    this.itemsService.deleteItems(items._id).subscribe(
      result => {
        if (result.status == "1") {
          console.log(result.msg);

          this.cargarItems();

        }
      },
      error => {
        if (error.status == "0") {
          alert(error.msg);
        }
      }

    )
  }

  agregarItems() {
    this.router.navigate(['items-form/', 0])
  }
}
