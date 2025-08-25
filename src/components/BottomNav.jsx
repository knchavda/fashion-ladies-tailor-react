import React, { useState } from "react";
import Home from "./Home.jsx";
import Customer from "./Customer.jsx";

export default function BottomNav() {
  const [tab, setTab] = useState("home");

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow overflow-auto pb-24">
        {tab === "home" && <Home />}
        {tab === "customer" && <Customer />}
      </div>

      {/* Bottom Sheet Style Nav */}
      <div className="fixed bottom-0 left-0 right-0">
        <div className="mx-auto max-w-md">
          <div className="bg-white shadow-soft rounded-t-2xl border-t flex justify-around py-3">
            <button
              onClick={() => setTab("home")}
              className={`px-4 py-2 rounded-xl ${tab === "home" ? "bg-sky-100 text-sky-700 font-semibold" : "text-sky-700"}`}
            >
              Home
            </button>
            <button
              onClick={() => setTab("customer")}
              className={`px-4 py-2 rounded-xl ${tab === "customer" ? "bg-sky-100 text-sky-700 font-semibold" : "text-sky-700"}`}
            >
              Customer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
