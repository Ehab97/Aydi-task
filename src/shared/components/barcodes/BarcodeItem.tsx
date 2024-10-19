import React, { useEffect, useRef, useState } from "react";
import JsBarcode from "jsbarcode";
import {
  PencilSquareIcon,
  TrashIcon,
  ArrowsPointingOutIcon,
} from "@heroicons/react/24/outline";

interface IBarcodeItem {
  barcodeValue: string;
  index: number;
  onConfirmChange: (newBarcode: string) => void;
  onConfirmDelete: () => void;
}

const BarcodeItem: React.FC<IBarcodeItem> = ({ barcodeValue, index, onConfirmChange, onConfirmDelete }) => {
  const [number, setNumber] = useState(barcodeValue);
  const [isEditing, setIsEditing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const barcodeRef = useRef(null);

  useEffect(() => {
    if (barcodeRef.current) {
      JsBarcode(barcodeRef.current, number, {
        format: "CODE128",
        displayValue: false,
        width: 4,
        height: 60,
      });
    }
  }, [number]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumber(e.target.value);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    setIsEditing(false);
    onConfirmChange(number);
  };

  const handleDiscardEdit = () => {
    setNumber(barcodeValue);
    setIsEditing(false);
  };

  const handleDelete = () => {
    const confirm = window.confirm("Are you sure you want to delete this barcode?");
    if (confirm) {
      onConfirmDelete();
    }
  };

  return (
    <div
      className="flex justify-between items-center space-x-4 w-100 p-4 cursor-move hover:bg-gray-200 border-slate-950 border-t"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex gap-2 items-center">
        {isHovered ? <ArrowsPointingOutIcon className="h-4 w-4" /> : <span>{index}</span>}
        <div>
          <canvas ref={barcodeRef} className="w-44 h-12" />
        </div>
      </div>

      <div className="flex items-center space-x-6">
        {!isEditing && <span className="text-xl text-gray-950">{number}</span>}

        <div className="space-x-2">
          {isEditing ? (
            <div className="flex items-center space-x-1">
              <input
                type="text"
                value={number}
                onChange={handleInputChange}
                placeholder="Enter number"
                className="border p-2 rounded-full text-gray-950 px-4 py-2"
              />
              <button onClick={handleSaveEdit} className="bg-indigo-700 text-white px-4 py-2 rounded-full">
                Save
              </button>
              <button onClick={handleDiscardEdit} className="bg-gray-500 text-white px-4 py-2 rounded-full">
                cancel
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-1">
              <PencilSquareIcon onClick={handleEdit} className="text-indigo-700 h-5 w-5 cursor-pointer" />
              <TrashIcon onClick={handleDelete} className="text-red-700 h-5 w-5 cursor-pointer" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BarcodeItem;
