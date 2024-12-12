import { useState, useCallback } from 'react';
import { 
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  QueryConstraint
} from 'firebase/firestore';
import { db } from '../lib/firebase';

export function useFirestore(collectionName: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const getAll = useCallback(async (constraints: QueryConstraint[] = []) => {
    setLoading(true);
    setError(null);
    try {
      const q = query(collection(db, collectionName), ...constraints);
      const querySnapshot = await getDocs(q);
      const documents = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      return documents;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      return [];
    } finally {
      setLoading(false);
    }
  }, [collectionName]);

  const getOne = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const docRef = doc(db, collectionName, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      }
      return null;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      return null;
    } finally {
      setLoading(false);
    }
  }, [collectionName]);

  const add = useCallback(async (data: any) => {
    setLoading(true);
    setError(null);
    try {
      const docRef = await addDoc(collection(db, collectionName), data);
      return { id: docRef.id, ...data };
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      return null;
    } finally {
      setLoading(false);
    }
  }, [collectionName]);

  const update = useCallback(async (id: string, data: any) => {
    setLoading(true);
    setError(null);
    try {
      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, data);
      return { id, ...data };
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      return null;
    } finally {
      setLoading(false);
    }
  }, [collectionName]);

  const remove = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const docRef = doc(db, collectionName, id);
      await deleteDoc(docRef);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      return false;
    } finally {
      setLoading(false);
    }
  }, [collectionName]);

  return {
    loading,
    error,
    getAll,
    getOne,
    add,
    update,
    remove
  };
}