import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoService } from 'app/servicios/carrito.service';
import { SharedService } from 'app/servicios/shared.service';
import { CommonModule } from '@angular/common';
import { ProductosService } from 'app/servicios/productos.service';
import { FormsModule } from '@angular/forms'; // Importar FormsModule
import { UsuariosService } from 'app/servicios/usuarios.service';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-header',
  standalone: true, // Esto indica que el componente es standalone
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [CommonModule, FormsModule, RouterModule] // Agregar módulos necesarios aquí
})
export class HeaderComponent implements OnInit {
  currentRoute: string | undefined;
  userId: number | null = null;
  userRole: string | null = null;
  hasActiveCart: boolean = false;
  searchTerm: string = ''; // Añadir propiedad para el término de búsqueda
  idCarrito: number | null = null;


  constructor(
    private router: Router,
    private CarritoService: CarritoService,
    private sharedService: SharedService,
    private productosService: ProductosService,
    private usuariosService: UsuariosService // Inyectar UsuariosService
  ) {}

  ngOnInit(): void {
    this.currentRoute = this.router.url;
    this.userRole = this.sharedService.getUserRole();
    console.log('Rol del usuario:', this.userRole);
    this.userId = this.sharedService.getUserId();
    if (this.userId !== null) {
      this.CarritoService.obtenerIdCarrito(this.userId).subscribe(response => {
        this.hasActiveCart = response.id_carrito !== 0;
        this.idCarrito = response.id_carrito;
      });
    }
  }

  goToCarrito() {
    if (this.userId !== null && this.idCarrito !== null) {
      this.router.navigate([`/carrito/${this.userId}/${this.idCarrito}`]);
    }else{
      alert("Acceso denegado, no tienes un carrito activo");
    }
  }

  goToProducto() {

      this.router.navigate([`/producto/`]);

  }

  onSearch(event: Event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    this.sharedService.setSearchTerm(this.searchTerm); // Establecer el término de búsqueda
    if (this.userId !== null) {
      this.router.navigate([`/index/${this.userId}`]); // Redirigir al componente de índice
    }
  }

  logout() {
    this.usuariosService.logout();
    this.router.navigate(['/login']); // Redirigir a la página de inicio de sesión
  }
}
