import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TipoIdentificacionService {

  constructor(private http: HttpClient) { }

  url="http://127.0.0.1:8000/api_drf/v1TipoIdentificacion/";

  get_tipo_identifica()
  {
    return this.http.get(this.url)
  }
  addtipo_identifica(result: any) {
    return this.http.post(this.url,result);
  }
  deletetipo_identifica(id:any) {
    return this.http.delete(this.url+id+"/");
  }
  unicotipo_identifica(id: any): Observable<any> {
    return this.http.get(this.url + id + "/");
  }
  updatetipo_identifica(id:any,form: any) {​
    return this.http.put(this.url+ id + "/", form);​
  }

}
