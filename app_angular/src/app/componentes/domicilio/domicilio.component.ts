import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms'; // Import FormBuilder, FormArray
import { UsuariosService } from 'app/servicios/usuarios.service';
import { AuthGuard } from 'app/guards/auth.guard';
import { DomiciliosService } from 'app/servicios/domicilios.service';
import { SharedService } from 'app/servicios/shared.service';
import { VentasService } from 'app/servicios/ventas.service';
import { MediosPagoService } from 'app/servicios/medios-pago.service';
import { CommonModule } from '@angular/common';
import { CiudadesService } from 'app/servicios/ciudades.service';
import { CarritoService } from 'app/servicios/carrito.service';
import { DetalleCarritoService } from 'app/servicios/detalle-carrito.service';
/// <reference types="@types/google.maps" />

@Component({
  selector: 'app-domicilio',
  standalone: true,
  imports: [
    CommonModule,
    // Otros módulos
  ],
  templateUrl: './domicilio.component.html',
  styleUrls: ['./domicilio.component.scss']
})
export class DomicilioComponent implements OnInit {
  formUser: FormGroup;
  totalCompra: number = 0;
  fechaEntrega: Date = new Date();
  Ciudades: any[] = []; 
  medioPagos: any[] = [];
  idCarrito: number | null = null;// Declare the 'idCarrito' property
  hasActiveCart: boolean = false;
  userId: number | null = null;
  
  constructor(
    private fb: FormBuilder, // Add FormBuilder to the constructor
    private UsuariosService: UsuariosService,
    private DomiciliosService: DomiciliosService,
    private SharedService: SharedService,
    private VentasService: VentasService,
    private MediosPagoService: MediosPagoService,
    private CiudadesService: CiudadesService,
    private CarritoService: CarritoService,
    private DetalleCarritoService: DetalleCarritoService,

  ) {
    this.formUser = this.fb.group({
      direccion: ['', Validators.required], // Add address field
      telefono: ['', Validators.required], // Add phone field
      fechaEntrega: ['', Validators.required], // Add delivery date field
      observacionesCliente: ['', Validators.required], // Add customer observations field
      medioPago: ['', Validators.required], // Add payment method field
    });
  }

  ngOnInit(): void {
    this.totalCompra = 0;
    this.obtener_ciudad();
    this.obtener_MediosPago();
    // Initialize any additional logic here

  }

  obtener_MediosPago(){
    this.MediosPagoService.get_medios_pagos()
    .subscribe((result: any) => { 
      this.medioPagos = result; 
      alert(JSON.stringify(result));
    });
  }

  obtener_ciudad() {
    this.CiudadesService.get_ciudad()
      .subscribe((result: any) => { this.Ciudades = result; });
  }
  addDomicilio() {
    const domicilioData = {
      ID_DetalleCompra: this.idCarrito, // Example
      Valor_Domicilio: 8000,
      ID_Estado: 5, // Example
      Fecha_Entrega: new Date(this.formUser.value.fechaEntrega).setDate(new Date(this.formUser.value.fechaEntrega).getDate() + 3),
      Observaciones_Cliente: this.formUser.value.observacionesCliente,
      Calificacion: null
    };

    this.DomiciliosService.addDomicilios(domicilioData).subscribe((data: any) => {
      console.log('Domicilio añadido:', data);
      const idDomicilio = data.id_domicilio;
      this.totalCompra += data.valor; // Actualiza el total de la compra

      // Crear ventaData con el idDomicilio obtenido
      const ventaData = {
        ID_Domicilio: idDomicilio, // Asignar el idDomicilio obtenido
        Total_Compra: this.totalCompra,
        ID_MedioPago: this.formUser.value.medioPago // Example, you should get the real ID of the payment method
      };



      // Lógica para manejar ventaData, por ejemplo, enviar a un servicio
      this.VentasService.addVentas(ventaData).subscribe(ventaResponse => {
        console.log('Venta añadida:', ventaResponse);
      });
    });
  }

  onSubmit() {
    //Traer el userID


    this.CarritoService.obtenerIdCarrito(this.userId ?? 0).subscribe(response => {
      this.hasActiveCart = response.id_carrito !== 0;
      this.idCarrito = response.id_carrito;
    });

    this.DetalleCarritoService.obtenerSumaTotalProductos(this.idCarrito ?? 0, this.userId ?? 0).subscribe((total: number) => {
      this.totalCompra = total;
      // Use the totalCompra variable as needed
    });

    const domicilioData = {
      ID_DetalleCompra: this.idCarrito, // Example
      Valor_Domicilio: 8000,
      ID_Estado: 5, // Example
      Fecha_Entrega: new Date(this.formUser.value.fechaEntrega).setDate(new Date(this.formUser.value.fechaEntrega).getDate() + 3),
      Observaciones_Cliente: this.formUser.value.observacionesCliente,
      Calificacion: null
    };
    
    const usuarioData = {
      Domicilio: this.formUser.value.direccion,
      Telefono: this.formUser.value.telefono
    };


    
    const idDomicilio = this.addDomicilio(); // Declare and assign the value of idDomicilio
    
    const ventaData = {
      ID_Domicilio: idDomicilio, // Use the addDomicilio method instead
      Total_Compra: this.totalCompra,
      ID_MedioPago: this.formUser.value.medioPago // Example, you should get the real ID of the payment method
    };

    this.UsuariosService.updateUsuarioDomicilio(
      this.SharedService.getUserId() ?? 0, 
      usuarioData.Domicilio, 
      usuarioData.Telefono // Asegúrate de que usuarioData.Telefono contenga el valor correcto
    ).subscribe(response => {
      console.log('Usuario actualizado:', response);
    });

    this.DomiciliosService.addDomicilios(domicilioData).subscribe((response: any) => {
      console.log('Domicilio añadido:', response);
      // Assuming the response contains the ID of the added domicile
      ventaData.ID_Domicilio = response.id;
      this.VentasService.addVentas(ventaData).subscribe(ventaResponse => {
        console.log('Venta añadida:', ventaResponse);
      });
    });
  }
}