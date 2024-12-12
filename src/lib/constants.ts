import {
  Newspaper,
  Heart,
  Leaf,
  Palette,
  Car,
  Smile,
  Home,
  Building2,
  Utensils,
  GraduationCap,
  Sparkles,
  Laptop,
  Gamepad2,
  ShoppingBag,
  Trophy,
  Plane,
  HelpCircle
} from 'lucide-react';
import { TaskStatus, IndexationStatus, LinkVerificationStatus } from '../types';

export const PREDEFINED_TOPICS = [
  {
    label: 'Actualité & Société (Politique, débats, questions sociales, actualités)',
    icon: Newspaper
  },
  {
    label: 'Relations & Intimité (Rencontres, amour, adulte, porno)',
    icon: Heart
  },
  {
    label: 'Nature & Animaux (Animaux, environnement, écologie)',
    icon: Leaf
  },
  {
    label: 'Arts & Divertissement (Art, culture, cinéma, télévision, photographie, design)',
    icon: Palette
  },
  {
    label: 'Transport & Véhicules (Auto, moto, transports)',
    icon: Car
  },
  {
    label: 'Lifestyle & Bien-être (Beauté, mode, santé, bien-être)',
    icon: Smile
  },
  {
    label: 'Maison & Bricolage (Travaux, rénovation, DIY)',
    icon: Home
  },
  {
    label: 'Entreprise & Finance (Business, finance, crypto, webmarketing, professionnels)',
    icon: Building2
  },
  {
    label: 'Gastronomie (Cuisine, recettes, gastronomie)',
    icon: Utensils
  },
  {
    label: 'Éducation & Famille (Formation, enfants, parentalité, famille)',
    icon: GraduationCap
  },
  {
    label: 'Spiritualité (Esotérisme, voyance, religion)',
    icon: Sparkles
  },
  {
    label: 'Technologie & Sciences (High-Tech, audio, musique, science)',
    icon: Laptop
  },
  {
    label: 'Jeux & Loisirs (Divertissement, jeux vidéo, jouets, loisirs)',
    icon: Gamepad2
  },
  {
    label: 'Shopping & Consommation (Achat, tendances, bonnes affaires)',
    icon: ShoppingBag
  },
  {
    label: 'Sports (Football, sports individuels et collectifs)',
    icon: Trophy
  },
  {
    label: 'Voyages & Tourisme (Découverte, destinations, voyages)',
    icon: Plane
  },
  {
    label: 'Inclassable',
    icon: HelpCircle
  }
];

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