import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class Detalle_carritoService  {
  constructor(private http: HttpClient) { }
  url="http://127.0.0.1:8000/api_drf/v1DetalleCarrito/";
  get_Detalle_carrito()
  {
    return this.http.get(this.url)
  }
  addDetalle_carritoService (result: any) {
    return this.http.post(this.url,result);
  }
  deleteDetalle_carritoService (id:any) {
    return this.http.delete(this.url+id+"/");
  }
  unicoDetalle_carritoService (id: any): Observable<any> {
    return this.http.get(this.url + id + "/");
  }
  updateDetalle_carritoService (id:any,form: any) {​
    return this.http.put(this.url+ id + "/", form);​
  }
}
