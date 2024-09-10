import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ServicioProveedorService } from 'app/servicio-proveedor.service';
@Component({
  selector: 'app-editar-proveedor',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './editar-proveedor.component.html',
  styleUrl: './editar-proveedor.component.scss'
})
export class EditarProveedorComponent implements OnInit{
  formUser: FormGroup;
  proveedor: any;
  id: any;
  constructor(private ServicioProveedorService: ServicioProveedorService, private route: ActivatedRoute, private formBuilder: FormBuilder) {
    this.formUser = this.formBuilder.group({

      razon_social: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', Validators.required],
      direccion: ['', Validators.required],
    });
  }
  get razon_social() {​

    return this.formUser.get('razon_social') as FormControl;​
  }​
​
  get telefono() {​

    return this.formUser.get('telefono') as FormControl;​

  }
  get correo() {​

    return this.formUser.get('correo') as FormControl;​

  }
  get direccion() {​

    return this.formUser.get('direccion') as FormControl;​

  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        console.log("Hola")
        this.id = params['id'];
        this.seleccionarproveedor(this.id);
      } else {
        console.error("ID de proveedor no proporcionado en los parámetros de ruta.");
      }
    });
  }
  seleccionarproveedor(id: any) {
    this.ServicioProveedorService.unicoServicioProveedor(id).subscribe(
      result => {
        console.log("Datos de la marca  recibidos:", result);
        this.proveedor = result;
        this.formUser.setValue({
          razon_social: this.proveedor.razon_social,
          telefono: this.proveedor.telefono,
          correo: this.proveedor.correo,
          direccion: this.proveedor.direccion,
        });
      },
      error => {
        console.error("Error al obtener al Proveedor:", error);
      }
    );
  }
  editarProveedor(): void {
    const formData = this.formUser.value;
    const id = this.proveedor.nit; // Obtener el ID de la marca
    this.ServicioProveedorService.updateServicioProveedor(id, formData).subscribe((result: any) => {
      console.log(result);
      alert('Proveedor Editada Exitosamente');
    });
  }
}
