import React, { useState } from "react";
import LOGO from  "../assets/logo.svg"

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const disabled = !username || !password;

  return (
    <div className="flex items-center justify-center min-h-screen bg-sky-100 px-4">
      <div className="card w-full max-w-sm p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src={LOGO}  
            alt="App Logo"
            className="h-16 w-16 object-contain"
          />
        </div>

        {/* Title */}
        <h2 className="text-center text-2xl font-bold mb-6 text-sky-700">
          Login
        </h2>

        {/* Inputs */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={onLogin}
            disabled={disabled}
            className={`btn btn-primary w-full ${
              disabled ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
