import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { IndexServiceService } from './index-service.service';
import { Participante } from 'src/app/models/participante';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  providers: [IndexServiceService]
})
export class IndexComponent implements OnInit {
  fileExist = true;
  fileInput: any;
  formValid = true;

  participante: Participante = {
    cedula: null,
    fileN: ''
  };

  dataForm: FormGroup = new FormGroup({
    'cedula': new FormControl(this.participante.cedula, [
      Validators.required,
      Validators.minLength(10)
    ]),
    'file': new FormControl(this.participante.fileN, [
      Validators.required
    ])
  });

  constructor(
    private formBuilder: FormBuilder,
    private service: IndexServiceService,
    private spinner: NgxSpinnerService
  ) {
    this.addFormBuild();
   }

  ngOnInit() {
  }

  addFormBuild() {
    this.dataForm = this.formBuilder.group({
      cedula: null,
      file: ['']
    });
  }
  addInput(event: any) {
    this.fileExist = false;
    this.fileInput = event.target.files;
    this.participante.cedula = this.dataForm.controls['cedula'].value;
    if (this.fileInput[0].type === 'text/plain') {
      this.participante.fileN = this.dataForm.controls['file'].value;
    } else {
      this.participante.fileN = 'Archivo no permitido';
      this.formValid = true;
      return;
    }
    if (this.participante.cedula !== null && this.participante.fileN !== '') {
      this.formValid = false;
    } else {
      this.formValid = true;
    }
  }

  addFile() {
    const fileInput = <File>this.fileInput[0];
    const formData = new FormData();
    formData.append('file', fileInput);

    this.spinner.show();
    if (this.fileInput && this.fileInput[0]) {
      if (this.participante.cedula !== null && fileInput !== null) {
          this.service.postData(this.participante, formData ).subscribe(
            (data) => {
              if (data !== null) {
                setTimeout(() => {
                  this.spinner.hide();
                  const name = 'Lazy_loading_output.txt';
                  const f = new Blob([data], {type: 'text/plain'});
                  const link = document.createElement('a');
                  link.href = window.URL.createObjectURL(f);
                  link.download = name;
                  link.click();
                }, 3000);
              } else {
                console.log('Error in file input');
                setTimeout(() => {
                  this.spinner.hide();
                }, 2000);
              }
            },
            (error) => {
              console.log('error downloading file');
              setTimeout(() => {
                this.spinner.hide();
              }, 2000);
            }
          );
      } else {
        return;
      }
    } else {
      return;
    }
  }

}
