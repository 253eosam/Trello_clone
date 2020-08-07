export interface UserType {
    id: number; // unique
    email: string;
    pwd: string;
}

export class User {
    private readonly _id: number
    private _email: string
    private _pwd: string

    constructor (user: UserType) {
      this._id = user.id
      this._email = user.email
      this._pwd = user.pwd
    }

    get id (): number {
      return this._id
    }

    get email (): string {
      return this._email
    }

    set email (value: string) {
      this._email = value
    }

    get pwd (): string {
      return this._pwd
    }

    set pwd (value: string) {
      this._pwd = value
    }
}
