export interface CardType {
  readonly id: number;
  content: string;
  position: number;
}
export interface BListType {
  readonly id: number;
  readonly board: number;
  title: string;
  position: number;
  cardList: CardType[];
}

export class Card {
  readonly _id: number;
  _content: string;
  _position: number;

  constructor ({ id, content, position }: CardType) {
    this._id = id
    this._content = content
    this._position = position
  }
}

export class BList {
  readonly _id: number;
  readonly _board: number;
  _title: string;
  _position: number;
  _cardList: CardType[];

  constructor ({ id, board, position, title, cardList }: BListType) {
    this._id = id
    this._board = board
    this._title = title
    this._position = position
    this._cardList = cardList
  }
}
