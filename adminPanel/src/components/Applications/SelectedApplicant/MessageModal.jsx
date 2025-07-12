/* eslint-disable react/prop-types */
const MessageModal = ({ message, setMessage, onClose, onSend, onTest }) => (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Send Message to Applicants</h3>
            <textarea
                className="w-full h-28 border border-gray-300 rounded-md p-2 resize-none"
                placeholder="Write your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <div className="mt-4 flex justify-end gap-2">
                <button className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400" onClick={onClose}>
                    Cancel
                </button>
                <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600" onClick={onTest}>
                    Test
                </button>
                <button className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-600" onClick={onSend}>
                    Send
                </button>
            </div>
        </div>
    </div>
);

export default MessageModal;
