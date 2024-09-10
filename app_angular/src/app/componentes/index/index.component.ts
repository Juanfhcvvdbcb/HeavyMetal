import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppRoutingModule } from 'app/app-routing.module';
import { ActivatedRoute } from '@angular/router'; 
import { ProductosService } from 'app/servicios/productos.service';


@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, 
    HttpClientModule, 
    ReactiveFormsModule, 
    AppRoutingModule],
    providers: [ProductosService],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent implements OnInit{
  formUser: FormGroup;
  productos: any[] = [];

  get nombre_producto() {
    return this.formUser?.get('nombre_producto') as FormControl;
  }

  get descripcion_producto() {
    return this.formUser?.get('descripcion_producto') as FormControl;
  }

  get precio() {
    return this.formUser?.get('precio') as FormControl;
  }

  constructor(public productosService: ProductosService, 
    private http: HttpClient) {
    this.formUser = new FormGroup({
      'nombre_producto': new FormControl('', Validators.required),
      'descripcion_producto': new FormControl('', Validators.required),
      'precio':  new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.obtener_productos();
    
  }

  obtener_productos() {
    this.productosService.get_Productos()
      .subscribe((result: any) => { this.productos = result; });
  }

}
