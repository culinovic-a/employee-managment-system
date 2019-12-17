import { Component, OnInit } from "@angular/core";
import { EmployeeService } from "../employee.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-employee-list",
  templateUrl: "./employee-list.component.html",
  styleUrls: ["./employee-list.component.scss"]
})
export class EmployeeListComponent implements OnInit {
  Employees: any = [];

  constructor(public service: EmployeeService, public router: Router) {}

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    return this.service.getEmployees().subscribe((data: {}) => {
      this.Employees = data;
    });
  }

  editEmployee(id) {
    this.router.navigate(["/update-employee", id]);
  }

  deleteEmployee(id) {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      this.service.deleteEmployee(id).subscribe(data => {
        this.loadEmployees();
      });
    }
  }
}
