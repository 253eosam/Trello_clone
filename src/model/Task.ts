export interface TaskType {
  id: number; // unique
  title: string;
  content: string;
  board: number; // drag & drop 실행 시 board id 값을 변경
}

export class Task {
  private readonly _id: number
  private _title: string
  private _content: string
  private _board: number

  constructor (task: TaskType) {
    this._id = task.id
    this._title = task.title
    this._content = task.content
    this._board = task.board
  }

  get id (): number {
    return this._id
  }

  set board (value: number) {
    this._board = value
  }

  get board (): number {
    return this._board
  }

  get title (): string {
    return this._title
  }

  set title (value: string) {
    this._title = value
  }

  get content (): string {
    return this._content
  }

  set content (value: string) {
    this._content = value
  }
}
