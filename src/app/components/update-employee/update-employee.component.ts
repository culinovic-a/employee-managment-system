import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { EmployeeService } from "../employee.service";

@Component({
  selector: "app-update-employee",
  templateUrl: "./update-employee.component.html",
  styleUrls: ["./update-employee.component.scss"]
})
export class UpdateEmployeeComponent implements OnInit {
  id = this.actRoute.snapshot.params["id"];
  employeeData: any = {};
  updateForm: FormGroup;

  constructor(
    private service: EmployeeService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) {
    this.updateForm = new FormGroup({
      name: new FormControl(),
      email: new FormControl(),
      date: new FormControl(),
      number: new FormControl(),
      skills: new FormControl()
    });
  }

  ngOnInit() {
    this.service.getEmployee(this.id).subscribe((data: {}) => {
      this.employeeData = data;
      this.updateForm.controls["name"].setValue(this.employeeData.name);
      this.updateForm.controls["email"].setValue(this.employeeData.email);
      this.updateForm.controls["date"].setValue(this.employeeData.date);
      this.updateForm.controls["number"].setValue(this.employeeData.number);
      this.updateForm.controls["skills"].setValue(this.employeeData.skills);
    });
  }

  updateEmployee() {
    this.service
      .updateEmployee(this.id, this.updateForm.value)
      .subscribe(data => {
        this.router.navigate(["/employee-list"]);
      });
  }
}
