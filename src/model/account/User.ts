export interface UserType {
  readonly id: number;
  email: string;
  name: string;
  password: string;
}
export class User {
  readonly _id: number
  _email: string
  _password: string
  _name: string

  constructor (user: UserType) {
    this._id = user.id
    this._email = user.email
    this._password = user.password
    this._name = user.name
  }
}
