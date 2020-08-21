import { TaskType } from './Task'

export interface BoardType {
  id: number; // unique
  tag: string;
  tasks: Array<TaskType>;
  user: number; // user id
}

export class Board {
  private readonly _id: number;
  private _tag: string;
  private _tasks: Array<TaskType>;
  private readonly _user: number

  constructor (board: BoardType) {
    this._id = board.id
    this._tag = board.tag
    this._tasks = board.tasks
    this._user = board.user
  }

  get id (): number {
    return this._id
  }

  get user (): number {
    return this._user
  }

  get tag (): string {
    return this._tag
  }

  set tag (value: string) {
    this._tag = value
  }

  get tasks (): Array<TaskType> {
    return this._tasks
  }

  set tasks (value: Array<TaskType>) {
    this._tasks = value
  }
}
