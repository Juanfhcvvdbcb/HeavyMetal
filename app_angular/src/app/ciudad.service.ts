import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CiudadService {

  constructor(private http: HttpClient) { }

  url="http://127.0.0.1:8000/api_drf/v1Ciudades/";

  get_Ciudades()
  {
    return this.http.get(this.url)
  }
  addCiudades(result: any) {
    return this.http.post(this.url,result);
  }
  deleteCiudades(id:any) {
    return this.http.delete(this.url+id+"/");
  }
  unicoCiudades(id: any): Observable<any> {
    return this.http.get(this.url + id + "/");
  }
  updateCiudades(id:any,form: any) {​
    return this.http.put(this.url+ id + "/", form);​
  }
}
