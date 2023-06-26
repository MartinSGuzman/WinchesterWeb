import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecetaComponent } from './components/receta/receta.component';
import { RecetaFormComponent } from './components/receta-form/receta-form.component';
import { PagoFormComponent } from './components/pago-form/pago-form.component';
import { PagoComponent } from './components/pago/pago.component';

const routes: Routes = [
  { path: 'receta-form/:id', component: RecetaFormComponent },
  { path: 'receta', component: RecetaComponent },
  { path: 'pago-form/:id', component: PagoFormComponent },
  { path: 'pago', component: PagoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
