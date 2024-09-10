import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  constructor(private http: HttpClient) { }

  url="http://127.0.0.1:8000/api_drf/v1Departamentos/";

  get_Departamentos()
  {
    return this.http.get(this.url)
  }
  addDepartamentos(result: any) {
    return this.http.post(this.url,result);
  }
  deleteDepartamentos(id:any) {
    return this.http.delete(this.url+id+"/");
  }
  unicoDepartamentos(id: any): Observable<any> {
    return this.http.get(this.url + id + "/");
  }
  updateDepartamentos(id:any,form: any) {​
    return this.http.put(this.url+ id + "/", form);​
  }
}
