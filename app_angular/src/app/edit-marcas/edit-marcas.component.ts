import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ServicioMarcasService } from 'app/servicio-marcas.service';
@Component({
  selector: 'app-edit-marcas',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './edit-marcas.component.html',
  styleUrl: './edit-marcas.component.scss'
})
export class EditMarcasComponent implements OnInit {
  formUser: FormGroup;
  marca: any;
  id: any;
  constructor(private ServicioMarcasService: ServicioMarcasService, private route: ActivatedRoute, private formBuilder: FormBuilder) {
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
        console.log("Hola")
        this.id = params['id'];
        this.seleccionarmarca(this.id);
      } else {
        console.error("ID de marca no proporcionado en los parámetros de ruta.");
      }
    });
  }
  seleccionarmarca(id: any) {
    this.ServicioMarcasService.unicoMarcas(id).subscribe(
      result => {
        console.log("Datos de la marca  recibidos:", result);
        this.marca = result;
        this.formUser.setValue({
          nombre: this.marca.nombre,
          descripcion: this.marca.descripcion
        });
      },
      error => {
        console.error("Error al obtener la marca:", error);
      }
    );
  }
  editarMarca(): void {
    const formData = this.formUser.value;
    const id = this.marca.id; // Obtener el ID de la marca
    this.ServicioMarcasService.updateMarcas(id, formData).subscribe((result: any) => {
      console.log(result);
      alert('Marca Editada Exitosamente');
    });
  }
}
