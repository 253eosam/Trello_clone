import { BoardType } from '@/model/trello/Board'
// import { TaskType } from '@/model/Task'
import { UserType } from '@/model/account/User'
import { BListType } from '@/model/trello/BList'
export interface StateType {
  user?: UserType | null;
  boards?: BoardType[];
  bList?: BListType[];
}
