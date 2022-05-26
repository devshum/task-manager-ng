import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  tasks$: Subject<string> = new Subject<string>();

  constructor() { }
}
