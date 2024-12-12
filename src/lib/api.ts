import { db } from './firebase';
import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, Timestamp } from 'firebase/firestore';
import type { Task } from '../types';
import { TaskStatus, IndexationStatus, LinkVerificationStatus } from '../types/task-status';

const collections = {
  tasks: collection(db, 'tasks'),
};

export async function getTasks() {
  const snapshot = await getDocs(collections.tasks);
  return snapshot.docs.map(doc => ({ 
    id: doc.id, 
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate(),
    updatedAt: doc.data().updatedAt?.toDate(),
  } as Task));
}

export async function getTask(id: string) {
  const docRef = doc(db, 'tasks', id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) return null;
  const data = docSnap.data();
  return { 
    id: docSnap.id, 
    ...data,
    createdAt: data.createdAt?.toDate(),
    updatedAt: data.updatedAt?.toDate(),
  } as Task;
}

export async function createTask(data: Omit<Task, 'id'>) {
  const taskData = {
    ...data,
    registrationStatus: data.registrationStatus || TaskStatus._SELECT_,
    postStatus: data.postStatus || TaskStatus._SELECT_,
    linkStatus: data.linkStatus || TaskStatus._SELECT_,
    linkVerificationStatus: data.linkVerificationStatus || LinkVerificationStatus._SELECT_,
    indexationStatus: data.indexationStatus || IndexationStatus._SELECT_,
    emailAlias: data.emailAlias || null,
    threadUrl1: data.threadUrl1 || '',
    threadUrl2: data.threadUrl2 || '',
    threadUrl3: data.threadUrl3 || '',
    postUrl: data.postUrl || '',
    messageToPost: data.messageToPost || '',
    comment: data.comment || '',
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  };

  const docRef = await addDoc(collections.tasks, taskData);
  return { id: docRef.id, ...taskData };
}

export async function updateTask(id: string, data: Partial<Task>) {
  const docRef = doc(db, 'tasks', id);
  const updateData = {
    ...data,
    emailAlias: data.emailAlias || null,
    threadUrl1: data.threadUrl1 || '',
    threadUrl2: data.threadUrl2 || '',
    threadUrl3: data.threadUrl3 || '',
    postUrl: data.postUrl || '',
    messageToPost: data.messageToPost || '',
    comment: data.comment || '',
    updatedAt: Timestamp.now(),
  };
  await updateDoc(docRef, updateData);
  return { id, ...updateData };
}

export async function deleteTask(id: string) {
  const docRef = doc(db, 'tasks', id);
  await deleteDoc(docRef);
}

export const api = {
  tasks: {
    getAll: getTasks,
    getOne: getTask,
    create: createTask,
    update: updateTask,
    delete: deleteTask,
  },
};