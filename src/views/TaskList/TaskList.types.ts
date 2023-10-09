export type AuthorType = {
  _id: string;
  name: string;
};

export type StatusType =
  | 'To Do'
  | 'In Progress'
  | 'Done'
  | 'Open'
  | 'On Hold'
  | 'Cancelled'
  | 'Closed';

export interface TaskType {
  _id: string;
  title: string;
  description: string;
  status: StatusType;
  assignedTo?: Array<AuthorType>;
  createdBy: AuthorType;
  createdAt: string;
  updatedAt?: string;
}

export type TaskListType = Array<TaskType>;
