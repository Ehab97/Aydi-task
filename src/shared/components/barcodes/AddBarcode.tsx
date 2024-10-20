import { PlusIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import Button from "../ui/Button";

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
      <Button
        onClick={handleAddBarcode}
        Icon={<PlusIcon className="h-6 w-6" />}
        title="Add Barcode"
        className="bg-indigo-700"
      />
    </div>
  );
};

export default AddBarcode;
