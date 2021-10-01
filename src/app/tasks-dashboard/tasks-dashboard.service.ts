import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()

export class TasksDashBoardService {
  private _apiUrl = environment.apiUrl

  constructor(
    private http: HttpClient,
  ) {}

  getTasks(): Observable<any> {
    return this.http.get(`${this._apiUrl}/tasks`)
  }
}