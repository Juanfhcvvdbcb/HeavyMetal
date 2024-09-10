import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }

  url="http://127.0.0.1:8000/api_drf/v1Usuarios/";

  get_Usuarios()
  {
    return this.http.get(this.url)
  }
  addUsuarios(result: any) {
    return this.http.post(this.url,result);
  }
  deleteUsuarios(id:any) {
    return this.http.delete(this.url+id+"/");
  }
  unicoUsuarios(id: any): Observable<any> {
    return this.http.get(this.url + id + "/");
  }
  updateUsuarios(id:any,form: any) {​
    return this.http.put(this.url+ id + "/", form);​
  }

}
