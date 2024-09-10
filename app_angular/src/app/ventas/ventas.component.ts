import { Component, OnInit } from '@angular/core';
import { VentasService } from 'app/ventas.service';
import { DomiciliosService } from 'app/domicilios.service';
import { MediosPagoService } from 'app/medios-pago.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppRoutingModule } from 'app/app-routing.module';

@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, AppRoutingModule],
  providers: [VentasService,DomiciliosService, MediosPagoService],
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.scss'
})
export class VentasComponent implements OnInit {
  formUser: FormGroup;

  get id_venta() {
    return this.formUser?.get('id_venta') as FormControl;
  }

  get id_domicilio() {
    return this.formUser?.get('id_domicilio') as FormControl;
  }
  get total_compra() {
    return this.formUser?.get('total_compra') as FormControl;
  }
  get id_mediopago() {
    return this.formUser?.get('id_mediopago') as FormControl;
  }

  constructor(public VentasService: VentasService,
    public DomiciliosService: DomiciliosService,
    public MediosPagoService: MediosPagoService,
     private http: HttpClient) {
    this.formUser = new FormGroup({
      'id_venta': new FormControl('', Validators.required),
      'id_domicilio': new FormControl('', Validators.required),
      'total_compra': new FormControl('', Validators.required),
      'id_mediopago': new FormControl('', Validators.required),
    });
  }

  ventaSeleccionada: any;
  ventas: any[] = [];
  domicilios: any[] = [];
  MediosPago: any[] = [];

  ngOnInit(): void {
    this.obtener_ventas();
    this.obtener_domicilios();
    this.obtener_mediospago();

  }

  obtener_ventas() {
    this.VentasService.get_Ventas()
      .subscribe((result: any) => { this.ventas = result; });
  }
  obtener_domicilios() {
    this.DomiciliosService.get_Domicilios()
      .subscribe((result: any) => { this.domicilios = result; });
  }
  obtener_mediospago() {
    this.MediosPagoService.get_medios_pagos()
      .subscribe((result: any) => { this.MediosPago = result; });
  }

  delete_Ventas(id: any) {
    this.VentasService.deleteVentas(id).subscribe(
      result => {
        alert("Borrado Exitoso");
        this.obtener_ventas();
      }
    )
  };

  addVentas() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    const body = { ...this.formUser.value, headers };
    this.VentasService.addVentas(body).subscribe(_result => {
      this.obtener_ventas();
      this.obtener_domicilios();
      this.obtener_mediospago();
    });
  }


}
