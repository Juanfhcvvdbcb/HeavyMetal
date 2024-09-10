import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'app/servicios/productos.service';
import { MarcasService } from 'app/servicios/marcas.service';
import { ApirestService } from 'app/servicios/apirest.service';
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
  marcas: any;
  id: any;


  constructor(public apirestservice: ApirestService, 
    public ProductosService: ProductosService, 
    public MarcasService: MarcasService,
    private route: ActivatedRoute, private formBuilder: FormBuilder) {
    this.formUser = this.formBuilder.group({
      'codigo':new FormControl('', Validators.required),
      'nombre': new FormControl('', Validators.required),
      'stock': new FormControl('', Validators.required),
      'descripcion': new FormControl('', Validators.required),
      'precio': new FormControl('', Validators.required),
      'marca': new FormControl('', Validators.required),
      'categoria': new FormControl('', Validators.required),
    }); 
  }

  get codigo(){
    return this.formUser?.get('codigo') as FormControl; 
  }

  get nombre() {
    return this.formUser?.get('nombre') as FormControl;
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

  get Marca() {
    return this.formUser?.get('marca.nombre') as FormControl;
  }

  get Categoria() {
    return this.formUser?.get('categoria.nombre') as FormControl;
  }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.id = params['id'];
        this.seleccionarproducto(this.id);
      } else {
        console.error("ID de producto no proporcionado en los parámetros de ruta.");
      }
    });
  }

  seleccionarproducto(id: any) {
    this.ProductosService.unicoProductos(id).subscribe(
      (      result: any) => {
        this.producto = result;
        this.formUser.setValue({
          nombre: this.producto.nombre,
          stock: this.producto.stock,
          descripcion_producto: this.producto.descripcion_producto,
          precio: this.producto.precio,
          marca_id: this.producto.marca_id,
          categoria_id: this.producto.categoria_id
        });
      },
      (      error: any) => {
        console.error("Error al obtener la producto:", error);
      }
    );
  }

  editarProducto(): void {
    const formData = this.formUser.value;
    const id = this.producto.codigo; // Obtener el ID de la producto
    this.ProductosService.updateProductos(id, formData).subscribe((result: any) => {
      alert('Registro Editado Exitosamente');
    });
  }
}
