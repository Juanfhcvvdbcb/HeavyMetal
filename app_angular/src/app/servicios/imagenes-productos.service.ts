import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImagenesProductosService {

  constructor(private http: HttpClient) { }

  url="http://127.0.0.1:8000/api_drf/v1ImagenesProducto/";

  get_ImagenesProducto() {
    return this.http.get(this.url);
  }

  addImagenesProducto(result: any): Observable<any> {
    return this.http.post(this.url, result).pipe(
      tap(response => {
      }),
      catchError(error => {
        console.error('Error de la API:', error);
        return throwError(error);
      })
    );
  }

  deleteImagenesProducto(id: any) {
    return this.http.delete(this.url + id + "/");
  }

  unicoImagenesProducto(id: any): Observable<any> {
    return this.http.get(this.url + id + "/");
  }

  updateImagenesProducto(id: any, form: any) {
    return this.http.put(this.url + id + "/", form);
  }

  getImagenesByCodigo(id_producto: Number): Observable<any> {
    console.log(`Enviando solicitud para obtener imágenes con id_producto: ${id_producto}`);
    return this.http.get(`${this.url}?id_producto=${id_producto}`);
  }
}