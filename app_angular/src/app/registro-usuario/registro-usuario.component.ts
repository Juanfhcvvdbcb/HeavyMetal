import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'app/usuarios.service';
import { RolServiceService } from 'app/rol-service.service';
import { CiudadService } from 'app/ciudad.service';
import { DepartamentoService } from 'app/departamento.service';
import { EstadoService } from 'app/estado.service';
import { CommonModule } from '@angular/common';
import { TipoIdentificacionServiceService } from 'app/tipo-identificacion-service.service';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppRoutingModule } from 'app/app-routing.module';
import { Router } from '@angular/router';



@Component({
  selector: 'app-registro-usuario',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, AppRoutingModule],
  providers: [UsuariosService, RolServiceService, CiudadService, DepartamentoService, TipoIdentificacionServiceService, EstadoService],
  templateUrl: './registro-usuario.component.html',
  styleUrl: './registro-usuario.component.scss'
})
export class RegistroUsuarioComponent implements OnInit {
  formUser: FormGroup;

  get tipo_identificacion(){
    return this.formUser?.get('tipo_identificacion') as FormControl;
  }
  get id_usuario(){
    return this.formUser?.get('id_usuario') as FormControl;
  }
  get nombre(){
    return this.formUser?.get('nombre') as FormControl;
  }
  get apellido(){
    return this.formUser?.get('apellido') as FormControl;
  }
  get correo_electronico(){
    return this.formUser?.get('correo_electronico') as FormControl;
  }
  get Contraseña_Encriptada(){
    return this.formUser?.get('Contraseña_Encriptada') as FormControl;
  }
  get direccion(){
    return this.formUser?.get('direccion') as FormControl;
  }
  get telefono(){
    return this.formUser?.get('telefono') as FormControl;
  }
  //get departamento(){
  //  return this.formUser?.get('departamento') as FormControl;
  //}
  get fecha_registro(){
    return this.formUser?.get('fecha_registro') as FormControl;
  }
  get id_ciudad(){
    return this.formUser?.get('id_ciudad') as FormControl;
  }
  get id_rol(){
    return this.formUser?.get('id_rol') as FormControl;
  }
  get id_estado(){
    return this.formUser?.get('id_estado') as FormControl;
  }

  constructor(public UsuariosService: UsuariosService,
    public RolServiceService: RolServiceService,
    public CiudadService: CiudadService,
    public DepartamentoService: DepartamentoService,
    public EstadoService: EstadoService,
    public TipoIdentificacionServiceService: TipoIdentificacionServiceService,
    private http: HttpClient) {
    this.formUser = new FormGroup({
      'tipo_identificacion': new FormControl('', Validators.required),
      'id_usuario':new FormControl('', Validators.required),
      'nombre':new FormControl('', Validators.required),
      'apellido': new FormControl('', Validators.required),
      'correo_electronico': new FormControl('', Validators.required),
      'Contraseña_Encriptada': new FormControl('', Validators.required),
      'direccion': new FormControl('', Validators.required),
      'telefono': new FormControl('', Validators.required),
      //'departamento': new FormControl('', Validators.required),
      'fecha_registro': new FormControl('', Validators.required),
      'id_ciudad': new FormControl('', Validators.required),
      'id_rol': new FormControl('2', Validators.required),
      'id_estado': new FormControl('1', Validators.required),
    });
}

  id_ciudades: any[] = [];
  departamentos: any[] = [];
  estados: any[] = [];
  roles: any[] = [];
  tis:  any[] = [];
  usuarios: any[] = [];

ngOnInit(): void {
  this.obtener_rol();
  this.obtener_estado();
  this.obtener_id_ciudades();
  this.obtener_departamento();
  this.obtener_tis();

}

obtener_rol() {
  this.RolServiceService.get_Roles()
    .subscribe((result: any) => { this.roles = result; });
}
obtener_id_ciudades() {
  this.CiudadService.get_Ciudades()
    .subscribe((result: any) => { this.id_ciudades = result; });
}
obtener_departamento() {
  this.DepartamentoService.get_Departamentos()
    .subscribe((result: any) => { this.departamentos = result; });
}
obtener_estado() {
  this.EstadoService.get_Estados()
    .subscribe((result: any) => { this.estados = result; });
}
obtener_tis() {
  this.TipoIdentificacionServiceService.get_TIs()
    .subscribe((result: any) => { this.tis = result; });
};

addusuarios() {
  const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
  const body = { ...this.formUser.value };

  this.UsuariosService.addUsuarios(body).subscribe({
    next: (_) => {
      alert('Usuario registrado con éxito');
      this.formUser.reset();
    },
    error: (error) => {
      alert('Error al registrar el usuario. Por favor, inténtelo de nuevo.');
      console.error('Error:', error);
    },
    complete: () => {
      // Mostrar un mensaje en el complete
      alert('¡Bienvenido a Heavy metal por favor ingrese al login!');
    }
  });
}



}
