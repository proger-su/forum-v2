import { ForumStatus } from '../../../types/forum-status';
import { ForumStatusOption } from '../../../types/forum-status/types';

export const forumStatusOptions: ForumStatusOption[] = [
  { value: ForumStatus.FUNCTIONAL_WITH_EMAIL, label: 'Fonctionnel avec validation mail', color: 'bg-green-100 text-green-800' },
  { value: ForumStatus.FUNCTIONAL_WITHOUT_EMAIL, label: 'Fonctionnel sans validation mail', color: 'bg-blue-100 text-blue-800' },
  { value: ForumStatus.GUESTBOOK, label: 'Livre d\'or', color: 'bg-yellow-100 text-yellow-800' },
  { value: ForumStatus.REGISTRATION_DENIED, label: 'Inscription refusée', color: 'bg-red-100 text-red-800' },
  { value: ForumStatus.NOT_WORKING, label: 'Marche pas', color: 'bg-red-900 text-red-100' },
  { value: ForumStatus.NO_FORUM, label: 'Pas de forum', color: 'bg-gray-900 text-gray-100' },
  { value: ForumStatus.OTHER_ISSUE, label: 'Autre problème', color: 'bg-gray-500 text-white' }
];