import { Component, OnInit } from '@angular/core';
import { ApirestService } from 'app/apirest.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppRoutingModule } from 'app/app-routing.module';
@Component({
  selector: 'app-listado-api',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, AppRoutingModule],
  providers: [ApirestService
  ],
  templateUrl: './listado-api.component.html',
  styleUrl: './listado-api.component.scss',
})
export class ListadoApiComponent implements OnInit {
  formUser: FormGroup;

  get nombres() {
    return this.formUser?.get('nombre') as FormControl;
  }

  get descripcion() {
    return this.formUser?.get('descripcion') as FormControl;
  }

  constructor(public apirestservice: ApirestService, 
    private http: HttpClient) {
    this.formUser = new FormGroup({
      'nombre': new FormControl('', Validators.required),
      'descripcion': new FormControl('', Validators.required),
    });
  }
  categoriaSeleccionada: any;
  categorias: any[] = [];

  ngOnInit(): void {
    this.obtener_categorias();
    
  }

  obtener_categorias() {
    this.apirestservice.get_categorias()
      .subscribe((result: any) => { this.categorias = result; });
  }

  delete_categoria(id: any) {
    this.apirestservice.deletecategorias(id).subscribe(
      result => {
        alert("Borrado Exitoso");
        this.obtener_categorias();
      }
    )
  };

  addcategorias() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    const body = { ...this.formUser.value, headers };
    this.apirestservice.addcategorias(body).subscribe(_result => {
      this.obtener_categorias();
    });
  }

  
}
