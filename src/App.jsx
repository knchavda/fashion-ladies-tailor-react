import { useState } from "react";
import Login from "./components/Login.jsx";
import Splash from "./components/Splash.jsx";
import BottomNav from "./components/BottomNav.jsx";
import Header from "./components/Header.jsx";

export default function App() {
  const [page, setPage] = useState("login");

  const handleLogin = () => {
    setPage("splash");
    setTimeout(() => setPage("main"), 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {page === "main" && <Header />}

      <div className="flex-1">
        {page === "login" && <Login onLogin={handleLogin} />}
        {page === "splash" && <Splash />}
        {page === "main" && <BottomNav />}
      </div>
    </div>
  );
}
