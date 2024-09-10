import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ServicioMarcasService {

  constructor(private http: HttpClient) { }

  url_marcas = "http://127.0.0.1:8000/api_drf/v1Marcas/";




  get_marcas(){
    return this.http.get(this.url_marcas)
  }
  addmarcas(result: any) {
    return this.http.post(this.url_marcas,result);
  }
  deletemarcas(id:any) {
    return this.http.delete(this.url_marcas+id+"/");
  }
  unicoMarcas(id: any): Observable<any> {
    return this.http.get(this.url_marcas + id + "/");
  }
  updateMarcas(id:any,form: any) {​
    return this.http.put(this.url_marcas+ id + "/", form);​
  }
}
