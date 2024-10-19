import { PlusIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

interface IAddBarcodeProps {
  onAddBarcode: (barcodeValue: string) => void;
}

const AddBarcode: React.FC<IAddBarcodeProps> = ({ onAddBarcode }) => {
  const [newBarcode, setNewBarcode] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewBarcode(e.target.value);
  };

  const handleAddBarcode = () => {
    if (newBarcode.trim() === "") {
      alert("Please enter a barcode ");
      return;
    }
    onAddBarcode(newBarcode);
    setNewBarcode("");
  };

  return (
    <div className="flex  gap-2 items-center mb-4 w-full flex-wrap">
      <input
        type="text"
        value={newBarcode}
        onChange={handleInputChange}
        placeholder="Enter new barcode"
        className="border py-2 px-4 rounded-full flex-1"
      />
      <button
        onClick={handleAddBarcode}
        className="flex-3 text-white py-2 px-4 rounded-full flex space-x-1 bg-indigo-700"
      >
        <PlusIcon className="h-6 w-6" />
        Add Barcode
      </button>
    </div>
  );
};

export default AddBarcode;
