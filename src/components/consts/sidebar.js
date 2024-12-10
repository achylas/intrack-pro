import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
import "./sidebar.css";

const Sidebar = ({ children }) => {
    const [userInfo, setUserInfo] = useState(null);
    const [userRole, setUserRole] = useState(""); // Role: 'student' or 'advisor'
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const auth = getAuth();
                const user = auth.currentUser;

                if (user) {
                    const db = getFirestore();

                    // Check if the user is a student
                    const studentRef = doc(db, "students", user.uid);
                    const studentSnap = await getDoc(studentRef);

                    if (studentSnap.exists()) {
                        setUserRole("student");
                        setUserInfo(studentSnap.data());
                        return;
                    }

                    // Check if the user is an advisor
                    const advisorRef = doc(db, "advisors", user.uid);
                    const advisorSnap = await getDoc(advisorRef);

                    if (advisorSnap.exists()) {
                        setUserRole("advisor");
                        setUserInfo(advisorSnap.data());
                        return;
                    }

                    console.error("No matching user found in students or advisors collections.");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    const handleSignOut = async () => {
        try {
            const auth = getAuth();
            await signOut(auth);
            navigate("/");
        } catch (error) {
            console.error("Error during sign-out:", error);
            alert("Failed to sign out. Please try again.");
        }
    };

    // Pages where sidebar should not show
    const hideSidebarPaths = ["/", "/"];
    if (hideSidebarPaths.includes(location.pathname)) {
        return children;
    }

    const renderStudentSidebar = () => (
        <nav className="sidebar-nav">
            <ul>
                <li className={location.pathname === "/dashboard" ? "active" : ""}>
                    <Link to="/dashboard">Dashboard</Link>
                </li>
                <li
                    className={location.pathname === "/internship-history" ? "active" : ""}
                >
                    <Link to="/internship-history">My Internships</Link>
                </li>
                <li
                    className={location.pathname === "/new-internship-form" ? "active" : ""}
                >
                    <Link to="/new-internship-form">Internship Form</Link>
                </li>
            </ul>
        </nav>
    );

    const renderAdvisorSidebar = () => (
        <nav className="sidebar-nav">
            <ul>
                <li className={location.pathname === "/advisor-dashboard" ? "active" : ""}>
                    <Link to="/advisor-dashboard">Dashboard</Link>
                </li>
                <li className={location.pathname === "/std-list" ? "active" : ""}>
                    <Link to="/std-list">Student List</Link>
                </li>
                <li
                    className={location.pathname === "/intership-approval" ? "active" : ""}
                >
                    <Link to="/intership-approval">Internship List</Link>
                </li>
                <li className={location.pathname === "/approval" ? "active" : ""}>
                    <Link to="/approval">Internship Approvals</Link>
                </li>
            </ul>
        </nav>
    );

    return (
        <>
            {/* Drawer Toggle Button */}
            <button
                className="drawer-toggle"
                onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                aria-expanded={isDrawerOpen}
            >
                ☰
            </button>

            {/* Sidebar */}
            <div className={`sidebar ${isDrawerOpen ? "open" : ""}`}>
                <div className="profile-section">
                    <img
                        src={userInfo?.photoURL || "https://via.placeholder.com/150"}
                        alt="Profile"
                        className="profile-image"
                        onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
                    />
                    <h3 className="profile-name">{userInfo?.username || "User Name"}</h3>
                    <p className="role">{userRole === "student" ? `Email: ${userInfo?.email}` : "Advisor"}</p>
                </div>

                {userRole === "student" && renderStudentSidebar()}
                {userRole === "advisor" && renderAdvisorSidebar()}

                <button onClick={handleSignOut} className="signout-button">
                    Sign Out
                </button>
            </div>

            {/* Drawer Overlay */}
            {isDrawerOpen && (
                <div
                    className="drawer-overlay"
                    onClick={() => setIsDrawerOpen(false)}
                ></div>
            )}

            {/* Content Area */}
            <div className="content">{children}</div>
        </>
    );
};

export default Sidebar;
