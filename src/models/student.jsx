// studentModel.js

export class Student {
  constructor({ advisorID, creationTime, email, regID, role, username }) {
    this.advisorID = advisorID;
    this.creationTime = creationTime;
    this.email = email;
    this.regID = regID;
    this.role = role;
    this.username = username;
  }

  // Static method to create a Student object from Firestore data
  static fromFirestore(doc) {
    const data = doc.data();
    return new Student({
      advisorID: data.advisorID || "",
      creationTime: data.creationtime.toDate(),
      email: data.email || "",
      regID: data.regid || "",
      role: data.role || "",
      username: data.username || "",
    });
  }
}
