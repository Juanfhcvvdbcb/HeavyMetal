import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  constructor(private http: HttpClient) { }

  url="http://127.0.0.1:8000/api_drf/v1CarritoCompras/";

  urlBuscarProductos = "http://127.0.0.1:8000/api_drf/v1CarritoCompras/buscar-productos/";

  get_carrito()
  {
    return this.http.get(this.url)
  }
  addcarrito(result: any) {
    return this.http.post(this.url,result);

  }
  deletecarrito(id:any) {
    return this.http.delete(this.url+id+"/");
  }
  unicocarrito(id: any): Observable<any> {
    return this.http.get(this.url + id + "/");
  }
  updatecarrito(id:any,form: any) {​
    return this.http.put(this.url+ id + "/", form);​
  }

  buscarProductos(id_usuario: number, id_carrito: number): Observable<any> {
    const params = new HttpParams()
      .set('id_usuario', id_usuario.toString())
      .set('id_carrito', id_carrito.toString());

      return this.http.get<any>(this.urlBuscarProductos, { params });
  }

  obtenerUltimoId(): Observable<any> {
    return this.http.get<any>(`${this.url}ultimo-id/`);
  }

  validaEstado(idUsuario: number): Observable<any> {
    const urlValidaEstado = `${this.url}valida-estado/`;
    
    return this.http.get(urlValidaEstado, {
      params: {
        id_usuario: idUsuario.toString()
      }
    }).pipe(
      tap(response => {
      })
    );
  }

  obtenerIdCarrito(idUsuario: number): Observable<{ id_carrito: number }> {
    const urlIdCarrito = `${this.url}id-carrito/`;
    
    return this.http.get<{ id_carrito: number }>(urlIdCarrito, {
      params: {
        id_usuario: idUsuario.toString()
      }
    }).pipe(
      tap(response => {
      })
    );
  }
  getProductosCarrito(carritoId: number): Observable<any> {
    const url = `${this.url}${carritoId}/carrito-usuario/`;
    
    return this.http.get(url).pipe(
      tap(
        data => console.log('Datos recibidos del carrito:', data),
        error => alert('Error al obtener productos del carrito: ' + (error as any).message)
      )
    );
  }

}
