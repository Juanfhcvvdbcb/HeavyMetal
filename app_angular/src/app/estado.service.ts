import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  constructor(private http: HttpClient) { }

  url="http://127.0.0.1:8000/api_drf/v1Estado/";

  get_Estados()
  {
    return this.http.get(this.url)
  }
  addEstados(result: any) {
    return this.http.post(this.url,result);
  }
  deleteEstados(id:any) {
    return this.http.delete(this.url+id+"/");
  }
  unicoEstados(id: any): Observable<any> {
    return this.http.get(this.url + id + "/");
  }
  updateEstados(id:any,form: any) {​
    return this.http.put(this.url+ id + "/", form);​
  }
}
