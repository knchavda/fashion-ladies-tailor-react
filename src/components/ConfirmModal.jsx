export default function ConfirmationModal({
  handleConfirm,
  handleCancel,
  open,
}) {
  return (
    open && (
      <div className="flex items-center justify-center h-screen">
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl shadow-lg w-96 p-4">
            {/* Title */}
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              Are you sure?
            </h2>

            {/* Message */}
            <p className="text-gray-600 mb-6">
              Do you really want to perform this action?
            </p>

            {/* Actions */}
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
