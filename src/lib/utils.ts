import { clsx, type ClassValue } from 'clsx';
import {  TaskStatus, TaskProcessStatus, LinkVerificationStatus, IndexationStatus } from '../types/task-status';

import { ForumStatus } from '../types/forum-status';
import type { Task } from '../types';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
}

export function determineProcessStatus(task: Task): TaskProcessStatus {
  // Step 1: INSCRIPTION
  if (task.registrationStatus === TaskStatus._SELECT_) {
    return TaskProcessStatus.INSCRIPTION;
  }

  // Step 2: INSCRIPTION EN ATTENTE
  if (task.registrationStatus === TaskStatus.REGISTRATION_PENDING) {
    return TaskProcessStatus.INSCRIPTION_EN_ATTENTE;
  }

  // Taches à problème (Registration issues)
  const problemRegistrationStatuses = [
    TaskStatus.REGISTRATION_PENDING_DENIED,
    TaskStatus.REGISTRATION_DENIED,
    TaskStatus.FORUM_NOT_WORKING,
    TaskStatus.NO_FORUM,
    TaskStatus.OTHER_PROBLEM
  ];
  
  if (problemRegistrationStatuses.includes(task.registrationStatus)) {
    return TaskProcessStatus.TACHE_PROBLEME;
  }

  // Step 3: POST MESSAGE
  if (
    task.registrationStatus === TaskStatus.REGISTRATION_OK_NO_EMAIL ||
    task.registrationStatus === TaskStatus.REGISTRATION_OK_WITH_EMAIL ||
    task.registrationStatus === TaskStatus.REGISTRATION_PENDING_VALIDATED
  ) {
    return TaskProcessStatus.POST_MESSAGE;
  }

  // Step 4: AJOUT LIEN
  if (
    task.postStatus === TaskStatus.REGISTRATION_OK_NO_EMAIL || // nouveau sujet posté
    task.postStatus === TaskStatus.REGISTRATION_OK_WITH_EMAIL || // réponse postée
    task.postStatus === TaskStatus.REGISTRATION_PENDING_VALIDATED // réponse postée (avec validation)
  ) {
    return TaskProcessStatus.AJOUT_LIEN;
  }

  if (task.postStatus === TaskStatus.PROBLEM) {
    return TaskProcessStatus.TACHE_PROBLEME;
  }

  // Step 5: VÉRIFICATION LIEN
  if (
    task.linkStatus === TaskStatus.REGISTRATION_OK_NO_EMAIL || // Lien en signature
    task.linkStatus === TaskStatus.REGISTRATION_OK_WITH_EMAIL || // Lien dans post
    task.linkStatus === TaskStatus.REGISTRATION_PENDING_VALIDATED // Lien ailleurs (préciser)
  ) {
    return TaskProcessStatus.VERIFICATION_LIEN;
  }

  if (task.linkStatus === TaskStatus.PROBLEM || task.linkStatus === TaskStatus.BANNED) {
    return TaskProcessStatus.TACHE_PROBLEME;
  }

  // Step 6: INDEXATION
  if (task.linkVerificationStatus === LinkVerificationStatus.PRESENT) {
    return TaskProcessStatus.INDEXATION;
  }

  if (
    task.linkVerificationStatus === LinkVerificationStatus.NOT_PRESENT ||
    task.linkVerificationStatus === LinkVerificationStatus.BANNED ||
    task.linkVerificationStatus === LinkVerificationStatus.OTHER_PROBLEM
  ) {
    return TaskProcessStatus.TACHE_PROBLEME;
  }

  // Step 7: TACHE TERMINÉE
  if (task.indexationStatus === IndexationStatus.INDEXED) {
    return TaskProcessStatus.TACHE_TERMINEE;
  }

  // Default to INSCRIPTION if no other conditions are met
  return TaskProcessStatus.INSCRIPTION;
}

export function cleanUrl(url: string): string {
  try {
    let cleaned = url.replace(/^(https?:\/\/)?(www\.)?/, '');
    cleaned = cleaned.split('/')[0];
    cleaned = cleaned.split(':')[0];
    return cleaned.toLowerCase();
  } catch (error) {
    return url;
  }
}

export const statusColors = {
  [ForumStatus.FUNCTIONAL_WITH_EMAIL]: 'text-green-600 bg-green-50',
  [ForumStatus.FUNCTIONAL_WITHOUT_EMAIL]: 'text-green-600 bg-green-50',
  [ForumStatus.GUESTBOOK]: 'text-yellow-600 bg-yellow-50',
  [ForumStatus.REGISTRATION_DENIED]: 'text-red-600 bg-red-50',
  [ForumStatus.NOT_WORKING]: 'text-red-600 bg-red-50',
  [ForumStatus.NO_FORUM]: 'text-red-600 bg-red-50',
  [ForumStatus.OTHER_ISSUE]: 'text-gray-600 bg-gray-50',
  [TaskStatus.REGISTRATION_OK_NO_EMAIL]: 'text-green-600 bg-green-50',
  [TaskStatus.REGISTRATION_OK_WITH_EMAIL]: 'text-blue-600 bg-blue-50',
  [TaskStatus.REGISTRATION_PENDING]: 'text-yellow-600 bg-yellow-50',
  [TaskStatus.REGISTRATION_DENIED]: 'text-red-600 bg-red-50',
};