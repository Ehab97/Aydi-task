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
    <div className="flex flex-wrap sm:flex-nowrap gap-2 items-center mb-4 w-full px-2">
      <input
        type="text"
        value={newBarcode}
        onChange={handleInputChange}
        placeholder="Enter new barcode"
        className="border py-2 px-4 rounded-full flex-1 w-full sm:w-auto"
      />
      <button
        onClick={handleAddBarcode}
        className="flex items-center justify-center text-white py-2 px-4 rounded-full w-full sm:w-auto bg-indigo-700 mt-2 sm:mt-0"
      >
        <PlusIcon className="h-6 w-6" />
        <span className="ml-1">Add Barcode</span>
      </button>
    </div>
  );
};

export default AddBarcode;
