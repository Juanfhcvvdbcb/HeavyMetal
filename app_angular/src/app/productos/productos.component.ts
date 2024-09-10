import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'app/productos.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppRoutingModule } from 'app/app-routing.module';
import { MarcasService } from 'app/marcas.service';
import { ApirestService } from 'app/apirest.service';



@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, AppRoutingModule],
  providers: [ProductosService, MarcasService, ApirestService
  ],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.scss'
})
export class ProductosComponent implements OnInit {
  formUser: FormGroup;


  get codigo(){
    return this.formUser?.get('codigo') as FormControl;
  }
  get nombre_producto() {
    return this.formUser?.get('nombre_producto') as FormControl;
  }

  get stock() {
    return this.formUser?.get('stock') as FormControl;
  }

  get descripcion() {
    return this.formUser?.get('descripcion_producto') as FormControl;
  }

  get precio() {
    return this.formUser?.get('precio') as FormControl;
  }

  get marca() { // Cambio de 'Marca' a 'marca'
    return this.formUser?.get('marca.nombre') as FormControl; // Cambio de 'Marca' a 'marca'
  }

  get categoria() { // Cambio de 'Categoria' a 'categoria'
    return this.formUser?.get('categoria.nombre') as FormControl; // Cambio de 'Categoria' a 'categoria'
  }

  constructor(public ProductosService: ProductosService,
    public MarcasService: MarcasService,
    public ApirestService: ApirestService,
    private http: HttpClient) {
    this.formUser = new FormGroup({
      'codigo':new FormControl('', Validators.required),
      'nombre_producto': new FormControl('', Validators.required),
      'stock': new FormControl('', Validators.required),
      'descripcion_producto': new FormControl('', Validators.required),
      'precio': new FormControl('', Validators.required),
      'marca': new FormControl('', Validators.required),
      'categoria': new FormControl('', Validators.required),

    });
  }
  productoSeleccionada: any;
  productos: any[] = [];
  Marcas: any[] = [];
  categorias: any[] = [];

  ngOnInit(): void {
    this.obtener_productos();
    this.obtener_Marcas();
    this.obtener_categoria();

  }

  obtener_productos() {
    this.ProductosService.get_Productos()
      .subscribe((result: any) => { this.productos = result; });
  }

  obtener_Marcas() {
    this.MarcasService.get_Marcas()
      .subscribe((result: any) => { this.Marcas = result; });
  }

  obtener_categoria() {
    this.ApirestService.get_categorias()
      .subscribe((result: any) => { this.categorias = result; });
  }
  delete_producto(id: any) {
    this.ProductosService.deleteProductos(id).subscribe(
      result => {
        alert("Borrado Exitoso");
        this.obtener_productos();
      }
    )
  };

  addproductos() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    const body = { ...this.formUser.value, headers };
    this.ProductosService.addProductos(body).subscribe(_result => {
      this.obtener_productos();
      this.obtener_Marcas();
      this.obtener_categoria();
    });
  }


}
