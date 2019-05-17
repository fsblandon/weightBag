import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  fileExist = false;

  dataForm = new FormGroup({
    cedula: new FormControl(),
    file: new FormControl()
  });

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.addFormBuild();
   }

  ngOnInit() {
    console.log(this.dataForm.controls['cedula'].value);
  }

  addFormBuild() {
    this.dataForm = this.formBuilder.group({
      cedula: 11221,
      file: ''
    });
  }

}
