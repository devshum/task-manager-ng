import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Task } from 'src/app/core/models/task.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class TasksDashoardService {
  private _apiUrl = environment.apiUrl;

  constructor(
    private _http: HttpClient,
  ) {}

  getTasks(): Observable<Task[]> {
    return this._http.get<Task[]>(`${this._apiUrl}/tasks`);
  }
}
