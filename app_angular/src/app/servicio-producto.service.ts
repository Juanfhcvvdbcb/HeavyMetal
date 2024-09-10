import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ServicioProductoService {

  constructor(private http: HttpClient) { }

  url_ServicioProducto = "http://127.0.0.1:8000/api_drf/v1Productos/";




  get_ServicioProducto(){
    return this.http.get(this.url_ServicioProducto)
  }
  addServicioProducto(result: any) {
    return this.http.post(this.url_ServicioProducto,result);
  }
  deleteServicioProducto(id:any) {
    return this.http.delete(this.url_ServicioProducto+id+"/");
  }
  unicoServicioProducto(id: any): Observable<any> {
    return this.http.get(this.url_ServicioProducto + id + "/");
  }
  updateServicioProducto(id:any,form: any) {​
    return this.http.put(this.url_ServicioProducto+ id + "/", form);​
  }
}
