import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecetaComponent } from './components/receta/receta.component';
import { RecetaFormComponent } from './components/receta-form/receta-form.component';
import { ProductoComponent } from './components/producto/producto.component';
import { PagoComponent } from './components/pago/pago.component';


const routes: Routes = [
  { path: 'producto', component: ProductoComponent },
  { path: 'receta-form/:id', component: RecetaFormComponent },
  { path: 'receta', component: RecetaComponent },
  { path: 'pago', component: PagoComponent },

  { path: '**', pathMatch:'full',redirectTo:'producto' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
