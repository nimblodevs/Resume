import React, { useEffect, useState } from "react";
import {
  BriefcaseBusiness,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";

const PersonalInfoForm = ({
  data,
  onChange,
  removeBackground,
  setRemoveBackground,
  className = "",
}) => {
  const [imagePreview, setImagePreview] = useState(
    typeof data.image === "string" ? data.image : null
  );

  // Update preview when data.image changes
  useEffect(() => {
    if (data.image && typeof data.image === "object") {
      const url = URL.createObjectURL(data.image);
      setImagePreview(url);

      return () => {
        URL.revokeObjectURL(url); // clean up object URL
      };
    } else if (typeof data.image === "string") {
      setImagePreview(data.image);
    } else {
      setImagePreview(null);
    }
  }, [data.image]);

  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const fields = [
    { key: "full_name", label: "Full Name", icon: User, type: "text", required: true },
    { key: "email", label: "Email Address", icon: Mail, type: "email", required: true },
    { key: "phone", label: "Phone Number", icon: Phone, type: "tel" },
    { key: "location", label: "Location", icon: MapPin, type: "text" },
    { key: "profession", label: "Profession", icon: BriefcaseBusiness, type: "text" },
    { key: "linkedin", label: "LinkedIn", icon: Linkedin, type: "url" },
    { key: "website", label: "Personal Website", icon: Globe, type: "url" },
  ];

  return (
    <div className={className}>
      <h3 className="text-lg text-gray-900 font-semibold">Personal Information</h3>
      <p className="text-sm text-gray-600 mb-4">
        Fill out your personal details below.
      </p>

      {/* Image Upload */}
      <div className="flex items-center gap-4">
        <label className="cursor-pointer">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover ring ring-slate-300 hover:opacity-80 transition-all"
            />
          ) : (
            <div className="w-16 h-16 flex items-center justify-center rounded-full border border-slate-300 text-slate-500 hover:text-slate-700 hover:border-slate-400 transition-all">
              <User className="size-8" />
            </div>
          )}

          <input
            type="file"
            accept="image/jpeg, image/png"
            className="hidden"
            onChange={(e) => {
              if (e.target.files[0]) handleChange("image", e.target.files[0]);
            }}
          />
        </label>

        {/* Remove background toggle */}
        {data.image && typeof data.image === "object" && (
          <div className="flex flex-col gap-1 text-sm">
            <span>Remove Background</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={removeBackground}
                onChange={() => setRemoveBackground((prev) => !prev)}
              />
              <div className="w-10 h-5 bg-slate-300 rounded-full peer-checked:bg-green-600 transition-colors duration-200"></div>
              <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
            </label>
          </div>
        )}
      </div>

      {/* Form Fields */}
      <div className="mt-6 space-y-4">
        {fields.map((field) => {
          const Icon = field.icon;
          return (
            <div key={field.key} className="flex flex-col">
              <label className="flex items-center gap-2 text-gray-600 text-sm font-medium">
                <Icon className="size-4" />
                {field.label}
                {field.required && <span className="text-red-500">*</span>}
              </label>
              <input
                type={field.type}
                value={data[field.key] || ""}
                onChange={(e) => handleChange(field.key, e.target.value)}
                placeholder={`Enter your ${field.label.toLowerCase()}${
                  field.required ? "" : " (optional)"
                }`}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm transition-colors"
                required={field.required}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PersonalInfoForm;
