import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    fileInput: FormData
  ) {
    return this.httpClient.post(this.URL + 'api/Participante/generateFile/?cedula=' + participante.cedula,
    fileInput,
    {
      responseType: 'arraybuffer'
    });
  }
}
