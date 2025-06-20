/* RemoveModal.jsx */
import React from "react";

const RemoveModal = ({ isOpen, onClose, onConfirm, remark, setRemark }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded shadow-md w-96">
                <h2 className="text-lg font-semibold mb-4">Remove Applicant</h2>
                <textarea
                    className="w-full p-2 border rounded mb-4"
                    rows={4}
                    placeholder="Enter remark..."
                    value={remark}
                    onChange={(e) => setRemark(e.target.value)}
                />
                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="px-3 py-1 bg-gray-300 rounded">Cancel</button>
                    <button
                        onClick={onConfirm}
                        className="px-3 py-1 bg-red-500 text-white rounded"
                    >
                        Remove
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RemoveModal;
