import { collection } from 'firebase/firestore';
import { db } from './firebase';

// Collection references
export const forumsCollection = collection(db, 'forums');
export const tasksCollection = collection(db, 'tasks');
export const emailsCollection = collection(db, 'emails');
export const websitesCollection = collection(db, 'websites');