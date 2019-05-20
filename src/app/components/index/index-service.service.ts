import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Participante } from 'src/app/models/participante';


@Injectable({
  providedIn: 'root'
})
export class IndexServiceService {

  constructor(
    private httpClient: HttpClient,
    private headers: HttpHeaders
  ) { }

  postData(
    participante: Participante
  ): Observable<any> {
    const now = new Date();
    const formData = new FormData();
    formData.append(participante.archivo.name, participante.archivo);
    console.log(formData);
    return this.httpClient.post<any>('api/GenerateFile', {
      cedula : participante.cedula,
      fecha_exec : now,
      file : formData
    }, {
      reportProgress : true,
      headers: this.headers.append('Content-Type', 'multipart/form-data')
    });
  }
}
