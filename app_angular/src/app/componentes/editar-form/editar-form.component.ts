import { Component, OnInit } from '@angular/core';
import { ApirestService } from 'app/servicios/apirest.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-editar-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './editar-form.component.html',
  styleUrls: ['./editar-form.component.scss'],
})
export class EditarFormComponent implements OnInit {
  formUser: FormGroup;
  categoria: any;
  id: any;

  constructor(private apirestservice: ApirestService, private route: ActivatedRoute, private formBuilder: FormBuilder) {
    this.formUser = this.formBuilder.group({

      nombre: ['', Validators.required],
      descripcion: ['', Validators.required]
    }); 
  }

  get nombres() {​

    return this.formUser.get('nombre') as FormControl;​

  }​
​


  get descripcion() {​

    return this.formUser.get('descripcion') as FormControl;​

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.id = params['id'];
        this.seleccionarcategoria(this.id);
      } else {
        console.error("ID de categoría no proporcionado en los parámetros de ruta.");
      }
    });
  }

  seleccionarcategoria(id: any) {
    this.apirestservice.unicoCategorias(id).subscribe(
      result => {
        this.categoria = result;
        this.formUser.setValue({
          nombre: this.categoria.nombre,
          descripcion: this.categoria.descripcion
        });
      },
      error => {
        console.error("Error al obtener la categoría:", error);
      }
    );
  }

  editarCategoria(): void {
    const formData = this.formUser.value;
    const id = this.categoria.id; // Obtener el ID de la categoría
    this.apirestservice.updateCategorias(id, formData).subscribe((result: any) => {
      console.log(result);
      alert('Registro Editado Exitosamente');
    });
  }
}
