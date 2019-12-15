import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit {

  public userForm: FormGroup;

  constructor() { 
    this.userForm = new FormGroup({

    })
  }

  ngOnInit() {
  }

}
