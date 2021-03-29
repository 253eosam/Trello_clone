export interface BoardType {
  readonly id: number;
  readonly user: number;
  title: string;
}

export class Board {
  readonly _id: number;
  readonly _user: number;
  _title: string;

  constructor ({ id, title, user }: BoardType) {
    this._id = id
    this._title = title
    this._user = user
  }
}
