import { TaskType } from './Task'
import { UserType } from './User';

export interface BoardType {
  id: number; // unique
  tag: string;
  tasks: Array<TaskType>;
  user: number; // user id
}

export interface BoardsType {
  readonly id: number;
  boardTag: string;
  name: string;
  readonly user: number;
}
export interface fetchBoardsType {
  readonly id: number;
  boardTag: string;
  name: string;
  readonly user: UserType;
}

export class Boards {
  readonly id: number;
  boardTag: string;
  name: string;
  user: number;

  constructor (boards: fetchBoardsType) {
    this.id = boards.id
    this.boardTag = boards.boardTag
    this.name = boards.name
    this.user = boards.user.id
  }

  static toValueList (values: any[]) {
    return values.map(item => new Board(item))
  }
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
