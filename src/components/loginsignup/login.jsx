import React, { useState } from "react";
import "./login.css";
import { auth, firestore } from "./firebase.jsx"; // Import Firestore
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { FaEnvelope, FaLock, FaUserAlt } from 'react-icons/fa'; // Import icons
import { useNavigate } from 'react-router-dom'; 

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
          profilePicture: "", // Optionally add this if available
        };

        // Save user data in the corresponding collection
        if (role === "Student") {
          await firestore.collection("students").doc(userCredential.user.uid).set(userData);
        } else if (role === "Advisor") {
          await firestore.collection("advisors").doc(userCredential.user.uid).set(userData);
        } else if (role === "Admin") {
          await firestore.collection("admins").doc(userCredential.user.uid).set(userData);
        }

        // Navigate to the correct dashboard
        if (role === "Student") {
          navigate("/student-dashboard");
        } else if (role === "Advisor") {
          navigate("/advisor-dashboard");
        } else if (role === "Admin") {
          navigate("/admin-dashboard");
        }

        alert("Sign up successful!");
      } else {
        // Firebase Login
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("Logged In:", userCredential.user);

        // Check the role in the Firestore collection
        const userRef = firestore.collection("students").doc(userCredential.user.uid);
        let userDoc = await userRef.get();
        if (!userDoc.exists) {
          userDoc = await firestore.collection("advisors").doc(userCredential.user.uid).get();
        }
        if (!userDoc.exists) {
          userDoc = await firestore.collection("admins").doc(userCredential.user.uid).get();
        }

        // Navigate based on the role
        if (userDoc.exists) {
          const role = userDoc.data().role;
          if (role === "Student") {
            navigate("/student-dashboard");
          } else if (role === "Advisor") {
            navigate("/advisor-dashboard");
          } else if (role === "Admin") {
            navigate("/admin-dashboard");
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
              <option value="Admin">Admin</option>
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
