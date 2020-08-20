import { UserType } from '@/model/User'
export interface StateType {
    user: UserType | null;
    scheduleCnt: number;
  }