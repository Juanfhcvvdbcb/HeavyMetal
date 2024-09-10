import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MediosPagoService {

  constructor(private http: HttpClient) { }

  url="http://127.0.0.1:8000/api_drf/v1medios_pago/";

  get_medios_pagos()
  {
    return this.http.get(this.url)
  }
  addmedios_pagos(result: any) {
    return this.http.post(this.url,result);
  }
  deletemedios_pagos(id:any) {
    return this.http.delete(this.url+id+"/");
  }
  unicomedios_pagos(id: any): Observable<any> {
    return this.http.get(this.url + id + "/");
  }
  updatemedios_pagos(id:any,form: any) {​
    return this.http.put(this.url+ id + "/", form);​
  }

}
