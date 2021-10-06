import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { TaskPostData, TaskView } from 'src/app/core/models/task.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class TasksDashboardService {
  private _apiUrl = environment.apiUrl;

  constructor(
    private _http: HttpClient,
  ) {}

  getTasks(): Observable<TaskView[]> {
    return this._http.get<TaskView[]>(`${this._apiUrl}/tasks`, 
          { params: { _sort: 'id', _order: 'desc'}}
    );
  }

  addTask(task: TaskPostData): Observable<TaskPostData> {
    return this._http
          .post<TaskPostData>(`${this._apiUrl}/tasks`, task)
  }
}
