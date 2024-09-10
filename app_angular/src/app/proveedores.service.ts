import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProveedoresService  {
  constructor(private http: HttpClient) { }
  url="http://127.0.0.1:8000/api_drf/v1Proveedores/";
  get_Proveedores()
  {
    return this.http.get(this.url)
  }
  addProveedores (result: any) {
    return this.http.post(this.url,result);
  }
  deleteProveedores (id:any) {
    return this.http.delete(this.url+id+"/");
  }
  unicoProveedores (id: any): Observable<any> {
    return this.http.get(this.url + id + "/");
  }
  updateProveedores (id:any,form: any) {​
    return this.http.put(this.url+ id + "/", form);​
  }
}
