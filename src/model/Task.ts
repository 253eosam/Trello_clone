import { BoardType } from './Board'

export interface TaskType {
  readonly id?: number;
  title?: string;
  content?: string;
  position?: string;
  board?: BoardType;
}

export class Task {
  readonly id?: number;
  title?: string;
  content?: string;
  position?: string;
  board?: BoardType;

  constructor (task: TaskType) {
    this.id = task.id
    this.title = task.title
    this.content = task.content
    this.position = task.position
    this.board = task.board
  }
}
