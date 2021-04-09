import { BoardType } from '@/model/trello/Board'
// import { TaskType } from '@/model/Task'
import { UserType } from '@/model/account/User'
export interface StateType {
  user?: UserType | null;
  boards?: BoardType[];
  // task: TaskType | null;
}
