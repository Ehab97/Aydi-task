import React, { useEffect, useRef, useState } from "react";
import JsBarcode from "jsbarcode";
import { PencilSquareIcon, TrashIcon, ArrowsPointingOutIcon } from "@heroicons/react/24/outline";
import Button from "../ui/Button";

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
      className="flex flex-wrap sm:flex-nowrap justify-between items-center space-x-4 w-full p-4 cursor-move hover:bg-gray-200 border-slate-950 border-t"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex gap-2 items-center">
        {isHovered ? <ArrowsPointingOutIcon className="h-4 w-4" /> : <span>{index}</span>}
        <div>
          <canvas ref={barcodeRef} className="w-32 sm:w-44 h-8 sm:h-12" />
        </div>
      </div>

      <div className="flex items-center space-x-4 sm:space-x-6 flex-wrap sm:flex-nowrap">
        {isEditing ? (
          <input
            type="text"
            value={number}
            onChange={handleInputChange}
            placeholder="Enter number"
            className="border p-2 rounded-full text-gray-950 px-4 py-2 w-full sm:w-auto"
          />
        ) : (
          <span className="text-sm sm:text-xl text-gray-950">{number}</span>
        )}

        <div className="space-x-2">
          {isEditing ? (
            <div className="flex flex-wrap items-center space-x-2">
              <Button onClick={handleSaveEdit} title="Save" className="bg-indigo-700" />
              <Button onClick={handleDiscardEdit} title="Cancel" className="bg-gray-500" />
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
