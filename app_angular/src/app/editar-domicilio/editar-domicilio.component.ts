import { Component, OnInit } from '@angular/core';
import { DomiciliosService } from 'app/domicilios.service';
import { EstadoService } from 'app/estado.service';
import { Detalle_carritoService } from 'app/detalle-carrito.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-domicilio',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './editar-domicilio.component.html',
  styleUrl: './editar-domicilio.component.scss'
})
export class EditarDomicilioComponent implements OnInit {
  formDomicilio: FormGroup;
  domicilio: any;
  detallesCompra: any;
  estados: any;
  id: any

  constructor(public DomiciliosService: DomiciliosService,
    public EstadoService: EstadoService,
    public Detalle_carritoService: Detalle_carritoService,
    private route: ActivatedRoute, private formBuilder: FormBuilder) {
      this.formDomicilio = this.formBuilder.group({
        'ID_Domicilio': new FormControl('', Validators.required),
        'ID_DetalleCompra': new FormControl('', Validators.required),
        'Valor_Domicilio': new FormControl('', Validators.required),
        'ID_Estado': new FormControl('', Validators.required),
        'Fecha_Entrega': new FormControl('', Validators.required),
        'Observaciones_Domiciliario': new FormControl('', Validators.required),
        'Observaciones_Cliente': new FormControl('', Validators.required),
        'Calificacion': new FormControl('', Validators.required),
      });
    }

    get ID_Domicilio() {
      return this.formDomicilio.get('ID_Domicilio');
    }

    get detalleCompra() {
      return this.formDomicilio.get('ID_DetalleCompra');
    }

    get valorDomicilio() {
      return this.formDomicilio.get('Valor_Domicilio');
    }

    get estado() {
      return this.formDomicilio.get('ID_Estado');
    }

    get fechaEntrega() {
      return this.formDomicilio.get('Fecha_Entrega');
    }

    get observacionesDomiciliario() {
      return this.formDomicilio.get('Observaciones_Domiciliario');
    }

    get observacionesCliente() {
      return this.formDomicilio.get('Observaciones_Cliente');
    }

    get calificacion() {
      return this.formDomicilio.get('Calificacion');
    }

    ngOnInit(): void {
      this.route.params.subscribe(params => {
        if (params['id']) {
          this.id = params['id'];
          this.seleccionarDomicilio(this.id);
        } else {
          console.error("ID de domicilio no proporcionado en los parámetros de ruta.");
        }
      });
    }

    seleccionarDomicilio(id: any) {
      this.DomiciliosService.unicoDomicilios(id).subscribe(
        (result: any) => {
          console.log("Datos de domicilio recibidos:", result);
          this.domicilio = result;
          this.formDomicilio.setValue({
            ID_DetalleCompra: this.domicilio.ID_DetalleCompra,
            Valor_Domicilio: this.domicilio.Valor_Domicilio,
            ID_Estado: this.domicilio.ID_Estado,
            Fecha_Entrega: this.domicilio.Fecha_Entrega,
            Observaciones_Domiciliario: this.domicilio.Observaciones_Domiciliario,
            Observaciones_Cliente: this.domicilio.Observaciones_Cliente,
            Calificacion: this.domicilio.Calificacion,
          });
        },
        (error: any) => {
          console.error("Error al obtener el domicilio:", error);
        }
      );
    }

    editarDomicilio(): void {
      const formData = this.formDomicilio.value;
      const id = this.domicilio.ID_Domicilio; // Obtener el ID del domicilio
      this.DomiciliosService.updateDomicilios(id, formData).subscribe((result: any) => {
        console.log(result);
        alert('Domicilio editado exitosamente');
      });
    }
}
