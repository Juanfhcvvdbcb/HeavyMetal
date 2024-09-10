import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CiudadesService {

  
  constructor(private http: HttpClient) { }

  url="http://127.0.0.1:8000/api_drf/v1Ciudades/";

  get_ciudad()
  {
    return this.http.get(this.url)
  }
  addciudad(result: any) {
    return this.http.post(this.url,result);
  }
  deleteciudad(id:any) {
    return this.http.delete(this.url+id+"/");
  }
  unicociudad(id: any): Observable<any> {
    return this.http.get(this.url + id + "/");
  }
  updateciudad(id:any,form: any) {​
    return this.http.put(this.url+ id + "/", form);​
  }
}
