import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProveedoresProductoService  {
  constructor(private http: HttpClient) { }
  url="http://127.0.0.1:8000/api_drf/v1ProveedoresProductos/";
  get_ProveedoresProducto()
  {
    return this.http.get(this.url)
  }
  addProveedoresProducto (result: any) {
    return this.http.post(this.url,result);
  }
  deleteProveedoresProducto (id:any) {
    return this.http.delete(this.url+id+"/");
  }
  unicoProveedoresProducto (id: any): Observable<any> {
    return this.http.get(this.url + id + "/");
  }
  updateProveedoresProducto (id:any,form: any) {​
    return this.http.put(this.url+ id + "/", form);​
  }
}
