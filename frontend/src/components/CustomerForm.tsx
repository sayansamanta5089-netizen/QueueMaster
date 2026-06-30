import React, { useState } from "react";
import { UserPlus } from "lucide-react";

interface CustomerFormProps {
  onAdd: (name: string) => Promise<void>;
}

export default function CustomerForm({ onAdd }: CustomerFormProps) {
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedName = name.trim();

    if (!trimmedName) {
      setError("Customer name is required.");
      return;
    }

    if (trimmedName.length > 50) {
      setError("Customer name must be 50 characters or less.");
      return;
    }

    try {
      setIsSubmitting(true);
      await onAdd(trimmedName);
      setName("");
    } catch (err: any) {
      const serverMsg = err.response?.data?.error || err.message || "Failed to add customer.";
      setError(serverMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setName(val);
    if (val.trim().length > 50) {
      setError("Customer name cannot exceed 50 characters.");
    } else {
      setError(null);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs max-w-2xl mx-auto">
      <h2 className="text-lg font-display font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <UserPlus className="w-5 h-5 text-blue-600" />
        Add Customer to Queue
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="customer-name" className="block text-sm font-medium text-gray-700 mb-1">
            Customer Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              id="customer-name"
              type="text"
              placeholder="e.g. Sayan Samanta"
              value={name}
              onChange={handleChange}
              disabled={isSubmitting}
              className={`w-full px-4 py-2.5 bg-gray-50 border rounded-lg focus:outline-hidden focus:ring-2 focus:bg-white transition-all duration-200 disabled:opacity-60 text-sm sm:text-base ${
                error
                  ? "border-red-300 focus:ring-red-200 focus:border-red-500"
                  : "border-gray-300 focus:ring-blue-100 focus:border-blue-500"
              }`}
            />
            <span className="absolute right-3 top-3 text-xs text-gray-400 font-mono">
              {name.trim().length}/50
            </span>
          </div>
          {error && (
            <p className="mt-1.5 text-xs text-red-600 font-medium" id="form-error">
              {error}
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting || name.trim().length > 50}
          className="w-full sm:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm transition-all duration-150 flex items-center justify-center gap-2 shadow-sm hover:shadow-md disabled:bg-blue-400 disabled:cursor-not-allowed focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
        >
          {isSubmitting ? "Adding..." : "Add Customer"}
        </button>
      </form>
    </div>
  );
}
