import { UserType } from './User'
import { TaskType } from './Task'
export interface BoardType {
  readonly id: number;
  tag: string;
  user: UserType;
  tasks: TaskType[];
}

export class Board {
  constructor (board: BoardType) {
    Object.assign(this, board)
  }
}
