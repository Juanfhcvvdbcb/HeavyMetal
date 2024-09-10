import { Component, OnInit } from '@angular/core';
import { ProveedoresService } from 'app/proveedores.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppRoutingModule } from 'app/app-routing.module';

@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, AppRoutingModule],
  providers: [ ProveedoresService],
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.scss'
})
export class ProveedoresComponent implements OnInit {
  formUser: FormGroup;

  get nit() {
    return this.formUser?.get('nit') as FormControl;
  }

  get razon_social () {
    return this.formUser?.get('razon_social') as FormControl;
  }
  get telefono () {
    return this.formUser?.get('telefono') as FormControl;
  }

  get correo () {
    return this.formUser?.get('correo') as FormControl;
  }
  get direccion () {
    return this.formUser?.get('direccion') as FormControl;
  }
  constructor(public ProveedoresService: ProveedoresService,
    private http: HttpClient) {
    this.formUser = new FormGroup({
      'nit': new FormControl('', Validators.required),
      'razon_social': new FormControl('', Validators.required),
      'telefono': new FormControl('', Validators.required),
      'correo': new FormControl('', Validators.required),
      'direccion': new FormControl('', Validators.required),
    });
  }
  selecionarproveedor: any;
  proveedores: any[] = [];

  ngOnInit(): void {
    this.obtener_proveedores();

  }
  obtener_proveedores() {
    this.ProveedoresService.get_Proveedores()
      .subscribe((result: any) => { this.proveedores = result; });
  }
  delete_Proveedores(id: any) {
    this.ProveedoresService.deleteProveedores(id).subscribe(
      result => {
        alert("Borrado Exitoso");
        this.obtener_proveedores();
      }
    )
  };

  addproveedores() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    const body = { ...this.formUser.value, headers };
    this.ProveedoresService.addProveedores(body).subscribe(_result => {
      this.obtener_proveedores();
    });
  }
}
