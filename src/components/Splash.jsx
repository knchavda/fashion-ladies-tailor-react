import React from "react";
import logo from "../assets/logo.svg";

export default function Splash() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-sky-200">
      <div className="card p-6 rounded-full mb-4">
        <img src={logo} alt="Fashion Ladies Tailor" className="w-28 h-28" />
      </div>
      <h1 className="text-2xl font-extrabold text-sky-800 tracking-wide">
        Fashion Ladies Tailor
      </h1>
    </div>
  );
}
