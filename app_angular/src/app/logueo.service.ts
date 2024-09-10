import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthResponse } from './auth-interfaces';


@Injectable({
 providedIn: 'root'
})
export class LogueoService {

 constructor(private http: HttpClient) { }
 url = 'http://127.0.0.1:8000/loginView/';

 get_loggin(usuario: string, password: string): Observable<AuthResponse> {
   return this.http.get<AuthResponse>(`${this.url}${usuario}/${password}`);
 }
}
