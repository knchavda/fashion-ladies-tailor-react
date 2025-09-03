import { useState, useEffect } from "react";
import Login from "./components/Login.jsx";
import Splash from "./components/Splash.jsx";
import BottomNav from "./components/BottomNav.jsx";
import Header from "./components/Header.jsx";

import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebaseConfig.jsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { fetchUsers } from "./utils/helper.js";
import { useOptions } from "./context/options.jsx";

export default function App() {
  const [page, setPage] = useState("login");
  const [logoutTimer, setLogoutTimer] = useState(null);
  const { setOptions } = useOptions();

  const getAllCustomer = async () => {
    const allCustomers = await fetchUsers();
    
    setOptions(allCustomers);
  };

  const redirectToMain = () => {
    setPage("splash");
    setTimeout(() => {
      setPage("main");
      toast.success("Login successfully");
    }, 1500);
  };

  const login = async (username, password) => {
    try {
      if (
        username !== import.meta.env.VITE_SUPER_ADMIN_USERNAME ||
        password !== import.meta.env.VITE_SUPER_ADMIN_PASSWORD
      ) {
        toast.error(" Invalid username or password");
        return;
      }

      const userCredential = await signInWithEmailAndPassword(
        auth,
        username,
        password
      );

      localStorage.setItem("token", userCredential.user.accessToken);
      redirectToMain();
      getAllCustomer();

      const timer = setTimeout(() => {
        logout();
      }, 86400000);

      setLogoutTimer(timer);
    } catch (error) {
      console.error("Login Error:", error.message);
      toast.error(" Invalid username or password");
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("token");
      setPage("login");
      toast.info("Session expired, please login again.");

      if (logoutTimer) {
        clearTimeout(logoutTimer);
        setLogoutTimer(null);
      }
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  };

  useEffect(() => {
    getAllCustomer()
    const token = localStorage.getItem("token");
    if (token) {
      setPage("main");

      const timer = setTimeout(() => {
        logout();
      }, 86400000);

      setLogoutTimer(timer);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (logoutTimer) clearTimeout(logoutTimer);
    };
  }, [logoutTimer]);

  return (
    <div className="min-h-screen flex flex-col">
      <ToastContainer position="top-right" autoClose={1500} />

      {page === "main" && <Header logout={logout} />}
      <div className="flex-1">
        {page === "login" && <Login onLogin={login} />}
        {page === "splash" && <Splash />}
        {page === "main" && <BottomNav />}
      </div>
    </div>
  );
}
