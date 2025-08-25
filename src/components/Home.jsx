import { useState } from "react";
import AddTop from "./AddTop";
import AddSalwar from "./AddSalwar";
import AddPant from "./AddPant";
import AddChuridar from "./AddChuridar";
import AddBlouse from "./AddBlouse";
import AddPersonal from "./AddPersonal";

export default function Home() {
  const [page, setPage] = useState("home"); // home | addTop | addSalwar | addPant | addChuridar
  const items = ["Add Personal", "Add Top", "Add Blouse", "Add Salwar","Add Pant", "Add Churidar"];

  // Page rendering logic
  if (page === "addTop") return <AddTop onBack={() => setPage("home")} />;
  if (page === "addSalwar") return <AddSalwar onBack={() => setPage("home")} />;
  if (page === "addPant") return <AddPant onBack={() => setPage("home")} />;
  if (page === "addChuridar") return <AddChuridar onBack={() => setPage("home")} />;
  if (page === "addBlouse") return <AddBlouse onBack={() => setPage("home")} />;
  if (page === "addPersonal") return <AddPersonal onBack={() => setPage("home")} />;

  // Home page UI
  return (
    <div className="max-w-4xl mx-auto p-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
      {items.map((item, i) => (
        <button
          key={i}
          className="card p-6 text-center text-sky-700 font-semibold hover:bg-sky-50 active:scale-[.99]"
          onClick={() => {
            if (item === "Add Top") setPage("addTop");
            else if (item === "Add Salwar") setPage("addSalwar");
            else if (item === "Add Pant") setPage("addPant");
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
