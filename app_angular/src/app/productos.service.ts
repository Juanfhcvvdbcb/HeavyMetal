import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  constructor(private http: HttpClient) { }
  url="http://127.0.0.1:8000/api_drf/v1Productos/";
  get_Productos()
  {
    return this.http.get(this.url)
  }
  addProductos(result: any) {
    return this.http.post(this.url,result);
  }
  deleteProductos(id:any) {
    return this.http.delete(this.url+id+"/");
  }
  unicoProductos(id: any): Observable<any> {
    return this.http.get(this.url + id + "/");
  }
  updateProductos(id:any,form: any) {​
    return this.http.put(this.url+ id + "/", form);​
  }
}
