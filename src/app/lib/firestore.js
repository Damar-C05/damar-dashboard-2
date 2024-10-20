import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';

export const getAllDocuments = async (collectionName) => {
  const snapshot = await getDocs(collection(db, collectionName));
  const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return data;
};

export const deleteDocument = async (collectionName, id) => {
  await deleteDoc(doc(db, collectionName, id));
};
