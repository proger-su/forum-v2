import { TaskStatus } from '../../../types/task-status';
import { TaskStatusOption } from '../../../types/task-status/types';

export const postStatusOptions: TaskStatusOption[] = [
  { value: TaskStatus._SELECT_, label: 'Choisir statut', color: 'text-gray-500' },
  { value: TaskStatus.REGISTRATION_OK_NO_EMAIL, label: 'Nouveau sujet posté', color: 'bg-blue-100 text-blue-800' },
  { value: TaskStatus.REGISTRATION_OK_WITH_EMAIL, label: 'Réponse postée', color: 'bg-green-100 text-green-800' },
  { value: TaskStatus.REGISTRATION_PENDING_VALIDATED, label: 'Réponse postée (avec validation)', color: 'bg-green-200 text-green-900' },
  { value: TaskStatus.PROBLEM, label: 'Problème (préciser)', color: 'bg-red-100 text-red-800' }
];