import React from 'react';
import { useToastStore } from '../store/toastStore';

export function Toast() {
  const { message, type, isVisible, hideToast } = useToastStore();

  if (!isVisible) return null;

  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';

  return (
    <div className={`fixed bottom-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2`}>
      <span>{message}</span>
      <button onClick={hideToast} className="ml-2 hover:text-gray-200">×</button>
    </div>
  );
}