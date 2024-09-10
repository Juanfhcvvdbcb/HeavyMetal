import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { Observable, BehaviorSubject  } from 'rxjs';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  constructor(private http: HttpClient) { }
  url="http://127.0.0.1:8000/api_drf/v1Productos/";
  private productosSubject = new BehaviorSubject<any[]>([]);
  get_Productos()
  {
    return this.http.get(this.url)
  }
  addProductos(body: any): Observable<any> {
  
    return this.http.post(this.url, body).pipe(
      tap(response => {
      })
    );
  }
  deleteProductos(id:any) {
    return this.http.delete(this.url+id+"/");
  }
  unicoProductos(id: any): Observable<any> {
    return this.http.get(this.url + id + "/");
  }
  updateProductos(id:any,form: any) {​
    return this.http.put(this.url+ id + "/", form);​
  }

  buscarPorNombre(nombre: string): Observable<any> {
    const endpoint = `${this.url}busq-filtro-prod/`;
    return this.http.get(endpoint, { params: { nombre } });
  }

  setProductos(productos: any[]): void {
    this.productosSubject.next(productos);
  }

  getProductos(): Observable<any[]> {
    return this.productosSubject.asObservable();
  }

  buscarPorFiltros(precioMenor?: number, precioMayor?: number, categoriaId?: number, marcaId?: number): Observable<any> {
    let params = new HttpParams();
    if (precioMenor) {
      params = params.append('precio_menor', precioMenor.toString());
    }
    if (precioMayor) {
      params = params.append('precio_mayor', precioMayor.toString());
    }
    if (categoriaId && categoriaId !== 0) {
      params = params.append('categoria_id', categoriaId.toString());
    }
    if (marcaId && marcaId !== 0) {
      params = params.append('marca_id', marcaId.toString());
    }
    const endpoint = `${this.url}busq-filtro-prod/`;
    return this.http.get(endpoint, { params });
  }
 
}
