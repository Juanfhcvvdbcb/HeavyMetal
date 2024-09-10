import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'; // Import HttpParams
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DetalleCarritoService {

  constructor(private http: HttpClient) { }

  url="http://127.0.0.1:8000/api_drf/v1DetalleCarrito/";

  obtenerSumaTotalProductos(idCarrito: number, userId: number): Observable<any> {
    const params = new HttpParams()
      .set('idCarrito', idCarrito.toString())
      .set('userId', userId.toString());

    return this.http.get<any>(`${this.url}suma-total-productos/`, { params }).pipe(
      tap((response: any) => {
        console.log('Respuesta de suma total de productos:', response);
      }),
      catchError((error) => {
        console.error('Error al obtener la suma total de productos:', error);
        return throwError(error); // Propagar el error para que lo maneje el componente que llama a este servicio
      })
    );
  }

  get_detalleCarrito(): Observable<any> {
    return this.http.get(this.url).pipe(
      tap((data) => {
      }),
      catchError((error) => {
        console.error('Error al obtener detalle de carrito:', error);
        return throwError(error); // Propagar el error para que lo maneje el componente que llama a este servicio
      })
    );
  }

  obtenerUltimoId(): Observable<any> {
    return this.http.get<any>(`${this.url}ultimo-id-carrito/`);
  }

  getDetalleCarritoPorIds(id_carrito: number, id_producto: number): Observable<any> {
      const urlDetalleCarrito = `${this.url}detalle-carrito/`;
      return this.http.get(urlDetalleCarrito, {
        params: {
          id_carrito: id_carrito.toString(),
          id_producto: id_producto.toString()
        }
      }).pipe(
        tap((response: any) => {
        }),
        catchError((error: any) => {
          alert('Error al obtener detalle de carrito por IDs:' + error.message);
          return throwError(error); // Propagar el error para que lo maneje el componente que llama a este servicio
        })
      );
  }

  adddetalleCarrito(result: any): Observable<any> {
    return this.http.post(this.url, result).pipe(
      tap((data) => {
      }),
      catchError((error) => {
        console.error('Error al agregar detalle del carrito:', error);
        return throwError(error); // Propagar el error para que lo maneje el componente que llama a este servicio
      })
    );
  }
  
  deletedetalleCarrito(id:any) {
    return this.http.delete(this.url+id+"/");
  }
  unicodetalleCarrito(id: any): Observable<any> {
    return this.http.get(this.url + id + "/");
  }
  updatedetalleCarrito(id:any,form: any) {​
    return this.http.put(this.url+ id + "/", form);​
  }



  verificaProducto(idCarrito: number, idProducto: number): Observable<any> {
    const urlVerificaProducto = `${this.url}verifica-producto/`;

    return this.http.get(urlVerificaProducto, {
      params: {
        id_carrito: idCarrito.toString(),
        id_producto: idProducto.toString()
      }
    }).pipe(
      tap((response: any) => {
      })
    );
  }
  updateCantidadDetalleCarrito(id_detalle: number, id_carrito: number, id_producto: number, nueva_cantidad: number): Observable<any> {
    const urlUpdateCantidad = `${this.url}update-cantidad/`;
    const body = {
      ID_Detalle: id_detalle,
      ID_Carrito: id_carrito,
      ID_Producto: id_producto,
      // Cantidad: nueva_cantidad;
    };
    return this.http.put(urlUpdateCantidad, body).pipe(
      tap((response: any) => {
      }),
      catchError((error) => {
        console.error('Error al actualizar la cantidad del detalle de carrito:', error);
        return throwError(error); // Propagar el error para que lo maneje el componente que llama a este servicio
      })
    );
  }

}
