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
    public empService: EmployeeService,
    public router: Router,
    fb: FormBuilder
  ) {
    this.employeeForm = fb.group({
      name: [null, Validators.required],
      email: [null, Validators.required],
      date: [null, Validators.required],
      number: [null, Validators.required],
      skills: [null, Validators.required]
    });
  }

  ngOnInit() {}

  addEmployee() {
    this.empService
      .createEmployee(this.employeeForm.value)
      .subscribe((data: {}) => {
        this.router.navigate(["/employee-list"]);
      });
  }
}
