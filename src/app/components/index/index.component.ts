import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { IndexServiceService } from './index-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Participante } from 'src/app/models/participante';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  providers: [IndexServiceService]
})
export class IndexComponent implements OnInit {
  fileExist = true;
  fileN: string;

  participante: Participante = {
    cedula: null,
    archivo: null
  };

  dataForm = new FormGroup({
    cedula: new FormControl(),
    file: new FormControl()
  });

  constructor(
    private formBuilder: FormBuilder,
    private service: IndexServiceService,
    private spiner: NgxSpinnerService
  ) {
    this.addFormBuild();
   }

  ngOnInit() {
    console.log(this.dataForm.controls['cedula'].value);
  }

  addFormBuild() {
    this.dataForm = this.formBuilder.group({
      cedula: null,
      file: ''
    });
  }

  addFile(event: any) {
    this.fileExist = false;
    this.fileN = this.dataForm.controls['file'].value;

    this.participante.cedula = this.dataForm.controls['cedula'].value;
    console.log(this.participante.cedula);

    if (event.target.files && event.target.files[0]) {
      this.participante.archivo = event.target.files[0];
      if (this.participante.cedula !== null && this.participante.archivo !== null) {
        if (this.participante.archivo.type === 'text/plain') {
          console.log(this.participante.archivo);
          this.spiner.show();
          this.service.postData(this.participante).subscribe(
            (data) => {
              console.log(data);
              this.spiner.hide();
            },
            (error) => {
              this.spiner.hide();
            }
          );
        } else {
          this.fileN = 'Archivo no permitido';
          return;
        }
      } else {
        return;
      }
    } else {
      return;
    }
  }

}
