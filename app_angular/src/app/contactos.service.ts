import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ContactosService  {
  constructor(private http: HttpClient) { }
  url="http://127.0.0.1:8000/api_drf/v1Contactos/";
  get_Contactos()
  {
    return this.http.get(this.url)
  }
  addContactos (result: any) {
    return this.http.post(this.url,result);
  }
  deleteContactos (id:any) {
    return this.http.delete(this.url+id+"/");
  }
  unicoContactos (id: any): Observable<any> {
    return this.http.get(this.url + id + "/");
  }
  updateContactos (id:any,form: any) {​
    return this.http.put(this.url+ id + "/", form);​
  }
}
