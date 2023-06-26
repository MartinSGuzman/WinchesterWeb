import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductoComponent } from './components/producto/producto.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RecetaComponent } from './components/receta/receta.component';
import { RecetaFormComponent } from './components/receta-form/receta-form.component';
import { PagoComponent } from './components/pago/pago.component';
<<<<<<< HEAD
import { UsuarioComponent } from './components/usuario/usuario.component';
import { UsuarioFormComponent } from './components/usuario-form/usuario-form.component';
=======
import { PagoFormComponent } from './components/pago-form/pago-form.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { HeaderComponent } from './components/layout/header/header.component';

>>>>>>> dc4e9244ce9571fb65d361d49950fe29aa5efd64
@NgModule({
  declarations: [
    AppComponent,
    ProductoComponent,
    RecetaComponent,
    RecetaFormComponent,
    PagoComponent,
<<<<<<< HEAD
    UsuarioComponent,
    UsuarioFormComponent
=======
    PagoFormComponent,
    FooterComponent,
    HeaderComponent

>>>>>>> dc4e9244ce9571fb65d361d49950fe29aa5efd64
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
