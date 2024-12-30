import React from 'react';

interface ImportDeckModalProps {
  isOpen: boolean;
  importCode: string;
  onImport: () => void;
  onClose: () => void;
  onChange: (code: string) => void;
}

export function ImportDeckModal({
  isOpen,
  importCode,
  onImport,
  onClose,
  onChange,
}: ImportDeckModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-lg font-medium mb-4">Importar Baralho</h3>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Código do Baralho
          </label>
          <input
            type="text"
            value={importCode}
            onChange={(e) => onChange(e.target.value)}
            className="input"
            placeholder="Digite o código do baralho"
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            className="btn btn-secondary"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="btn btn-primary"
            onClick={onImport}
            disabled={!importCode}
          >
            Importar
          </button>
        </div>
      </div>
    </div>
  );
}