import { Component, OnInit } from '@angular/core';
import { ServicioMarcasService } from 'app/servicio-marcas.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppRoutingModule } from 'app/app-routing.module';
@Component({
  selector: 'app-marcas',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, AppRoutingModule],
  providers: [ServicioMarcasService],
  templateUrl: './marcas.component.html',
  styleUrl: './marcas.component.scss'
})
export class MarcasComponent implements OnInit {
  formUser: FormGroup;
  get nombres() {
    return this.formUser?.get('nombre') as FormControl;
  }

  get descripcion() {
    return this.formUser?.get('descripcion') as FormControl;
  }
  constructor(public ServicioMarcasService: ServicioMarcasService, 
    private http: HttpClient) {
    this.formUser = new FormGroup({
      'nombre': new FormControl('', Validators.required),
      'descripcion': new FormControl('', Validators.required),
    });
  }
  marcaSeleccionada: any;
  marcas: any[] = [];
  ngOnInit(): void {
    this.obtener_marcas();
    
  }
  obtener_marcas() {
    this.ServicioMarcasService.get_marcas()
      .subscribe((result: any) => { this.marcas = result; });
  }
  delete_marca(id: any) {
    this.ServicioMarcasService.deletemarcas(id).subscribe(
      result => {
        alert("Borrado Exitoso");
        this.obtener_marcas();
      }
    )
  };
  addmarcas() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    const body = { ...this.formUser.value, headers };
    this.ServicioMarcasService.addmarcas(body).subscribe(_result => {
      this.obtener_marcas();
    });
  }


}
