import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from "@angular/forms";
import { EmployeeService } from "../employee.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-create-employee",
  templateUrl: "./create-employee.component.html",
  styleUrls: ["./create-employee.component.scss"]
})
export class CreateEmployeeComponent implements OnInit {
  public employeeForm: FormGroup;

  constructor(
    public restApi: EmployeeService,
    public router: Router,
    fb: FormBuilder
  ) {
    this.employeeForm = fb.group({
      name: [null, Validators.required],
      email: [null, Validators.required],
      date: [null, Validators.required],
      number: [null, Validators.required],
      skills: [null, Validators.required]
      // name: new FormControl(),
      // email: new FormControl(),
      // number: new FormControl(),
      // skills: new FormControl()
    });
  }

  ngOnInit() {}

  // send() {
  //   console.log(this.employeeForm.value);
  // }

  addEmployee() {
    this.restApi.createEmployee(this.employeeForm).subscribe((data: {}) => {
      this.router.navigate(["/employee-list"]);
    });
  }
}
