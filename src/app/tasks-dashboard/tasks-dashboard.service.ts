import { Task } from './models/task.interface';
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

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this._apiUrl}/tasks`)
  }
}