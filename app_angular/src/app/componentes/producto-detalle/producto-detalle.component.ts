import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { AppRoutingModule } from 'app/app-routing.module';
import { ActivatedRoute, Router } from '@angular/router';

// Servicios
import { ProductosService } from 'app/servicios/productos.service';
import { MarcasService } from 'app/servicios/marcas.service';
import { UsuariosService } from 'app/servicios/usuarios.service';
import { CarritoService } from 'app/servicios/carrito.service';
import { DetalleCarritoService } from 'app/servicios/detalle-carrito.service';
import { ImagenesProductosService } from 'app/servicios/imagenes-productos.service';

import { ApirestService } from 'app/servicios/apirest.service';


@Component({
  selector: 'app-producto-detalle',
  standalone: true,
  imports: [CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule],
  templateUrl: './producto-detalle.component.html',
  styleUrl: './producto-detalle.component.scss'
})
export class ProductoDetalleComponent  implements OnInit{
  productos: any[] = [];
  marcas: any[] = [];
  categorias: any[] = [];
  codigo_id: number | null = null;
  producto: any;
  marca: any;
  categoria: any;
  formUser: FormGroup;
  id_usuario: number | null = null; 
  carritos: any[] = [];
  detalle_carritos: any[] = [];
  ultimoIdCarrito: number | undefined;
  ultimoIdDetalle: number | undefined;
  valideEstado: string | null = null;
  isProcedenteInsertar: boolean | null = null;
  idCarrito: number | null = null; 
  cantidad2: number | null = null;
  totalProducto: number | null = null; 
  imagenes: string[] = [];
  currentIndex: number = 0;
   get codigo(){
    return this.formUser?.get('codigo') as FormControl;
  }

  get nombre_producto() {
    return this.formUser?.get('nombre_producto') as FormControl;
  }

  get descripcion_producto() {
    return this.formUser?.get('descripcion_producto') as FormControl;
  }

  get precio() {
    return this.formUser?.get('precio') as FormControl;
  }

get cantidad(){
  return this.formUser?.get('cantidad') as FormControl;
}



  constructor( 
    public ProductosService: ProductosService,
    public MarcasService: MarcasService,
    public ApirestService: ApirestService,
    public CarritoService: CarritoService,
    public DetalleCarritoService: DetalleCarritoService,
    public ImagenesProductosService: ImagenesProductosService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router) { 
      this.formUser = new FormGroup({
        'nombre_producto': new FormControl('', Validators.required),
        'descripcion_producto': new FormControl('', Validators.required),
        'precio':  new FormControl('', Validators.required),

      });


    }
    ngOnInit(): void {
      this.route.paramMap.subscribe(params => { 
        const id_usuario_param = params.get('id_usuario');
        const codigo_id_param = params.get('codigo');
       
     
       
        if (id_usuario_param !== null) {
          this.id_usuario = +id_usuario_param; // Convertir a número
        }
        if (codigo_id_param !== null) {
          this.codigo_id = +codigo_id_param; // Convertir a número

          this.seleccionarproducto(this.codigo_id);
          this.ImagenesProductosService.getImagenesByCodigo(+codigo_id_param).subscribe(
            (data: any) => {
              this.imagenes = data.map((item: any) => item.url);
            },
            (error: any) => {
              console.error('Error al obtener las imágenes:', error);
            }
          );

        } else {
          console.error('codigo_id es null');
        }

        if (this.id_usuario && this.codigo_id) {
          this.obtenerDetalleCarrito(this.id_usuario, this.codigo_id);
        }
      });
      
      this.obtenerUltimoIdCarrito();
      this.obtenerUltimoIdDetalle();

      this.validarEstado(1033759057);

      this.obtenerIdCarrito();

    }

    obtenerIdCarrito(): void {
      if (this.id_usuario !== null) {
        this.CarritoService.obtenerIdCarrito(this.id_usuario).subscribe(
          (response: any) => {
          
            this.idCarrito = response.id_carrito;
          },
          (error: any) => {
          
          }
        );
      } else {
       
      }
    }

    prev() {
      this.currentIndex = (this.currentIndex > 0) ? this.currentIndex - 1 : this.imagenes.length - 1;
      // Lógica para ir al elemento anterior del carrusel
    }
  
    // Define el método next
    next() {
      this.currentIndex = (this.currentIndex < this.imagenes.length - 1) ? this.currentIndex + 1 : 0;
      // Lógica para ir al siguiente elemento del carrusel
    }

    obtenerUltimoIdDetalle(): void {
    
      this.DetalleCarritoService.obtenerUltimoId().subscribe(
        (response: any) => {
        
          this.ultimoIdDetalle = response.ultimo_id_det;
        },
        (error: any) => {
          console.error('Error al obtener el último ID de detalle carrito:', error);
        }
      );
    }

    obtenerUltimoIdCarrito(): void {
      this.CarritoService.obtenerUltimoId().subscribe(
        (response: any) => {
          
          this.ultimoIdCarrito = response.ultimo_id;
        },
        (error: any) => {
          console.error('Error al obtener el último ID de carrito:', error);
        }
      );
    }


    obtenerDetalleCarrito(id_usuario: number, codigo_id: number): void {
      this.DetalleCarritoService.getDetalleCarritoPorIds(id_usuario, codigo_id).subscribe(
        (response: any) => {
          if (Object.keys(response).length === 0) {
            this.isProcedenteInsertar = true;
          } else {
            this.isProcedenteInsertar = false;
          }
        },
        (error: any) => {
          console.error('Error al obtener detalle de carrito por IDs:', error);
        }
      );
    }

        // Valida estado del carrito 

      validarEstado(idUsuario: number | null): void {
        if (idUsuario !== null) {
          this.CarritoService.validaEstado(idUsuario).subscribe(
            (response: any) => {
              if (response.mensaje === "Es procedente insertar carrito") {
                this.isProcedenteInsertar = false;
                // this.anadirAlCarrito();
                // this. addDetalleCarrito();

              } else {
                this.isProcedenteInsertar = false;
                // this. addDetalleCarrito();
                // Aquí puedes manejar la lógica si la respuesta no es la esperada
              }
            },
            (error: any) => {
              console.error('Error al validar estado del carrito:', error);
              this.isProcedenteInsertar = null;
              // Manejo de errores si es necesario
            }
          );
        } else {
          console.error('El ID de usuario es nulo.');
          this.isProcedenteInsertar = null;
          // Manejo de casos donde el ID de usuario es nulo
        }
      }

      // addCarrito(): void {
        // const nuevoCarrito = {
          // id_carrito: this.ultimoIdCarrito + 1,
        //   id_usuario: this.id_usuario, // Asume que id_usuario ya está definido
        //   estado_carrito: 1 // Estado predeterminado
        // };
      
        // }
        
        
        
        //Trae los productos con el codigo que trae en la ruta
        insersiones(): void {
          let idCarritoFinal: number;
          idCarritoFinal = 0;
         
          if (this.idCarrito === 0) {
          
            if (this.ultimoIdCarrito !== undefined) {
              idCarritoFinal = this.ultimoIdCarrito;
            } else {
              console.error('Error: el último ID del carrito es undefined.');
              return; // Salir si no se puede obtener el ID del carrito
            }
            const nuevoCarrito = {
              id_carrito: this.ultimoIdCarrito ,
              id_usuario: this.id_usuario, // Asume que id_usuario ya está definido
              estado_carrito: 1 // Estado predeterminado
            }
            this.CarritoService.addcarrito(nuevoCarrito).subscribe(
              response => {
             
             
               
              },
              error => {
                console.error('Error al agregar carrito:', error);
              }
            );
            
          }else{
            if ( this.idCarrito != null){
              idCarritoFinal = this.idCarrito;

            }
          }
          


  
      if (this.producto && this.producto.precio && this.cantidad2) {
        this.totalProducto = this.producto.precio * this.cantidad2;
    
  
        if (this.ultimoIdDetalle !== undefined && this.idCarrito !== null && this.codigo_id !== null && this.totalProducto !== null) {
          const nuevoDetalleCarrito = {
            id_detalle: this.ultimoIdDetalle,
            id_carrito: idCarritoFinal,
            id_producto: this.codigo_id,
            cantidad: this.cantidad2,
            total_productos: this.totalProducto
          };
  
          this.DetalleCarritoService.adddetalleCarrito(nuevoDetalleCarrito).subscribe(
            response => {
           
            },
            error => {
              console.error('Error al agregar detalle del carrito:', error);
            }
          );
        } else {
          console.error('Error: faltan datos para insertar en detalle carrito.');
        }
      } else {
        console.error('Error al calcular el total del producto: precio o cantidad2 no está definido.');
      }
    }

  editarCantidad(){

  }
  seleccionarproducto(codigo_id: number) {
    this.ProductosService.unicoProductos(codigo_id).subscribe(
      result => {
       
        this.producto = result;
        this.formUser = new FormGroup({
          codigo: new FormControl('', Validators.required),
          nombre_producto: new FormControl('', Validators.required),
          descripcion_producto: new FormControl('', Validators.required),
          precio: new FormControl('', Validators.required),
          nombre_marca: new FormControl('', Validators.required),
          nombre_categoria: new FormControl('', Validators.required)
        });
      },
      error => {
        console.error("Error al obtener la categoría:", error);
      }
    )
  }



  //Obtiene el ultimo ID del carrito




}
