import { LinkVerificationStatus } from '../../../types/task-status';
import { TaskStatusOption } from '../../../types/task-status/types';

export const linkVerificationStatusOptions: TaskStatusOption[] = [
  { value: LinkVerificationStatus._SELECT_, label: 'Choisir statut', color: 'text-gray-500' },
  { value: LinkVerificationStatus.PRESENT, label: 'Lien toujours présent', color: 'bg-green-100 text-green-800' },
  { value: LinkVerificationStatus.NOT_PRESENT, label: 'Lien non présent', color: 'bg-red-100 text-red-800' },
  { value: LinkVerificationStatus.BANNED, label: 'Banni', color: 'bg-black text-white' },
  { value: LinkVerificationStatus.OTHER_PROBLEM, label: 'Autre problème', color: 'bg-gray-500 text-white' }
];