import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { AppRoutingModule } from 'app/app-routing.module';
import { UsuariosService } from 'app/servicios/usuarios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoIdentificacionService } from 'app/servicios/tipo-identificacion.service';
import { CiudadesService } from 'app/servicios/ciudades.service';
import { ImagenUsuarioService } from 'app/servicios/imagen-usuario.service';
@Component({
  selector: 'app-registro-usuario',
  standalone: true,
  imports: [CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule],
  providers: [UsuariosService,
    TipoIdentificacionService,
    CiudadesService
  ],
  templateUrl: './registro-usuario.component.html',
  styleUrl: './registro-usuario.component.scss'
})
export class RegistroUsuarioComponent implements OnInit {
  formUser: FormGroup;
  get id_tipo() {
    return this.formUser?.get('id_tipo') as FormControl;
  }

  get descripcion() {
    return this.formUser?.get('descripcion') as FormControl;
  }


  get tipo_identificacion() {
    return this.formUser?.get('Tipo_Identificacion') as FormControl;
  }
  get id_ciudad() {
    return this.formUser?.get('id_ciudad') as FormControl;
  }


  get nombre_ciudad() {
    return this.formUser?.get('nombre_ciudad') as FormControl;
  }

  get id_usuario() {
    return this.formUser?.get('id_usuario') as FormControl;
  }

  get nombre_usuario() {
    return this.formUser?.get('nombre_usuario') as FormControl;
  }

  get apellido() {
    return this.formUser?.get('apellido') as FormControl;
  }
  get correo_electronico() {
    return this.formUser?.get('correo_electronico') as FormControl;
  }
  get Contraseña_Encriptada() {
    return this.formUser?.get('Contraseña_Encriptada') as FormControl;
  }

  get id_estado() {
    return this.formUser?.get('id_estado') as FormControl;
  }



  get telefono() {
    return this.formUser?.get('telefono') as FormControl;
  }

  get id_rol() {
    return this.formUser?.get('id_rol') as FormControl;

  }

  get direccion() {
    return this.formUser?.get('direccion') as FormControl;
  }



  // get Imagen(){
  //   return this.formUser?.get('Imagen') as FormControl; 
  // }





  usuario: string = '';
  usuarios: any[] = [];
  tiposId: any[] = [];
  ciudades: any[] = [];
  constructor(public UsuariosService: UsuariosService,
    public TipoIdentificacionService: TipoIdentificacionService,
    public CiudadesService: CiudadesService,
    private http: HttpClient,
    public ImagenUsuarioService: ImagenUsuarioService

    ) {
    const currentFormattedDate = this.formatDateToString(new Date());
    this.formUser = new FormGroup({
      'id_usuario': new FormControl('', Validators.required),
      'nombre_usuario': new FormControl('', Validators.required),
      'apellido': new FormControl('', Validators.required),
      'correo_electronico': new FormControl('', Validators.required),
      'Contraseña_Encriptada': new FormControl('', Validators.required),
      'id_estado': new FormControl(1, Validators.required),
      'id_rol': new FormControl(1, Validators.required),
      'id_ciudad': new FormControl('', Validators.required),
      'direccion': new FormControl('', Validators.required),
      'telefono': new FormControl('', Validators.required),
      'fecha_registro': new FormControl(currentFormattedDate), 
      'tipo_identificacion': new FormControl('', Validators.required),

      'imagen': new FormControl(''),

    });
  }

  formatDateToString(date: Date): string {
    const pad = (n: number) => n < 10 ? '0' + n : n;
  
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  

  ngOnInit(): void {
    this.obtener_TIs();
    this.obtener_ciudad();
  }



  obtener_TIs() {
    this.TipoIdentificacionService.get_tipo_identifica()
      .subscribe((result: any) => { this.tiposId = result; });
  }

  obtener_ciudad() {
    this.CiudadesService.get_ciudad()
      .subscribe((result: any) => { this.ciudades = result; });
  }

  obtener_usuarios() {
    this.UsuariosService.get_Usuarios()
      .subscribe((result: any) => { this.usuarios = result; });
  }

  add_usuario() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    const body = {
      ...this.formUser.value,
      id_ciudad: Number(this.formUser.value.id_ciudad) // Convertir a número
    };

    this.UsuariosService.addUsuarios(body).subscribe(
      result => {
        alert('Registro insertado');
        // this.obtener_categorias();
      },
      error => {
        alert('Error al insertar el registro: ' + error.message);
      }
    );
  }


  addImage() {
    // Obtener las referencias a los elementos de entrada de archivo
    const imageInput = document.getElementById('imageUpload') as HTMLInputElement;

    // Verificar que los elementos de entrada de archivo existan
    if (!imageInput || !imageInput.files || imageInput.files.length === 0) {
      console.error('No se seleccionó ningún archivo de imagen.');
      return;
    }
    // Obtener el archivo seleccionado
  const file = imageInput.files[0]

    // Crear una copia del archivo
  const fileCopy = new File([file], file.name, { type: file.type });
    // Subir la imagen al servidor
  this.ImagenUsuarioService.uploadImage([fileCopy]).subscribe(
    (response: any) => {
      
      
    },
    (error: any) => {
      console.error('Error del servidor:', error);
    }
  );
  this.add_usuario();
  }






}
