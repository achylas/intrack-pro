import { db } from '../components/loginsignup/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

export const fetchInternshipsByStudentID = async (studentID) => {
  const internshipsRef = collection(db, "Internships");
  const q = query(internshipsRef, where("studentID", "==", studentID));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => doc.data());
};
