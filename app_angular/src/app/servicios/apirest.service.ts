import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApirestService {

  constructor(private http: HttpClient) { }

  url="http://127.0.0.1:8000/api_drf/v1Categorias/";

  get_categorias()
  {
    return this.http.get(this.url)
  }
  addcategorias(result: any) {
    return this.http.post(this.url,result);
  }
  deletecategorias(id:any) {
    return this.http.delete(this.url+id+"/");
  }
  unicoCategorias(id: any): Observable<any> {
    return this.http.get(this.url + id + "/");
  }
  updateCategorias(id:any,form: any) {​
    return this.http.put(this.url+ id + "/", form);​
  }




}
