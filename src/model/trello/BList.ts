export interface CardType {
  readonly id: number;
  content: string;
  description: string;
  position: number;
}
export interface BListType {
  readonly id: number;
  readonly board: number;
  title: string;
  cardList: CardType[];
}

export class Card {
  readonly _id: number;
  _content: string;
  _description: string;
  _position: number;

  constructor ({ id, content, description, position }: CardType) {
    this._id = id
    this._content = content
    this._description = description
    this._position = position
  }
}

export class BList {
  readonly _id: number;
  readonly _board: number;
  _title: string;
  _cardList: CardType[];

  constructor ({ id, board, title, cardList }: BListType) {
    this._id = id
    this._board = board
    this._title = title
    this._cardList = cardList
  }
}
