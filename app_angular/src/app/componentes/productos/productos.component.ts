  import { Component, OnInit } from '@angular/core';
  import { ProductosService } from 'app/servicios/productos.service';
  import { CommonModule } from '@angular/common';
  import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
  import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormArray, FormBuilder } from '@angular/forms';
  import { AppRoutingModule } from 'app/app-routing.module';
  import { MarcasService } from 'app/servicios/marcas.service';
  import { ApirestService } from 'app/servicios/apirest.service';
  import { ImagenesProductosService } from 'app/servicios/imagenes-productos.service';
  import { faPlus, faMagnifyingGlass, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
  import { ImagenService } from 'app/servicios/imagen.service';



  @Component({
    selector: 'app-productos',
    standalone: true,
    imports: [CommonModule, HttpClientModule, ReactiveFormsModule, AppRoutingModule],
    providers: [ProductosService, MarcasService, ApirestService
    ],
    templateUrl: './productos.component.html',
    styleUrl: './productos.component.scss'
  })
  export class ProductosComponent implements OnInit {
    formUser: FormGroup;

    get codigo() { return this.formUser.get('codigo') as FormControl; }
    get nombre_producto() { return this.formUser.get('nombre_producto') as FormControl; }
    get stock() { return this.formUser.get('stock') as FormControl; }
    get descripcion_producto() { return this.formUser.get('descripcion_producto') as FormControl; }
    get precio() { return this.formUser.get('precio') as FormControl; }
    get marca() { return this.formUser.get('marca') as FormControl; }
    get categoria() { return this.formUser.get('categoria') as FormControl; }
    get imagenes() { return this.formUser.get('imagenes') as FormArray; }

    constructor(public ProductosService: ProductosService, 
      private fb: FormBuilder,
      public MarcasService: MarcasService,
      public ApirestService: ApirestService,
      private http: HttpClient,
      public ImagenesProductosService: ImagenesProductosService,
      public ImagenService: ImagenService
    ) {
      this.formUser = this.fb.group({
        codigo: ['', Validators.required],
        nombre_producto: ['', Validators.required],
        stock: ['', Validators.required],
        descripcion_producto: ['', Validators.required],
        precio: ['', Validators.required],
        marca: ['', Validators.required],
        categoria: ['', Validators.required],

        
        imagenes: this.fb.array([this.createImageControl(), this.createImageControl(), this.createImageControl(), this.createImageControl()]),
      });
    }
    productoSeleccionada: any;
    productos: any[] = [];
    Marcas: any[] = [];
    categorias: any[] = [];
    images: any[] = [];
    showModal: boolean = false;
    faPlus = faPlus; // Declarar los iconos
    faMagnifyingGlass = faMagnifyingGlass;
    faPenToSquare = faPenToSquare;
    faTrash = faTrash;
    
    ngOnInit(): void {
      this.obtener_productos();
      this.obtener_Marcas();
      this.obtener_categorias();


    // Verificar errores en cada control
    for (const controlName in this.formUser.controls) {
      const control = this.formUser.get(controlName);

    }
    }

    createImageControl(): FormControl {
      return this.fb.control(null);
    }



    addImageField() {
      if (this.imagenes.length < 4) { // Limita el número de imágenes a 4
        this.imagenes.push(this.fb.group({
          file: [null] // Campo para el archivo
        }));
      }
    }

    removeImage(index: number) {
      this.imagenes.removeAt(index);
    }





    obtener_productos() {
      this.ProductosService.get_Productos()
        .subscribe((result: any) => { this.productos = result; });
    }

    obtener_Marcas() {
      this.MarcasService.get_Marcas()
        .subscribe((result: any) => { this.Marcas = result; });
    }
    
    obtener_categorias() {
      this.ApirestService.get_categorias()
        .subscribe((result: any) => { this.categorias = result; });
    }
    delete_producto(id: any) {
      this.ProductosService.deleteProductos(id).subscribe(
        result => {
          alert("Borrado Exitoso");
          this.obtener_productos();
        }
      )
    };

    addproductos() {

  
      if (this.formUser.invalid) {
        return;
      } 
      const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
      
      const body = {
        codigo: this.formUser.value.codigo,
        nombre_producto: this.formUser.value.nombre_producto,
        stock: this.formUser.value.stock,
        descripcion_producto: this.formUser.value.descripcion_producto,
        precio: this.formUser.value.precio,
        marca: parseInt(this.formUser.value.marca, 10), // Enviar como número entero
        categoria: parseInt(this.formUser.value.categoria, 10) // Enviar como número entero
      };

      this.ProductosService.addProductos(body).subscribe(
        result => {
          this.obtener_productos();
          this.obtener_Marcas();
          this.obtener_categorias();
          this.showImageModal(); 
        },
        error => {
          alert(`Error al guardar el producto: ${error.message}`);
        }
      );
  }
  addImage() {
    // Obtener las referencias a los elementos de entrada de archivo
    const imageInputs = [
      document.getElementById('imageUpload[0]') as HTMLInputElement,
      document.getElementById('imageUpload[1]') as HTMLInputElement,
      document.getElementById('imageUpload[2]') as HTMLInputElement,
      document.getElementById('imageUpload[3]') as HTMLInputElement
    ];
    // Verificar que los elementos de entrada de archivo existan
    if (imageInputs.some(input => input === null)) {
      console.error('Uno o más elementos de entrada de archivo no se encontraron.');
      return;
    }

    // Lista para almacenar las copias de las imágenes
    const imageCopies: File[] = [];

    // Leer los archivos seleccionados de cada entrada
    imageInputs.forEach(input => {
      if (input.files) {
        for (let i = 0; i < input.files.length; i++) {
          const file = input.files[i];
          // Crear una copia del archivo
          const fileCopy = new File([file], file.name, { type: file.type });
          // Guardar la copia en la lista
          imageCopies.push(fileCopy);
        }
      }
    });



    // Enviar las copias de las imágenes al servidor
    this.ImagenService.uploadImage(imageCopies).subscribe(
      (response: any) => {
        // this.AddImagenesDB(response);
  
      },
      (error: any) => {
        console.error('Error del servidor:', error);
      }
    );
    this.AddImagenesDB();
  }

  AddImagenesDB() {
    // Obtener el código del producto desde el formulario
    const codigoProducto = (document.getElementById('codigo') as HTMLInputElement).value;

    // Verificar que el código del producto no esté vacío
    if (!codigoProducto) {
        console.error('El código del producto no se encontró.');
        return;
    }

    // Capturar los elementos de entrada de archivo
    const imageInputs = [
        document.getElementById('imageUpload[0]') as HTMLInputElement,
        document.getElementById('imageUpload[1]') as HTMLInputElement,
        document.getElementById('imageUpload[2]') as HTMLInputElement,
        document.getElementById('imageUpload[3]') as HTMLInputElement
    ];

    // Obtener los nombres de los archivos de las imágenes
    const fileNames = imageInputs
      .filter(input => input && input.files && input.files.length > 0)
      .map(input => input.files ? input.files[0].name : '');

    // Verificar que se hayan seleccionado archivos
    if (fileNames.length === 0) {
        console.error('No se seleccionaron archivos de imagen.');
        return;
    }

    // Construir las URLs completas de las imágenes basándose en la ruta relativa al servidor web
    const basePath = 'http://127.0.0.1:8000/media/productos/';
    const imageUrls = fileNames.map(fileName => `${basePath}${fileName}`);

    // Enviar una solicitud a la API para guardar cada una de las imágenes
    imageUrls.forEach((url: string) => {
        const imagenData = {
            url: url,
            id_producto: codigoProducto
        };

        this.ImagenesProductosService.addImagenesProducto(imagenData).subscribe(
            (result: any) => {
            },
            (error: any) => {
                console.error('Error al guardar la imagen:', error);
            }
        );
    });
    this.closeModalImages() ;
}

  showImageModal(){
    const modal = document.getElementById('imageModal');
    if (modal) {
      modal.classList.add('show');
    }
  }
  closeModalImages() {
    const modal = document.getElementById('imageModal');
    if (modal) {
      modal.classList.remove('show');
    }
  }
  uploadImages(productId: number) {
    const imagenesArray = this.formUser.value.imagenes;
    imagenesArray.forEach((imagen: any) => {
      if (imagen.file) {
        const imagenData = {
          id_producto: productId,
          url: imagen.file // La URL de la imagen debe ser procesada y subida previamente
        };
        
        this.ImagenesProductosService.addImagenesProducto(imagenData).subscribe((result: any) => {

        });
      }
    });
  }

  openModal() {
    this.showModal = true;
    this.updateModalVisibility();
  }

  closeModal(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.showModal = false;
    this.updateModalVisibility();
  }

  private updateModalVisibility() {
    const modalElement = document.getElementById('modal');
    if (modalElement) {
      if (this.showModal) {
        modalElement.classList.add('show');
      } else {
        modalElement.classList.remove('show');
      }
    }
  
  }
    
  }
