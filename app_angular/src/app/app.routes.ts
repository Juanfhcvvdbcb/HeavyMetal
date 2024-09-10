import { Routes } from '@angular/router';
import { ListadoApiComponent } from './componentes/listado-api/ListadoApiComponent';
import { EditarFormComponent } from './componentes/editar-form/editar-form.component';
import { MarcasComponent } from './componentes/marcas/marcas.component';
import { EditMarcasComponent } from './componentes/edit-marcas/edit-marcas.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroUsuarioComponent } from './componentes/registro-usuario/registro-usuario.component';
import { IndexClienteComponent } from './componentes/index-cliente/index-cliente.component';
import { ProductosComponent } from './componentes/productos/productos.component';
import { EditarProductoComponent } from './componentes/editar-producto/editar-producto.component';
import { IndexComponent } from './componentes/index/index.component';
import { CategoriaSeleccionadaComponent } from './componentes/categoria-seleccionada/categoria-seleccionada.component';
import { ProductoDetalleComponent } from './componentes/producto-detalle/producto-detalle.component';
import { CarritoComponent } from './componentes/carrito/carrito.component';
import { DomicilioComponent } from './componentes/domicilio/domicilio.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/rol.guard';
import { IndexAdminComponent } from './componentes/index-admin/index-admin.component';
import path from 'path';

export const routes: Routes = [
  { path: ' ', component: ListadoApiComponent },
  { path: 'index', component: IndexComponent, canActivate: [AuthGuard] },

  { path: 'listadoapi/edit/:id', component: EditarFormComponent, canActivate: [AuthGuard, RoleGuard] },
  { path: 'marcas', component: MarcasComponent, canActivate: [AuthGuard, RoleGuard] },
  { path: 'categoria/:id', component: CategoriaSeleccionadaComponent, canActivate: [AuthGuard, RoleGuard] },

  { path: 'marcas/editMarcas/:id', component: EditMarcasComponent, canActivate: [AuthGuard, RoleGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroUsuarioComponent },
  { path: 'index/:id', component: IndexClienteComponent, canActivate: [AuthGuard] },
  { path: 'producto', component: ProductosComponent, canActivate: [AuthGuard,  RoleGuard] },
  { path: 'producto/:id', component: EditarProductoComponent, canActivate: [AuthGuard, , RoleGuard] },
  { path: 'producto_detalle/:id_usuario/:codigo', component: ProductoDetalleComponent, canActivate: [AuthGuard] },
  { path: 'carrito/:id_usuario/:id_carrito', component: CarritoComponent, canActivate: [AuthGuard] },
  { path: 'domicilios', component: DomicilioComponent},
  { path: 'admin', component: IndexAdminComponent, canActivate: [AuthGuard, RoleGuard] },
  { path: '**', redirectTo: 'login' }
];  