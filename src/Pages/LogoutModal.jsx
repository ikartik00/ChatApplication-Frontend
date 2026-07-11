import React, { useContext } from 'react'
import { PulseLoader } from 'react-spinners';
import { ChatContext } from '../context/ContextProvider';

const LogoutModal = ({ mainText, descText, cancelText, confirmText, isOpen, setIsOpen, handleLogoutAndDelete, loading }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      {/* Modal Box */}
      <div className="w-full max-w-sm p-6 bg-white rounded-2xl shadow-xl transform transition-all m-4">

        {/* Icon & Title */}
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            {/* Logout/Exit Vector Icon */}
            <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 002.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-gray-900">{mainText}</h3>
          <p className="text-sm text-gray-500 mt-2">
            {descText}
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row-reverse gap-2">
          <button
            onClick={handleLogoutAndDelete}
            className="w-full inline-flex justify-center rounded-xl cursor-pointer bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 transition-colors focus:outline-none"
          >
            {loading ? <PulseLoader size={17} color='white' /> : confirmText}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="w-full inline-flex justify-center rounded-xl cursor-pointer bg-gray-100 px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-200 transition-colors focus:outline-none"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;