import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DomiciliosService {

  constructor(private http: HttpClient) { }

  url="http://127.0.0.1:8000/api_drf/v1Domicilios/"

  get_Domicilios()
  {
    return this.http.get(this.url)
  }
  addDomicilios(result: any) {
    return this.http.post(this.url,result);
  }
  deleteDomicilios(id:any) {
    return this.http.delete(this.url+id+"/");
  }
  unicoDomicilios(id: any): Observable<any> {
    return this.http.get(this.url + id + "/");
  }
  updateDomicilios(id:any,form: any) {​
    return this.http.put(this.url+ id + "/", form);​
  }

}
