"use client";
import { useState, useRef, useEffect, useMemo } from "react";

export type DropdownItem = {
  label: string;
  value: string;
};

interface SearchDropdownProps {
  items: DropdownItem[];
  onSelect?: (value: string) => void;
  placeholder?: string;
}

const SearchDropdown = ({
  items,
  onSelect,
  placeholder = "Search ...",
}: SearchDropdownProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const filteredItems = useMemo(() => {
    return items.filter((item) =>
      item.label.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [items, searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (item: DropdownItem) => {
    setSearchQuery(item.label);
    setIsOpen(false);
    onSelect?.(item.value);
  };

  return (
    <div className="w-full max-w-md">
      <div ref={dropdownRef} className="relative">
        <input
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />

        {isOpen && (
          <div className="absolute z-10 w-full mt-2 bg-white border rounded-lg shadow max-h-60 overflow-y-auto">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <button
                  key={item.value}
                  onClick={() => handleSelect(item)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  <div className="font-medium">{item.label}</div>
                </button>
              ))
            ) : (
              <div className="px-4 py-3 text-gray-500 text-sm">
                No results found
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchDropdown;
