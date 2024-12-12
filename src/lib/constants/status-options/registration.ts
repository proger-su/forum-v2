import { TaskStatus } from '../../../types/task-status';
import { TaskStatusOption } from '../../../types/task-status/types';

export const registrationStatusOptions: TaskStatusOption[] = [
  { value: TaskStatus._SELECT_, label: 'Choisir statut', color: 'text-gray-500' },
  { value: TaskStatus.REGISTRATION_OK_NO_EMAIL, label: 'Inscription ok (sans validation mail)', color: 'bg-green-100 text-green-800' },
  { value: TaskStatus.REGISTRATION_OK_WITH_EMAIL, label: 'Inscription ok (avec validation mail)', color: 'bg-blue-100 text-blue-800' },
  { value: TaskStatus.REGISTRATION_PENDING, label: 'Inscription en attente', color: 'bg-yellow-100 text-yellow-800' },
  { value: TaskStatus.REGISTRATION_PENDING_VALIDATED, label: 'Inscription en attente validée', color: 'bg-purple-100 text-purple-800' },
  { value: TaskStatus.REGISTRATION_PENDING_DENIED, label: 'Inscription en attente non validée', color: 'bg-red-100 text-red-800' },
  { value: TaskStatus.REGISTRATION_DENIED, label: 'Inscription refusée', color: 'bg-red-100 text-red-800' },
  { value: TaskStatus.FORUM_NOT_WORKING, label: 'Marche pas', color: 'bg-red-900 text-red-100' },
  { value: TaskStatus.NO_FORUM, label: 'Pas de forum', color: 'bg-gray-900 text-gray-100' },
  { value: TaskStatus.DIRECT_MESSAGE, label: 'Message direct (livre d\'or)', color: 'bg-indigo-100 text-indigo-800' },
  { value: TaskStatus.OTHER_PROBLEM, label: 'Autre problème (commentaire)', color: 'bg-gray-500 text-white' }
];