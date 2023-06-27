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
import { UsuarioComponent } from './components/usuario/usuario.component';
import { UsuarioFormComponent } from './components/usuario-form/usuario-form.component';
import { PagoFormComponent } from './components/pago-form/pago-form.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { HeaderComponent } from './components/layout/header/header.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { UsuarioService } from './services/usuario.service';

@NgModule({
  declarations: [
    AppComponent,
    ProductoComponent,
    RecetaComponent,
    RecetaFormComponent,
    PagoComponent,
    UsuarioComponent,
    UsuarioFormComponent,
    PagoFormComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    UsuarioService,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
   }
   ],
   
  bootstrap: [AppComponent],
})
export class AppModule { }
