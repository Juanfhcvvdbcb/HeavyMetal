import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private loggedIn = false;
  private userId: number | null = null;
  private authenticated = new BehaviorSubject<boolean>(this.getAuthStateFromStorage());

  constructor(private http: HttpClient, private sharedService: SharedService) {}

  url = "http://127.0.0.1:8000/api_drf/v1Usuarios/";

  get_Usuarios(): Observable<any> {
    return this.http.get(this.url);
  }

  addUsuarios(result: any): Observable<any> {
    return this.http.post(this.url, result).pipe(
      tap(response => {
        console.log('Usuario añadido:', response);
      }),
      catchError(this.handleError)
    );
  }

  getUserId(): number | null {
    return this.userId;
  }

  setUserId(userId: number): void {
    this.userId = userId;
  }

  deleteUsuarios(id: any): Observable<any> {
    return this.http.delete(`${this.url}${id}/`).pipe(
      tap(response => {
        console.log('Usuario eliminado:', response);
      }),
      catchError(this.handleError)
    );
  }

  unicoUsuarios(id: any): Observable<any> {
    return this.http.get(`${this.url}${id}/`).pipe(
      tap(response => {
        console.log('Datos del usuario:', response);
      }),
      catchError(this.handleError)
    );
  }

  updateUsuarios(id: any, form: any): Observable<any> {
    return this.http.put(`${this.url}${id}/`, form).pipe(
      tap(response => {
        console.log('Usuario actualizado:', response);
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Actualiza la dirección y el teléfono del usuario.
   * @param id_usuario - El ID del usuario.
   * @param direccion - La nueva dirección del usuario.
   * @param telefono - El nuevo teléfono del usuario.
   * @returns Un Observable con la respuesta de la API.
   */
  updateUsuarioDomicilio(id_usuario: number, direccion: string, telefono: string): Observable<any> {
    const apiUrl = `${this.url}${id_usuario}/`;
    const form = { direccion, telefono };
    return this.http.put(apiUrl, form).pipe(
      tap((response: any) => {
        console.log('Usuario actualizado:', response);
      }),
      catchError((error: HttpErrorResponse) => {
        alert(`Error al actualizar la dirección y el teléfono del usuario: ${error.message}`);
        return throwError(error);
      })
    );
  }

  /**
   * Obtiene los datos del usuario desde la API.
   * @param identificacion - La identificación del usuario.
   * @returns Un Observable con los datos del usuario.
   */
  getUserData(identificacion: number): Observable<any> {
    const apiUrl = `${this.url}${identificacion}/`;
    return this.http.get(apiUrl).pipe(
      tap((userData: any) => {
        console.log('Datos del usuario:', userData);
      }),
      catchError((error: HttpErrorResponse) => {
        alert(`Error al obtener los datos del usuario: ${error.message}`);
        return throwError(error);
      })
    );
  }

  authenticateUser(id_usuario: number, Contraseña_Encriptada: string): Observable<any> {
    const authUrl = `${this.url}authenticate/`;
    return this.http.post(authUrl, { id_usuario, Contraseña_Encriptada }).pipe(
      tap((response: any) => {
        if (response.detail === 'OK') {
          this.sharedService.setAuthenticated(true);
          this.sharedService.setUserId(id_usuario);
        }
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Código del error: ${error.status}\nMensaje: ${error.message}\nDetalle: ${JSON.stringify(error.error)}`;
    }
    return throwError(errorMessage);
  }

  setAuthenticated(isAuthenticated: boolean): void {
    this.authenticated.next(isAuthenticated);
    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
  }

  logout(): void {
    this.setAuthenticated(false);
    localStorage.removeItem('userId');
    localStorage.removeItem('isAuthenticated');
  }

  isAuthenticated(): boolean {
    return this.authenticated.value;
  }

  private getAuthStateFromStorage(): boolean {
    const storedState = localStorage.getItem('isAuthenticated');
    return storedState ? JSON.parse(storedState) : false;
  }
}