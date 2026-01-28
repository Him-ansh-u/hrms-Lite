"use client";
import { FiBell, FiUser } from "react-icons/fi";
import FormSidebar from "./FormSidebar";
import Button from "./Button";
import { useState } from "react";
import AddEmployeeForm from "./forms/AddEmployeeForm";

export default function Header({
  title,
  count,
}: {
  title: string;
  count: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="flex items-center justify-between p-4">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <div className="px-2 py-1 border border-gray-400 rounded-md">
            Count: {count}
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="primary" onClick={() => setIsOpen(true)}>
              Add {title}
            </Button>
            <button className="p-2 rounded hover:bg-gray-100">
              <FiBell size={22} />
            </button>

            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
              <FiUser />
            </div>
          </div>
        </div>
      </header>
      <FormSidebar
        title={`Add ${title}`}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <AddEmployeeForm onClose={() => setIsOpen(false)} />
      </FormSidebar>
    </>
  );
}
