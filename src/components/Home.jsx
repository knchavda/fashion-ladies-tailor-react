import { useEffect, useState } from "react";
import AddTop from "./AddTop";
import AddSalwar from "./AddSalwar";
import AddPant from "./AddPant";
import AddChuridar from "./AddChuridar";
import AddBlouse from "./AddBlouse";
import AddPersonal from "./AddPersonal";

export default function Home({ mode, setMode, hasCustomer, setHasCustomer }) {
  const [page, setPage] = useState("home");
  const items = [
    "Add Personal",
    "Add Top",
    "Add Blouse",
    "Add Salwar",
    "Add Pent",
    "Add Churidar",
  ];

  useEffect(() => {
    if (hasCustomer) {
      switch (mode?.field) {
        case "Personal":
          return setPage("addPersonal");
        case "Top":
          return setPage("addTop");
        case "Blouse":
          return setPage("addBlouse");
        case "Pent":
          return setPage("addPant");
        case "Churidar":
          return setPage("addChuridar");
        case "Salwar":
          return setPage("addSalwar");
        default:
          return;
      }
    }
  }, [hasCustomer]);

  const onBack = () => {
    setPage("home")
    setHasCustomer(null)
    setMode(null)
  }

  // Page rendering logic
  if (page === "addTop")
    return (
      <AddTop
        onBack={onBack}
        hasCustomer={hasCustomer}
        setHasCustomer={setHasCustomer}
        setMode={setMode}
        mode={mode}
      />
    );
  if (page === "addSalwar")
    return (
      <AddSalwar
        onBack={onBack}
        hasCustomer={hasCustomer}
        setHasCustomer={setHasCustomer}
        setMode={setMode}
        mode={mode}
      />
    );
  if (page === "addPant")
    return (
      <AddPant
        onBack={onBack}
        hasCustomer={hasCustomer}
        setHasCustomer={setHasCustomer}
        setMode={setMode}
        mode={mode}
      />
    );
  if (page === "addChuridar")
    return (
      <AddChuridar
        onBack={onBack}
        hasCustomer={hasCustomer}
        setHasCustomer={setHasCustomer}
        setMode={setMode}
        mode={mode}
      />
    );
  if (page === "addBlouse")
    return (
      <AddBlouse
        onBack={onBack}
        hasCustomer={hasCustomer}
        setHasCustomer={setHasCustomer}
        setMode={setMode}
        mode={mode}
      />
    );
  if (page === "addPersonal")
    return (
      <AddPersonal
        onBack={onBack}
        hasCustomer={hasCustomer}
        setHasCustomer={setHasCustomer}
        setMode={setMode}
        mode={mode}
      />
    );

  return (
    <div className="max-w-4xl mx-auto p-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
      {items.map((item, i) => (
        <button
          key={i}
          className="card p-6 text-center text-sky-700 font-semibold hover:bg-sky-50 active:scale-[.99]"
          onClick={() => {
            if (item === "Add Top") setPage("addTop");
            else if (item === "Add Salwar") setPage("addSalwar");
            else if (item === "Add Pent") setPage("addPant");
            else if (item === "Add Churidar") setPage("addChuridar");
            else if (item === "Add Blouse") setPage("addBlouse");
            else if (item === "Add Personal") setPage("addPersonal");
          }}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
