import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'app/usuarios.service';
import { ProductosService } from 'app/productos.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { AppRoutingModule } from 'app/app-routing.module';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-index-cliente',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, AppRoutingModule],
  providers: [UsuariosService, ProductosService],
  templateUrl: './index-cliente.component.html',
  styleUrl: './index-cliente.component.scss'
})
export class IndexClienteComponent implements OnInit {
  formUser: FormGroup;

  usuario: any = {};
  id: any;
  userId: string | null = null;
producto: any = {};
  get nombre() {
    return this.formUser?.get('nombre') as FormControl;
  }
  get apellido() {
    return this.formUser?.get('apellido') as FormControl;
  }
  get imagen() {
    return this.formUser?.get('imagen') as FormControl;
  }
  get nombre_producto() {
    return this.formUser?.get('nombre_producto') as FormControl;
  }
  get descripcion_producto() {
    return this.formUser?.get('descripcion_producto') as FormControl;
  }
  get precio() {
    return this.formUser?.get('precio') as FormControl;
  }
  constructor(public UsuariosService: UsuariosService,
    public ProductosService: ProductosService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) {
    this.formUser = this.formBuilder.group({
      'nombre': new FormControl('', Validators.required),
      'apellido': new FormControl('', Validators.required),
      'imagen': new FormControl('', Validators.required),
      'nombre_producto': new FormControl('', Validators.required),
      'descripcion_producto': new FormControl('', Validators.required),
      'precio': new FormControl('', Validators.required),
    });
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params['get']('id');
    });

    //   if (params['id']) {
    //     console.log("Hola")
    //     this.id = params['id'];
    //     this.seleccionarUsuario(this.id);
    //   } else {
    //     console.error("ID de usuario no proporcionado en los parámetros de ruta.");
    //   }
    //   this.obtener_productos();
    // });
  }
  obtener_productos() {
    this.ProductosService.get_Productos()
      .subscribe((result: any) => { this.producto = result; });
  }

  seleccionarUsuario(id: any) {
    this.UsuariosService.unicoUsuarios(id).subscribe(
      result => {
        console.log("Datos de los usuarios  recibidos:", result);
        this.usuario = result;
        this.formUser.setValue({
          nombre: this.usuario.nombre,
          apellido: this.usuario.apellido,
          imagen: this.usuario.imagen,
        });
      },
      error => {
        console.error("Error al obtener la marca:", error);
      }
    );
  }

}
