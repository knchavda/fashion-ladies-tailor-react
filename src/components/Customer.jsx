import { useState } from "react";
import CustomerTable from "./CustomerTable.jsx";
import CustomerDetailsScreen from "./CustomerDetailsScreen.jsx";

export default function Customer() {
  const [filter, setFilter] = useState("");
  const [customerView, setCustomView] = useState(false);

  const handleView = (data) => {
    setCustomView(!customerView);
    console.log(data, "adasdsa");
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      {!customerView ? (
        <>
          <div className="card p-4 mb-4">
            <input
              type="number"
              placeholder="Filter by Contact Number"
              className="input"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
          <CustomerTable filter={filter} handleView={handleView} />
        </>
      ) : (
        <CustomerDetailsScreen />
      )}
    </div>
  );
}
