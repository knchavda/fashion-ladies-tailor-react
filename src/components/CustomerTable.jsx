import { useMemo, useState, useEffect } from "react";
import { MdEdit, MdRemoveRedEye, MdDelete } from "react-icons/md";
import { capitalizeFirstLetter, fetchUsers } from "../utils/helper";
import ConfirmationModal from "./ConfirmModal";
import { db } from "../firebaseConfig";
import { deleteDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useOptions } from "../context/options";

const PAGE_SIZE = 5;

export default function CustomerTable({
  filter,
  handleView,
  allCustomers,
  fetchAllCustomers,
}) {
  const [page, setPage] = useState(1);
  const [confirmModal, setConfirmModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const { setOptions } = useOptions();

  const rows = allCustomers || [];

  const filtered = useMemo(() => {
    const f = (filter || "").trim();
    if (!f) return rows;
    return rows.filter((r) =>
      r?.personalInfo["Contact Number"]?.toString().includes(f)
    );
  }, [rows, filter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const view = filtered.slice(start, start + PAGE_SIZE);

  const handleEdit = (id) => {
    const row = rows.find((r) => r.id === id);
    if (!row) return;

    const name = prompt("Edit name:", row.name);
    if (name === null) return;
    const contact = prompt("Edit contact:", row.contact);
    if (contact === null) return;
    const address = prompt("Edit address:", row.address || "");
    if (address === null) return;
  };

  const handleDelete = (payload) => {
    setConfirmModal(true);
    setSelectedCustomer(payload);
  };

  const handleConfirm = async () => {
    try {
      await deleteDoc(doc(db, "customers", selectedCustomer));
      setConfirmModal(false);
      toast.success("Customer deleted successfully");
      fetchAllCustomers();
      const allCustomers = await fetchUsers();
      setOptions(allCustomers);
      setSelectedCustomer(null);
    } catch (error) {
      console.error("Error deleting document", error);
    }
  };

  const handleCancel = () => {
    setConfirmModal(false);
  };

  const goto = (p) => {
    const np = Math.min(Math.max(1, p), totalPages);
    setPage(np);
  };

  useEffect(() => {
    setPage(1);
  }, [filter, allCustomers]);

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-sky-100 text-sky-800">
            <tr>
              <th className="text-left px-4 py-3">Name</th>
              <th className="text-left px-4 py-3">Contact</th>
              <th className="text-right px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {view.map((r) => (
              <tr key={r.id} className="border-t">
                <td className="px-4 py-3">{`${capitalizeFirstLetter(
                  r?.personalInfo["First Name"]
                )} ${capitalizeFirstLetter(r?.personalInfo["Last Name"])}`}</td>
                <td className="px-4 py-3">
                  {r?.personalInfo["Contact Number"]}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center gap-1 justify-end">
                    <button
                      className="p-1.5 bg-green-100 hover:bg-green-200 rounded"
                      onClick={() => handleView(r)}
                    >
                      <MdRemoveRedEye size={20} />
                    </button>
                    <button
                      className="p-1.5 bg-sky-100 hover:bg-sky-200 rounded"
                      onClick={() => handleEdit(r.id)}
                    >
                      <MdEdit size={20} />
                    </button>
                    <button
                      className="p-1.5 bg-red-100 hover:bg-red-200 text-red-700 rounded"
                      onClick={() => handleDelete(r.id)}
                    >
                      <MdDelete size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {view.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-center text-sky-700" colSpan="3">
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-t">
        <span className="text-xs text-sky-700">
          Page {page} of {totalPages}
        </span>
        <div className="space-x-2">
          <button
            className="btn px-3 py-1 bg-sky-100"
            onClick={() => goto(page - 1)}
            disabled={page === 1}
          >
            Prev
          </button>
          <button
            className="btn px-3 py-1 bg-sky-100"
            onClick={() => goto(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      <ConfirmationModal
        open={confirmModal}
        handleCancel={handleCancel}
        handleConfirm={handleConfirm}
      />
    </div>
  );
}
