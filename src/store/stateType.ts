import { BoardType } from '@/model/Board'
import { UserType } from '@/model/User'
export interface StateType {
  user: UserType | null;
  boards: BoardType[] | [];
}
