import { MdEdit } from "react-icons/md";

export default function EditModal({
  handleCancel,
  open,
  setHasCustomer,
  selectedCustomer,
  setTab,
  setMode,
}) {
  const fields = ["Personal", "Top", "Blouse", "Salwar", "Pent", "Churidar"];

  const getCustomerType = (type) => {
    const infoMap = {
      Personal: selectedCustomer?.personalInfo,
      Top: selectedCustomer?.topInfo,
      Blouse: selectedCustomer?.blouseInfo,
      Pent: selectedCustomer?.pentInfo,
      Churidar: selectedCustomer?.churidarInfo,
      Salwar: selectedCustomer?.salwarInfo,
    };

    switch (type) {
      case "Personal":
      case "Top":
      case "Blouse":
      case "Pent":
      case "Churidar":
      case "Salwar":
        setHasCustomer({ data: infoMap[type], id: selectedCustomer?.id });
        setMode({ type: "edit", field: type });
        setTab("home");
        return;
      default:
        return;
    }
  };
  return (
    open && (
      <div className="flex items-center justify-center h-screen">
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl shadow-lg w-96 p-4">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              Edit Details
            </h2>

            <div>
              {fields.map((item) => {
                return (
                  <div className="flex items-center justify-between card p-3 mb-3">
                    <p className="text-gray-600 font-semibold">{item} detail</p>
                    <div>
                      <MdEdit
                        className="text-gray-600"
                        onClick={() => getCustomerType(item)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
