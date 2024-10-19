"use client";

import AddBarcode from "@/shared/components/barcodes/AddBarcode";
import BarcodeItem from "@/shared/components/barcodes/BarcodeItem";
import SearchBarcode from "@/shared/components/barcodes/SearchBarcode";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
const Barcodes: React.FC = () => {
  const [barcodes, setBarcodes] = useState<string[]>(["123456789", "987654321", "456789123"]);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [filteredBarcodes, setFilteredBarcodes] = useState<string[]>(barcodes);
  const handleAddBarcode = (newBarcode: string) => {
    setBarcodes([...barcodes, newBarcode]);
    setFilteredBarcodes([...barcodes, newBarcode]);
  };
  
  const handleEditBarcode = (index: number, newBarcode: string) => {
    const updatedBarcodes = [...barcodes];
    updatedBarcodes[index] = newBarcode;
    setBarcodes(updatedBarcodes);
    toast.success("Barcode updated successfully");
  };

  const handleSearch = (query: string) => {
    if (query.trim() === "") {
      setFilteredBarcodes(barcodes);
    } else {
      const filtered = barcodes.filter((barcode) => barcode.includes(query));
      setFilteredBarcodes(filtered);
    }
  };

  const handleDeleteBarcode = (index: number, barcode: string) => {
    const updatedBarcodes = barcodes.filter((_, i) => i !== index);
    setBarcodes(updatedBarcodes);
    toast.success("Barcode deleted successfully");
  };

  const handleDragStart = (index: number) => {
    setDraggingIndex(index);
  };

  const handleDrop = (index: number) => {
    if (draggingIndex === null) return;
    const reorderedBarcodes = [...barcodes];
    const [draggedItem] = reorderedBarcodes.splice(draggingIndex, 1);
    reorderedBarcodes.splice(index, 0, draggedItem);
    setBarcodes(reorderedBarcodes);
    setDraggingIndex(null);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className="max-w-3xl my-8 mx-auto  gap-2">
      <AddBarcode onAddBarcode={handleAddBarcode} />
      <div className="w-100 bg-white rounded-lg  p-4 space-y-8 ">
        <SearchBarcode onSearch={handleSearch} />
        {filteredBarcodes.map((barcode, index) => (
          <div
            key={barcode}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(index)}
            title="you can sort by drag and drop"
          >
            <BarcodeItem
              barcodeValue={barcode}
              index={index}
              onConfirmChange={(newBarcode) => handleEditBarcode(index, newBarcode)}
              onConfirmDelete={() => handleDeleteBarcode(index, barcode)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Barcodes;
