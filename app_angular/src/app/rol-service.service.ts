import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolServiceService {

  constructor(private http: HttpClient) { }
  url="http://127.0.0.1:8000/api_drf/v1Rol/";
  get_Roles()
  {
    return this.http.get(this.url)
  }
  addRoles(result: any) {
    return this.http.post(this.url,result);
  }
  deleteRoles(id:any) {
    return this.http.delete(this.url+id+"/");
  }
  unicoRoles(id: any): Observable<any> {
    return this.http.get(this.url + id + "/");
  }
  updateRoles(id:any,form: any) {​
    return this.http.put(this.url+ id + "/", form);​
  }
}
