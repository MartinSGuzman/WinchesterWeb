import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecetaComponent } from './components/receta/receta.component';
import { RecetaFormComponent } from './components/receta-form/receta-form.component';

const routes: Routes = [
  { path: 'receta-form/:id', component: RecetaFormComponent },
  { path: 'receta', component: RecetaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
