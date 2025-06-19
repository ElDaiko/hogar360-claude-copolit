import React from "react";

interface WarningModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  confirmText?: string;
}

export const WarningModal: React.FC<WarningModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
  confirmText = "Entendido",
}) => {
  if (!isOpen) return null;

  return (
    <>
      {" "}
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-blue-500/20 backdrop-blur-md z-40 transition-all duration-300"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 transform transition-all">
          {/* Header */}
          <div className="flex items-center p-6 pb-4">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                <i className="fas fa-exclamation-triangle text-yellow-600 text-xl"></i>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 pb-4">
            <p className="text-gray-600 leading-relaxed">{message}</p>
          </div>

          {/* Actions */}
          <div className="flex justify-end p-6 pt-4 border-t border-gray-100">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
