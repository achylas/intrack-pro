// studentService.js
import { getFirestore, doc, getDoc, collection, getDocs } from "firebase/firestore";
import { Student } from "./studentModel";

const db = getFirestore();

// Fetch a single student by ID
export const getStudentById = async (studentId) => {
  try {
    const docRef = doc(db, "students", studentId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return Student.fromFirestore(docSnap);
    } else {
      console.log("No student found with ID:", studentId);
      return null;
    }
  } catch (error) {
    console.error("Error fetching student:", error);
    throw error;
  }
};

// Fetch all students
export const getAllStudents = async () => {
  try {
    const collectionRef = collection(db, "students");
    const querySnapshot = await getDocs(collectionRef);

    return querySnapshot.docs.map((doc) => Student.fromFirestore(doc));
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
};
