import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  tasks$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() { }
}
