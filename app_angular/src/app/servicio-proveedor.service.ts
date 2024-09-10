import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ServicioProveedorService  {
  constructor(private http: HttpClient) { }
  url_proveedor="http://127.0.0.1:8000/api_drf/v1Proveedores/";
  get_ServicioProveedor()
  {
    return this.http.get(this.url_proveedor)
  }
  addServicioProveedor (result: any) {
    return this.http.post(this.url_proveedor,result);
  }
  deleteServicioProveedor (id:any) {
    return this.http.delete(this.url_proveedor+id+"/");
  }
  unicoServicioProveedor (id: any): Observable<any> {
    return this.http.get(this.url_proveedor + id + "/");
  }
  updateServicioProveedor (id:any,form: any) {​
    return this.http.put(this.url_proveedor+ id + "/", form);​
  }
}
