import React, { useMemo, useState } from "react";
import { MdEdit, MdRemoveRedEye, MdDelete } from "react-icons/md";

const initialRows = [
  { id: 1, name: "Aarti Shah", contact: "9876543210" },
  { id: 2, name: "Kiran Patel", contact: "9876500011" },
  { id: 3, name: "Rina Mehta", contact: "9825012345" },
  { id: 4, name: "Pooja Singh", contact: "9909909901" },
  { id: 5, name: "Juhi Rana", contact: "9988776655" },
  { id: 6, name: "Mansi Joshi", contact: "9012345678" },
  { id: 7, name: "Hetal Dave", contact: "9090909090" },
];

const PAGE_SIZE = 5;

export default function CustomerTable({ filter, handleView }) {
  const [rows, setRows] = useState(initialRows);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const f = (filter || "").trim();
    if (!f) return rows;
    return rows.filter((r) => r.contact.includes(f));
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
    const address = prompt("Edit address:", row.address);
    if (address === null) return;
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, name, contact, address } : r))
    );
  };

  const handleDelete = (id) => {
    if (!confirm("Delete this customer?")) return;
    setRows((prev) => prev.filter((r) => r.id !== id));
  };

  const goto = (p) => {
    const np = Math.min(Math.max(1, p), totalPages);
    setPage(np);
  };

  // reset page when filter changes
  React.useEffect(() => {
    setPage(1);
  }, [filter]);

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
                <td className="px-4 py-3">{r.name}</td>
                <td className="px-4 py-3">{r.contact}</td>
                <td className="px-4 py-3 text-right space-x-2">
                  <div className="flex items-center gap-1">
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
                <td className="px-4 py-6 text-center text-sky-700" colSpan="4">
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
          {/* <button
            className="btn px-3 py-1 bg-sky-100"
            onClick={() => goto(1)}
            disabled={page === 1}
          >
            First
          </button> */}
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
          {/* <button
            className="btn px-3 py-1 bg-sky-100"
            onClick={() => goto(totalPages)}
            disabled={page === totalPages}
          >
            Last
          </button> */}
        </div>
      </div>
    </div>
  );
}
