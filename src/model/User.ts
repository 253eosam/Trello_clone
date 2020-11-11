export interface UserType {
  readonly id: number;
  email: string;
  name: string;
  password: string;
}
export class User {
  readonly id: number
  email: string
  password: string
  name: string

  constructor (user: UserType) {
    this.id = user.id
    this.email = user.email
    this.password = user.password
    this.name = user.name
  }
}
