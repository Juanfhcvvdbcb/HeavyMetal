import { Component, OnInit } from '@angular/core';
import { ServicioProductoService } from 'app/servicio-producto.service';
import { MarcasService } from 'app/marcas.service';
import { ApirestService } from 'app/apirest.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-producto',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './editar-producto.component.html',
  styleUrl: './editar-producto.component.scss'
})
export class EditarProductoComponent implements OnInit {
  formUser: FormGroup;
  producto: any;
  Marcas: any[] = [];
  categorias: any[] = [];
  id: any;


  constructor(public ApirestService: ApirestService,
    public ServicioProductoService: ServicioProductoService,
    public MarcasService: MarcasService,
    private route: ActivatedRoute, private formBuilder: FormBuilder) {
    this.formUser = this.formBuilder.group({
      nombre_producto: ['', Validators.required],
      stock: ['', Validators.required],
      descripcion_producto: ['', Validators.required],
      precio: ['', Validators.required],
      marca: ['', Validators.required],
      categoria: ['', Validators.required],
    });
  }

  get codigo(){
    return this.formUser.get('codigo') as FormControl;
  }

  get nombre_producto() {
    return this.formUser.get('nombre_producto') as FormControl;
  }

  get stock() {
    return this.formUser.get('stock') as FormControl;
  }

  get descripcion() {
    return this.formUser.get('descripcion_producto') as FormControl;
  }

  get precio() {
    return this.formUser.get('precio') as FormControl;
  }

  get marca() {
    return this.formUser.get('marca.nombre') as FormControl;
  }

  get categoria() {
    return this.formUser.get('categoria.nombre') as FormControl;
  }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        console.log("Hola")
        this.id = params['id'];
        this.seleccionarproducto(this.id);
      } else {
        console.error("ID de producto no proporcionado en los parámetros de ruta.");
      }
    });

    this.obtener_Marcas();
    this.obtenerCategorias();
  }



  seleccionarproducto(id: any) {
    this.ServicioProductoService.unicoServicioProducto(id).subscribe(
        result => {
        console.log("Datos de producto recibidos:", result);
        this.producto = result;
        this.formUser.setValue({
          nombre_producto: this.producto.nombre_producto,
          stock: this.producto.stock,
          descripcion_producto: this.producto.descripcion_producto,
          precio: this.producto.precio,
          marca: this.producto.marca,
          categoria: this.producto.categoria
        });
      },
      (      error: any) => {
        console.error("Error al obtener la producto:", error);
      }
    );
  }
  obtener_Marcas() {
    this.MarcasService.get_Marcas().subscribe(
      (data: any) => {
        this.Marcas = data;
      },
      error => {
        console.error("Error al obtener las marcas:", error);
      }
    );
  }

  obtenerCategorias() {
    this.ApirestService.get_categorias().subscribe(
      (data: any) => {
        this.categorias = data;
      },
      error => {
        console.error("Error al obtener las categorías:", error);
      }
    );
  }

  editarProducto(): void {
    const formData = this.formUser.value;
    const id = this.producto.codigo; // Obtener el ID de la producto
    this.ServicioProductoService.updateServicioProducto(id, formData).subscribe((result: any) => {
      console.log(result);
      alert('Registro Editado Exitosamente');
    });
  }
}
