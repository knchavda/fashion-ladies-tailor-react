import { useEffect, useState } from "react";
import CustomerTable from "./CustomerTable.jsx";
import CustomerDetailsScreen from "./CustomerDetailsScreen.jsx";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebaseConfig.jsx";

export default function Customer({ setMode, hasCustomer, setHasCustomer, setTab }) {
  const [filter, setFilter] = useState("");
  const [allCustomers, setAllCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewCustomer, setViewCustomer] = useState(null)

  const handleView = (data) => {
    setViewCustomer(data)
  };

  const fetchAllCustomers = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "customers"));

      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setAllCustomers(data);

      setLoading(false);

      return allCustomers;
    } catch (error) {
      console.error("Error fetching customers:", error);
      setLoading(false);
      return [];
    }
  };

  useEffect(() => {
    fetchAllCustomers();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-4">
      {!viewCustomer ? (
        !loading ? (
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
            <CustomerTable
              filter={filter}
              handleView={handleView}
              allCustomers={allCustomers}
              fetchAllCustomers={fetchAllCustomers}
              setMode={setMode} 
              setHasCustomer={setHasCustomer}
              hasCustomer={hasCustomer}
              setTab={setTab}
            />
          </>
        ) : (
          <div className="flex items-center justify-center h-full w-full mt-3">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-white"></div>
          </div>
        )
      ) : (
        <CustomerDetailsScreen viewCustomer={viewCustomer} setViewCustomer={setViewCustomer}/>
      )}
    </div>
  );
}
