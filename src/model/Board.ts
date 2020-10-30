import { UserType } from './User'
import { TaskType } from './Task'
export interface BoardType {
  readonly id: number;
  tag: string;
  user: UserType;
  tasks: TaskType[];
}

export class Board {
  readonly id: number;
  tag: string;
  user: UserType;
  tasks: TaskType[];

  constructor (board: BoardType) {
    this.id = board.id
    this.tag = board.tag
    this.user = board.user
    this.tasks = board.tasks
  }
}
