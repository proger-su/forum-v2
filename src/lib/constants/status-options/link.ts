import { TaskStatus } from '../../../types/task-status';
import { TaskStatusOption } from '../../../types/task-status/types';

export const linkStatusOptions: TaskStatusOption[] = [
  { value: TaskStatus._SELECT_, label: 'Choisir statut', color: 'text-gray-500' },
  { value: TaskStatus.REGISTRATION_OK_NO_EMAIL, label: 'Lien en signature', color: 'bg-blue-100 text-blue-800' },
  { value: TaskStatus.REGISTRATION_OK_WITH_EMAIL, label: 'Lien dans post', color: 'bg-green-100 text-green-800' },
  { value: TaskStatus.REGISTRATION_PENDING_VALIDATED, label: 'Lien ailleurs (préciser)', color: 'bg-yellow-100 text-yellow-800' },
  { value: TaskStatus.PROBLEM, label: 'Pas réussi', color: 'bg-red-100 text-red-800' },
  { value: TaskStatus.BANNED, label: 'Banni', color: 'bg-black text-white' }
];