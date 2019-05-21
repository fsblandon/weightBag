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

  fileInput: any;

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
  addInput(event: any) {
    this.fileExist = false;
    this.fileN = this.dataForm.controls['file'].value;
    this.fileInput = event.target.files;
  }

  addFile() {

    this.participante.cedula = this.dataForm.controls['cedula'].value;
    console.log(this.participante.cedula);

    const fileInput = <File>this.fileInput[0];
    const formData = new FormData();
    formData.append('file', fileInput);

    if (this.fileInput && this.fileInput[0]) {
      if (this.participante.cedula !== null && fileInput !== null) {
        if (fileInput.type === 'text/plain') {
          console.log(fileInput);
          this.service.postData(this.participante, formData ).subscribe(
            (data) => {
              console.log(data);
              if (data !== null) {
                const name = 'Lazy_loading_output.txt';
                const url = URL.createObjectURL(data);
                const anchor = document.createElement('a');
                anchor.download = name;
                anchor.href = url;

                document.body.appendChild(anchor);
                anchor.click();
                setTimeout(() => {
                  document.body.removeChild(anchor);
                  URL.revokeObjectURL(url);
                }, 300);
              } else {
                console.log('Error in file input');
              }
              /* const f = new Blob([data], {type: 'text/plain'});
              const url = window.URL.createObjectURL(f);
              window.open(url); */
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
