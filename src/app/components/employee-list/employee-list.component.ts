import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  public employees: Employee[] = [];

  constructor(public service: EmployeeService, public router: Router) {}

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    return this.service.getEmployees().subscribe(data => {
      this.employees = data;
    });
  }

  editEmployee(id) {
    this.router.navigate(['/update-employee', id]);
  }

  deleteEmployee(id) {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      this.service.deleteEmployee(id).subscribe(data => {
        this.loadEmployees();
      });
    }
  }
}
