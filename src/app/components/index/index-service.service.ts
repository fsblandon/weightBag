import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Participante } from 'src/app/models/participante';

@Injectable({
  providedIn: 'root'
})
export class IndexServiceService {

  URL = 'https://localhost:5001/';

  constructor(
    private httpClient: HttpClient
  ) {}

  postData(
    participante: Participante,
    fileInput: any
  ): Observable<any> {
    const headers = new HttpHeaders('Access-Control-Allow-Methods", "GET, POST, DELETE, PUT');
    participante.fecha_exec = new Date();
    /* const formData: FormData = new FormData();
    formData.set('file', participante.archivo);
    console.log(formData); */
    return this.httpClient.post<any>(this.URL + 'api/Participante/generateFile', {
      cedula : participante.cedula,
      fecha_exec : participante.fecha_exec,
      file : fileInput
    },
    {
      reportProgress : true,
      headers: headers,
      responseType: 'blob' as 'json'
    }
    );
  }
}
