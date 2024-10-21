import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";

export const getAllDocuments = async (collectionName) => {
  const snapshot = await getDocs(collection(db, collectionName));
  const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return data;
};

export const deleteDocument = async (collectionName, id) => {
  await deleteDoc(doc(db, collectionName, id));
};

export const updateStatusDocument = async (
  collectionName,
  id,
  status,
  notes = ''
) => {
  const updates = { status };

  if (status === "Ditanggapi" && notes) {
    updates.notes = notes;
  }

  console.log(updates);

  await updateDoc(doc(db, collectionName, id), updates);
};
