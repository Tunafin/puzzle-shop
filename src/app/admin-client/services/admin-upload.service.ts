import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminUploadService {

  readonly baseUploadURL = `${environment.baseURL}/v2/api/${environment.apiPath}/admin`;

  constructor(private http: HttpClient) { }

  uploadImage(file: File) {
    const url = this.baseUploadURL + '/upload';
    const formData = new FormData();
    formData.append('file-to-upload', file);

    return this.http.post<any>(url, formData).pipe(map(res => res.imageUrl));
  }
}
