import { Component, Input } from "@angular/core";
import { Task } from "../../../core/models/task.interface";
import { Text } from "../../../core/enums/text";
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})

export class TaskComponent {
  @Input() task: Task;
  public StateText = Text;

  constructor() {}
}