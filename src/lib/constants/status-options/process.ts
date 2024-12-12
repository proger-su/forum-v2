import { TaskProcessStatus } from '../../../types/task-status';
import { ProcessStatusOption } from '../../../types/task-status/types';

export const processStatusOptions: ProcessStatusOption[] = [
  { value: TaskProcessStatus.INSCRIPTION, label: 'Inscription' },
  { value: TaskProcessStatus.INSCRIPTION_EN_ATTENTE, label: 'Inscription en attente' },
  { value: TaskProcessStatus.POST_MESSAGE, label: 'Post message' },
  { value: TaskProcessStatus.AJOUT_LIEN, label: 'Ajout lien' },
  { value: TaskProcessStatus.VERIFICATION_LIEN, label: 'Vérification lien' },
  { value: TaskProcessStatus.INDEXATION, label: 'Indexation' },
  { value: TaskProcessStatus.TACHE_TERMINEE, label: 'Tâche terminée' },
  { value: TaskProcessStatus.TACHE_PROBLEME, label: 'Tâche à problème' }
];