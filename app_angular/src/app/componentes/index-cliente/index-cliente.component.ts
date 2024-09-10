    import { Component, OnInit } from '@angular/core';
    import { CommonModule } from '@angular/common';
    import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
    import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
    import { AppRoutingModule } from 'app/app-routing.module';
    import { UsuariosService } from 'app/servicios/usuarios.service';
    import { ActivatedRoute, Router } from '@angular/router'
    import { ProductosService } from 'app/servicios/productos.service';
    import { SharedService } from 'app/servicios/shared.service';
    import { MarcasService } from 'app/servicios/marcas.service';
    import { ApirestService } from 'app/servicios/apirest.service';
    import { ImagenesProductosService } from 'app/servicios/imagenes-productos.service';

    // import { HeaderComponent } from 'app/header/header.component';


    @Component({
      selector: 'app-index-cliente',
      standalone: true,
      imports: [CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        AppRoutingModule,
        FormsModule,

      ],
      templateUrl: './index-cliente.component.html',
      styleUrl: './index-cliente.component.scss'
    })
    export class IndexClienteComponent implements OnInit  {
      formUser: FormGroup;

      productos: any[] = [];
      categorias: any[] = [];
      marcas: any[] = [];
      userId: string | null = null;
      searchTerm: string = '';
      precioMenor: number = 0;
      precioMayor: number = 1000;
      selectedCategory: number = 0;
      selectedBrand: number = 0;

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

      constructor( 
        public ProductosService: ProductosService,
        private route: ActivatedRoute,
        private http: HttpClient,
        private SharedService: SharedService,
        private router: Router,
        private ImagenesProductosService: ImagenesProductosService,
       private MarcasService: MarcasService,
       private CategoriasService: ApirestService) { 
          this.formUser = new FormGroup({
          'nombre_producto': new FormControl('', Validators.required),
          'descripcion_producto': new FormControl('', Validators.required),
          'precio':  new FormControl('', Validators.required),
        });
        }

        ngOnInit(): void {
          this.route.paramMap.subscribe(params => {
            this.userId = params.get('id');
          });
      
          this.getmarcas();
          this.getCategorias();
          this.SharedService.getSearchTerm().subscribe(term => {
            this.searchTerm = term;
            if (this.searchTerm.trim()) {
              this.ProductosService.buscarPorNombre(this.searchTerm).subscribe(response => {
                this.productos = response;
                this.loadProductImages();
              });
            } else {
              this.SharedService.getFilterParams().subscribe(params => {
                if (params.precioMenor !== 0 || params.precioMayor !== 1000 || params.selectedCategory !== 0 || params.selectedBrand !== 0) {
                  this.ProductosService.buscarPorFiltros(params.precioMenor, params.precioMayor, params.selectedCategory, params.selectedBrand).subscribe(response => {
                    this.productos = response;
                    this.loadProductImages();
                  });
                } else {
                  this.obtener_productos();
                }
              });
            }
          });
        }
        
        getCategorias(){
          this.CategoriasService.get_categorias()
      .subscribe((result: any) => { this.categorias = result; });
        }

        getmarcas(){
          this.MarcasService.get_Marcas()
          .subscribe((result: any) => { this.marcas = result; });
        }
      
      obtener_productos() {
        this.ProductosService.get_Productos()
          .subscribe((result: any) => { this.productos = result; });
          this.loadProductImages();
      }

      onSubmit(codigo: string) {
        // Navegar a la ruta con el id del producto
        this.router.navigate(['/producto_detalle', this.userId, codigo]);
      }

      loadProductImages() {
        this.productos.forEach(producto => {
          this.ImagenesProductosService.getImagenesByCodigo(producto.codigo).subscribe(imagenes => {
            producto.imagenes = imagenes;
          });
        });
      }
    

      FiltroProductos() {
        const filterParams = {
          precioMenor: this.precioMenor,
          precioMayor: this.precioMayor,
          selectedCategory: this.selectedCategory,
          selectedBrand: this.selectedBrand
        };
     
        this.ProductosService.buscarPorFiltros(this.precioMenor, this.precioMayor, this.selectedCategory, this.selectedBrand)
          .subscribe(response => {
            this.productos = response;
            this.SharedService.setFilterParams(filterParams);
          });
      }
    }
