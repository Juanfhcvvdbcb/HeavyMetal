import { Component, OnInit } from '@angular/core';
import { CarritoService } from 'app/servicios/carrito.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { AppRoutingModule } from 'app/app-routing.module';
import { ActivatedRoute } from '@angular/router'; // Importa ActivatedRoute en lugar de Router
import { FormControl, FormGroup, Validators } from '@angular/forms'; // Elimina los imports innecesarios
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, HttpClientModule, AppRoutingModule],

  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {
  formUser: FormGroup;
  productos: any[] = [];
  id_usuario: number | null = null; // Cambiado a number
  id_carrito: number | null = null; // Cambiado a number
  get nombre_producto() {
    return this.formUser?.get('nombre_producto') as FormControl;
  }

  get marca__nombre_marca() {
    return this.formUser?.get('marca__nombre_marca') as FormControl;
  }

  get precio() {
    return this.formUser?.get('precio') as FormControl;
  }

  get detallecarrito__cantidad() {
    return this.formUser?.get('detallecarrito__cantidad') as FormControl;
  }


  constructor(
    private router: Router,
    private carritoService: CarritoService,
    private route: ActivatedRoute
  ) {
    this.formUser = new FormGroup({
      'nombre_producto': new FormControl('', Validators.required),
      'marca__nombre_marca': new FormControl('', Validators.required),
      'precio': new FormControl('', Validators.required),
      'detallecarrito__cantidad':new FormControl('', Validators.required),

    });
  }

  ngOnInit(): void {
    // Obtener los parámetros de la URL
    this.route.params.subscribe(params => {
      this.id_usuario = +params['id_usuario'];
      this.id_carrito = +params['id_carrito'];

      // Llamar al método para obtener los productos del carrito activo
      if (this.id_carrito) {
        this.carritoService.getProductosCarrito(this.id_carrito).subscribe(
          data => {
            this.productos = data;
          },
          error => {
            alert('Error al obtener los productos del carrito: ' + error);
          }
        );
      }
    });
  }

  eliminarProducto(producto: any) {
    // Método para eliminar el producto del carrito (por implementar)
    // Aquí podrías implementar la lógica para eliminar el producto
  }
  

  goToDomicilios() {

    this.router.navigate([`/domicilios`]);
  }

  }
    
