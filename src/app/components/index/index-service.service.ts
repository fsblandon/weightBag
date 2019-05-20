import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Participante } from 'src/app/models/participante';


@Injectable({
  providedIn: 'root'
})
export class IndexServiceService {

  URL = 'https://localhost:5001';

  constructor(
    private httpClient: HttpClient
  ) {}

  postData(
    participante: Participante
  ): Observable<any> {
    const now = new Date();
    const formData: FormData = new FormData();
    formData.set('file', participante.archivo);
    console.log(formData);
    return this.httpClient.post<any>(this.URL + '/api/GenerateFile', {
      cedula : participante.cedula,
      fecha_exec : now,
      file : formData
    }, {
      reportProgress : true
    });
  }
}
