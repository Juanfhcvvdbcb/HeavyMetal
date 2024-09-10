import { Component, OnInit } from '@angular/core';
import { DomiciliosService } from 'app/domicilios.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppRoutingModule } from 'app/app-routing.module';
import { EstadoService } from 'app/estado.service';
import { Detalle_carritoService } from 'app/detalle-carrito.service';




@Component({
  selector: 'app-domicilios',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, AppRoutingModule],
  providers: [DomiciliosService, EstadoService, Detalle_carritoService ],
  templateUrl: './domicilios.component.html',
  styleUrl: './domicilios.component.scss'
})
export class DomiciliosComponent implements OnInit{
  formDomicilio: FormGroup;

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

get descripcion() {
  return this.formDomicilio.get('descripcion');
}

  domicilios: any[] = [];
  estados: any[] = [];
  detallesCompra: any[] = [];

  constructor(public DomiciliosService: DomiciliosService,
    public EstadoService: EstadoService,
    public Detalle_carritoService: Detalle_carritoService,
    private http: HttpClient) {
      this.formDomicilio = new FormGroup({
        'ID_Domicilio': new FormControl('', Validators.required),
        'ID_DetalleCompra': new FormControl('', Validators.required),
        'Valor_Domicilio': new FormControl('', Validators.required),
        'ID_Estado': new FormControl('', Validators.required),
        'Fecha_Entrega': new FormControl('', Validators.required),
        'Observaciones_Domiciliario': new FormControl('', Validators.required),
        'Observaciones_Cliente': new FormControl('', Validators.required),
        'Calificacion': new FormControl('', Validators.required),
        'descripcion': new FormControl('', Validators.required),
      });
    }

    ngOnInit(): void {
      this.obtenerDomicilios();
      this.obtenerEstado();
      this.obtenerDetalleCarrito();
    }

    obtenerDomicilios() {
      this.DomiciliosService.get_Domicilios().subscribe((result: any) => {
        this.domicilios = result;
      });
    }

    obtenerEstado() {
      this.EstadoService.get_Estados().subscribe((result: any) => {
        this.estados = result;
      });
    }

    obtenerDetalleCarrito() {
      this.Detalle_carritoService.get_Detalle_carrito().subscribe((result: any) => {
        this.detallesCompra = result;
      });
    }

    deleteDomicilios(id: any) {
      this.DomiciliosService.deleteDomicilios(id).subscribe(() => {
        alert('Domicilio eliminado correctamente');
        this.obtenerDomicilios();
      });
    }

    addDomicilios() {
      const formData = this.formDomicilio.value;
      this.DomiciliosService.addDomicilios(formData).subscribe(() => {
        alert('Usuario añadido correctamente');
        this.obtenerDomicilios();
      });
    }

}
