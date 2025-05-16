import { X } from "lucide-react";
import React from "react";

const Modal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  children,
  confirmText = "Confirm",
}) => {
  if (!isOpen) return null;

  return (
    <div >
      <div className="fixed inset-0 z-50 flex items-center justify-center  bg-gray-900/40">
        <div className={`w-fit  bg-white rounded-sm shadow-md overflow-hidden`} >
          {/* Header */}
          <div className="flex items-center justify-between p-2">
            <h3 className={`text-lg font-semibold  px-6 py-4 `}>{title}</h3>
            <button
              onClick={onClose}
              className="text-gray-400 font-black hover:text-gray-500 items-end text-right"
            >
              <X size={24}/>
            </button>
          </div>

          {/* Content */}
          <div className="p-4">
            {message && <p className="text-gray-600 mb-4">{message}</p>}
            {children}
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 p-4 border-t">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            {onConfirm && (
              <button
                onClick={onConfirm}
                className={`px-4 py-2 text-sm text-white bg-amber-700 rounded-md`}
              >
                {confirmText}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
