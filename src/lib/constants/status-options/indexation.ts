import { IndexationStatus } from '../../../types/task-status';
import { TaskStatusOption } from '../../../types/task-status/types';

export const indexationStatusOptions: TaskStatusOption[] = [
  { value: IndexationStatus._SELECT_, label: 'Choisir statut', color: 'text-gray-500' },
  { value: IndexationStatus.NOT_INDEXED, label: 'Pas indexé', color: 'bg-red-100 text-red-800' },
  { value: IndexationStatus.IN_PROGRESS, label: 'En cours', color: 'bg-yellow-100 text-yellow-800' },
  { value: IndexationStatus.INDEXED, label: 'Indexé', color: 'bg-green-100 text-green-800' }
];