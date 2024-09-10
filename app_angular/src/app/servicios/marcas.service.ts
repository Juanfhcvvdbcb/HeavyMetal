import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarcasService {
  constructor(private http: HttpClient) { }

  url="http://127.0.0.1:8000/api_drf/v1Marcas/";

  get_Marcas()
  {
    return this.http.get(this.url)
  }
  addMarcas(result: any) {
    return this.http.post(this.url,result);
  }
  deleteMarcas(id:any) {
    return this.http.delete(this.url+id+"/");
  }
  unicoMarcas(id: any): Observable<any> {
    return this.http.get(this.url + id + "/");
  }
  updateMarcas(id:any,form: any) {​
    return this.http.put(this.url+ id + "/", form);​
  }
}
