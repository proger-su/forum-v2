import { TaskStatus, LinkVerificationStatus, IndexationStatus, TaskProcessStatus } from './enums';

export interface TaskStatusOption {
  value: TaskStatus | LinkVerificationStatus | IndexationStatus;
  label: string;
  color: string;
}

export interface ProcessStatusOption {
  value: TaskProcessStatus;
  label: string;
}