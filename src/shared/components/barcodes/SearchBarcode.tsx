import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";

interface ISearchBarcodeProps {
  onSearch: (query: string) => void;
}

const SearchBarcode: React.FC<ISearchBarcodeProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div className="flex justify-between items-center px-4 gap-2">
      <h3 className="flex-1 font-bold font-mono text-lg">Barcode</h3>
      <div className="relative  flex-1">
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="Search barcodes"
          className="border p-2 rounded-full ps-10 flex w-full"
        />

        <MagnifyingGlassIcon className="h-8 w-8 absolute inset-y-0 left-0 top-1 ps-2 pointer-events-none text-gray-400" />
      </div>
    </div>
  );
};

export default SearchBarcode;
