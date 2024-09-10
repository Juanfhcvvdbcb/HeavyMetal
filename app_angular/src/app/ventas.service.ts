import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class VentasService {

  constructor(private http: HttpClient) { }
  url="http://127.0.0.1:8000/api_drf/v1Ventas/";
  get_Ventas()
  {
    return this.http.get(this.url)
  }
  addVentas (result: any) {
    return this.http.post(this.url,result);
  }
  deleteVentas (id:any) {
    return this.http.delete(this.url+id+"/");
  }
  unicoVentas (id: any): Observable<any> {
    return this.http.get(this.url + id + "/");
  }
  updateVentas (id:any,form: any) {​
    return this.http.put(this.url+ id + "/", form);​
  }
}
