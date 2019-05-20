import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { IndexServiceService } from './index-service.service';
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
    fecha_exec: null
  };

  dataForm = new FormGroup({
    cedula: new FormControl(),
    file: new FormControl()
  });

  constructor(
    private formBuilder: FormBuilder,
    private service: IndexServiceService
  ) {
    this.addFormBuild();
   }

  ngOnInit() {
    console.log(this.dataForm.controls['cedula'].value);
  }

  addFormBuild() {
    this.dataForm = this.formBuilder.group({
      cedula: null,
      file: ['']
    });
  }

  addFile(event: any) {
    this.fileExist = false;
    this.fileN = this.dataForm.controls['file'].value;

    this.participante.cedula = this.dataForm.controls['cedula'].value;
    console.log(this.participante.cedula);

    const fileInput = <File>event.target.files[0];
    const formData = new FormData();
    formData.append('file', fileInput, fileInput.name);

    if (event.target.files && event.target.files[0]) {
      //this.participante.archivo = event.target.files[0];
      if (this.participante.cedula !== null && fileInput !== null) {
        if (fileInput.type === 'text/plain') {
          console.log(fileInput);
          this.service.postData(this.participante, fileInput ).subscribe(
            (data) => {
              console.log(data);
              /* const f = new Blob([data], {type: 'text/plain'});
              const url = window.URL.createObjectURL(f);
              window.open(url); */
              /* const name = 'Lazy_loading_output.txt';
              const url = URL.createObjectURL(data);
              const anchor = document.createElement('a');
              anchor.download = name;
              anchor.href = url;

              document.body.appendChild(anchor);
              anchor.click();
              setTimeout(() => {
                document.body.removeChild(anchor);
                URL.revokeObjectURL(url);
              }, 300); */
            },
            (error) => {
              console.log('error downloading file');
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
