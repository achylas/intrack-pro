// Login.jsx (Modified to include the saving of student/advisor data)
import React, { useState } from "react";
import { auth, firestore } from "./firebase.jsx"; // Import Firestore
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { FaEnvelope, FaLock, FaUserAlt } from 'react-icons/fa'; // Import icons
import { useNavigate } from 'react-router-dom'; 
import { doc, setDoc, getDoc, collection } from "firebase/firestore";
import './login.css'
const Login = () => {
  const [action, setAction] = useState("Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); // For Sign Up
  const [role, setRole] = useState(""); // For Sign Up
  const [error, setError] = useState("");

  const navigate = useNavigate();

  
  const handleSubmit = async () => {
    setError(""); // Reset error messages
  
    if (!email || !password || (action === "Sign Up" && (!username || !role))) {
      setError("Please fill in all required fields.");
      return;
    }
  
    try {
      if (action === "Sign Up") {
        // Firebase Sign Up
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("Signed Up:", userCredential.user);
  
        // Save user data to the correct collection based on role
        const userData = {
          username: username,
          email: email,
          role: role,
          createdAt: new Date(),
        };
  
        // Save user data in the corresponding collection
        const userDoc = doc(firestore, role === "Student" ? "students" : "advisors", userCredential.user.uid);
        await setDoc(userDoc, userData);
  
        // Navigate to the respective dashboard
        if (role === "Student") {
          navigate("/dashboard");
        } else {
          navigate("/advisor-dashboard");
        }
  
        alert("Sign up successful!");
      } else {
        // Firebase Login
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("Logged In:", userCredential.user);
  
        // Check the role in the Firestore collection
        const studentDocRef = doc(firestore, "students", userCredential.user.uid);
        const studentDoc = await getDoc(studentDocRef);
  
        if (studentDoc.exists()) {
          navigate("/dashboard");
        } else {
          const advisorDocRef = doc(firestore, "advisors", userCredential.user.uid);
          const advisorDoc = await getDoc(advisorDocRef);
  
          if (advisorDoc.exists()) {
            navigate("/advisor-dashboard");
          } else {
            setError("User does not exist in any collection.");
          }
        }
  
        alert("Login successful!");
      }
    } catch (err) {
      setError(err.message);
    }
  };
  

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>

      <div className="inputs">
        {action === "Login" ? null : (
          <div className="input">
            <FaUserAlt className="input-icon" />
            <input
              type="text"
              placeholder="User Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        )}
        <div className="input">
          <FaEnvelope className="input-icon" />
          <input
            type="email"
            placeholder="Email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input">
          <FaLock className="input-icon" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {action === "Login" ? null : (
          <div className="input">
            <select
              name="usertype"
              id="usertype"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value="Student">Student</option>
              <option value="Advisor">Advisor</option>
            </select>
          </div>
        )}
      </div>

      {error && <p className="error">{error}</p>} {/* Show error messages */}

      <div className="submit-container">
        <div className="submit" onClick={handleSubmit}>
          {action}
        </div>
      </div>

      <div className="switch-container">
        <button
          className="switch-btn"
          onClick={() => setAction(action === "Login" ? "Sign Up" : "Login")}
        >
          {action === "Login" ? "Switch to Sign Up" : "Switch to Login"}
        </button>
      </div>
    </div>
  );
};

export default Login;
