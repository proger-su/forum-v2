import { TaskStatus, LinkVerificationStatus, IndexationStatus } from '../../types/task-status';

export const TASK_STATUS_OPTIONS = {
  registration: [
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
  ],
  post: [
    { value: TaskStatus._SELECT_, label: 'Choisir statut', color: 'text-gray-500' },
    { value: TaskStatus.REGISTRATION_OK_NO_EMAIL, label: 'Nouveau sujet posté', color: 'bg-blue-100 text-blue-800' },
    { value: TaskStatus.REGISTRATION_OK_WITH_EMAIL, label: 'Réponse postée', color: 'bg-green-100 text-green-800' },
    { value: TaskStatus.REGISTRATION_PENDING_VALIDATED, label: 'Réponse postée (avec validation)', color: 'bg-green-200 text-green-900' },
    { value: TaskStatus.PROBLEM, label: 'Problème (préciser)', color: 'bg-red-100 text-red-800' }
  ],
  link: [
    { value: TaskStatus._SELECT_, label: 'Choisir statut', color: 'text-gray-500' },
    { value: TaskStatus.REGISTRATION_OK_NO_EMAIL, label: 'Lien en signature', color: 'bg-blue-100 text-blue-800' },
    { value: TaskStatus.REGISTRATION_OK_WITH_EMAIL, label: 'Lien dans post', color: 'bg-green-100 text-green-800' },
    { value: TaskStatus.REGISTRATION_PENDING_VALIDATED, label: 'Lien ailleurs (préciser)', color: 'bg-yellow-100 text-yellow-800' },
    { value: TaskStatus.PROBLEM, label: 'Pas réussi', color: 'bg-red-100 text-red-800' },
    { value: TaskStatus.BANNED, label: 'Banni', color: 'bg-black text-white' }
  ],
  linkVerification: [
    { value: LinkVerificationStatus._SELECT_, label: 'Choisir statut', color: 'text-gray-500' },
    { value: LinkVerificationStatus.PRESENT, label: 'Lien toujours présent', color: 'bg-green-100 text-green-800' },
    { value: LinkVerificationStatus.NOT_PRESENT, label: 'Lien non présent', color: 'bg-red-100 text-red-800' },
    { value: LinkVerificationStatus.BANNED, label: 'Banni', color: 'bg-black text-white' },
    { value: LinkVerificationStatus.OTHER_PROBLEM, label: 'Autre problème', color: 'bg-gray-500 text-white' }
  ],
  indexation: [
    { value: IndexationStatus._SELECT_, label: 'Choisir statut', color: 'text-gray-500' },
    { value: IndexationStatus.NOT_INDEXED, label: 'Pas indexé', color: 'bg-red-100 text-red-800' },
    { value: IndexationStatus.IN_PROGRESS, label: 'En cours', color: 'bg-yellow-100 text-yellow-800' },
    { value: IndexationStatus.INDEXED, label: 'Indexé', color: 'bg-green-100 text-green-800' }
  ]
};

export const PROCESS_STATUS_OPTIONS = [
  { value: TaskProcessStatus.INSCRIPTION, label: 'Inscription' },
  { value: TaskProcessStatus.INSCRIPTION_EN_ATTENTE, label: 'Inscription en attente' },
  { value: TaskProcessStatus.POST_MESSAGE, label: 'Post message' },
  { value: TaskProcessStatus.AJOUT_LIEN, label: 'Ajout lien' },
  { value: TaskProcessStatus.VERIFICATION_LIEN, label: 'Vérification lien' },
  { value: TaskProcessStatus.INDEXATION, label: 'Indexation' },
  { value: TaskProcessStatus.TACHE_TERMINEE, label: 'Tâche terminée' },
  { value: TaskProcessStatus.TACHE_PROBLEME, label: 'Tâche à problème' }
];