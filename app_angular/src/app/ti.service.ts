import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TIService {

  constructor(private http: HttpClient) { }
  url="http://127.0.0.1:8000/api_drf/v1TipoIdentificacion/";
  get_TIs()
  {
    return this.http.get(this.url)
  }
  addTIs(result: any) {
    return this.http.post(this.url,result);
  }
  deleteTIs(id:any) {
    return this.http.delete(this.url+id+"/");
  }
  unicoTIs(id: any): Observable<any> {
    return this.http.get(this.url + id + "/");
  }
  updateTIs(id:any,form: any) {​
    return this.http.put(this.url+ id + "/", form);​
  }
}
