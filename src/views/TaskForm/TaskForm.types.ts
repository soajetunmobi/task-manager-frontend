import { StatusType } from '../TaskList/TaskList.types';

export type TaskCreatePayload = {
  title: string;
  description: string;
  status: StatusType;
  createdBy: string;
  assignedTo: Array<string>;
};
