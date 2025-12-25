import React, { useState } from "react";
import { Check, Palette, X } from "lucide-react";

const ColorPicker = ({ selectedColor, onChange }) => {
  const colors = [
    { name: "Blue", value: "#3B82F6" },
    { name: "Indigo", value: "#6366F1" },
    { name: "Purple", value: "#8B5CF6" },
    { name: "Green", value: "#10B981" },
    { name: "Red", value: "#EF4444" },
    { name: "Orange", value: "#F97316" },
    { name: "Teal", value: "#14B8A6" },
    { name: "Gray", value: "#6B7280" },
    { name: "Black", value: "#1F2937" },
    { name: "Cyan", value: "#06B6D4" },
    { name: "Sky", value: "#0EA5E9" },
    { name: "Violet", value: "#7C3AED" },
    { name: "Pink", value: "#EC4899" },
    { name: "Emerald", value: "#059669" },
    { name: "Lime", value: "#84CC16" },
    { name: "Amber", value: "#F59E0B" },
    { name: "Rose", value: "#F43F5E" },
    { name: "OrangeRed", value: "#FF4500" },
    { name: "DeepPurple", value: "#5B21B6" },
    { name: "Slate", value: "#334155" },
    { name: "Mint", value: "#3EB489" },
    { name: "Gold", value: "#FFD700" },
    { name: "Brown", value: "#A0522D" },
    { name: "Olive", value: "#808000" },
  ];

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-sm text-purple-600 bg-gradient-to-br from-purple-50 to-purple-100 ring-purple-300 hover:ring transition-all px-3 py-2 rounded-lg"
      >
        <Palette size={16} />
        <span className="max-sm:hidden">Accent</span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-72 p-3 grid grid-cols-4 gap-3 z-10 bg-white rounded-md border border-gray-200 shadow-sm">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200 transition-all"
          >
            <X size={16} />
          </button>

          {colors.map((color) => (
            <div
              key={color.value}
              className="flex flex-col items-center cursor-pointer mr-4 mt-1"
              onClick={() => {
                onChange(color.value);
                setIsOpen(false);
              }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: color.value }}
              >
                {selectedColor === color.value && (
                  <Check size={16} className="text-white" />
                )}
              </div>
              <span className="mt-1 text-xs text-gray-600 text-center">
                {color.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
