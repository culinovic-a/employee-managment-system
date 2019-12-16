import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { environment } from "../../environments/environment.prod";
import { Employee } from "./employee";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { retry, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class EmployeeService {
  private readonly api: string;

  constructor(private http: HttpClient) {
    this.api = `${environment.apiURL}`;
  }

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };

  getEmployees(): Observable<Employee> {
    return this.http
      .get<Employee>(this.api + "/employees")
      .pipe(retry(1), catchError(this.handleError));
  }

  getEmployee(id): Observable<Employee> {
    return this.http
      .get<Employee>(this.api + "/employees/" + id)
      .pipe(retry(1), catchError(this.handleError));
  }

  createEmployee(employee): Observable<Employee> {
    return this.http
      .post<Employee>(
        this.api + "/employees",
        JSON.stringify(employee.value),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  handleError(error) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
