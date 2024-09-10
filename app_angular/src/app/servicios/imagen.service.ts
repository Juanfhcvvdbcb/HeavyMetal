import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {

  private apiUrl = 'http://localhost:8000/upload-image/';  // URL de tu endpoint Django

  constructor(private http: HttpClient) { }

  uploadImage(imageFiles: File[]): Observable<any> {
    const formData = new FormData();
    imageFiles.forEach((file) => {
        formData.append('image', file, file.name);
    });

    // Log the formData content
    formData.forEach((value, key) => {
        console.log(key + ': ' + value);
    });

    return this.http.post(this.apiUrl, formData);
}
}