import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { AuthService } from 'src/app/auth-service.service';
import { PedidoComponent } from './components/pedido/pedido.component';
import { PedidoFormComponent } from './components/pedido-form/pedido-form.component';
import { ItemsComponent } from './components/items/items.component';
import { ItemsFormComponent } from './components/items-form/items-form.component';
import { ProductoFormComponent } from './components/producto-form/producto-form.component';
import { ProductoComponent } from './components/producto/producto.component';
import { DataTablesModule } from 'angular-datatables';
import { DataTableComponent } from './components/data-table/data-table.component';
import { DataPedidosComponent } from './components/data-pedidos/data-pedidos.component';
import { DataPagosComponent } from './components/data-pagos/data-pagos.component';

@NgModule({
  declarations: [
    AppComponent,
    RecetaComponent,
    RecetaFormComponent,
    PagoComponent,
    UsuarioComponent,
    UsuarioFormComponent,
    PagoFormComponent,
    FooterComponent,
    HeaderComponent,
    PedidoComponent,
    PedidoFormComponent,
    ItemsComponent,
    ItemsFormComponent,
    ProductoFormComponent,
    ProductoComponent,
    DataTableComponent,
    DataPedidosComponent,
    DataPagosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DataTablesModule
  ],
  providers: [
    UsuarioService,
    AuthService,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
   }
   ],
   
  bootstrap: [AppComponent],
})
export class AppModule { }
