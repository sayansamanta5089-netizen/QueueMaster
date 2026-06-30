import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Customer } from "../types";
import CustomerForm from "../components/CustomerForm";
import QueueList from "../components/QueueList";
import { AlertCircle, RefreshCw } from "lucide-react";

export default function Dashboard() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all customers from the backend database
  const loadCustomers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getCustomers();
      setCustomers(data);
    } catch (err: any) {
      console.error("Error fetching customers:", err);
      setError("Failed to load queue data. Please ensure the backend server is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  // Add a new customer
  const handleAddCustomer = async (name: string) => {
    setError(null);
    try {
      await api.addCustomer(name);
      await loadCustomers();
    } catch (err: any) {
      const msg = err.response?.data?.error || "Failed to add customer. Please try again.";
      setError(msg);
      throw err; // Propagate to let the form show the error locally
    }
  };

  // Serve a customer (moves 'Waiting' -> 'Being Served')
  const handleServe = async (id: number) => {
    setError(null);
    try {
      await api.serveCustomer(id);
      await loadCustomers();
    } catch (err: any) {
      const msg = err.response?.data?.error || "Failed to serve customer.";
      setError(msg);
    }
  };

  // Complete a session (moves 'Being Served' -> 'Completed')
  const handleComplete = async (id: number) => {
    setError(null);
    try {
      await api.completeCustomer(id);
      await loadCustomers();
    } catch (err: any) {
      const msg = err.response?.data?.error || "Failed to mark customer as completed.";
      setError(msg);
    }
  };

  // Permanently delete a customer
  const handleDelete = async (id: number) => {
    setError(null);
    if (!window.confirm("Are you sure you want to permanently remove this customer from the queue?")) {
      return;
    }
    try {
      await api.deleteCustomer(id);
      await loadCustomers();
    } catch (err: any) {
      const msg = err.response?.data?.error || "Failed to delete customer.";
      setError(msg);
    }
  };

  // Categorize customers based on their queue status
  const waitingCustomers = customers.filter((c) => c.status === "Waiting");
  const beingServedCustomers = customers.filter((c) => c.status === "Being Served");
  const completedCustomers = customers.filter((c) => c.status === "Completed");

  return (
    <div className="flex-1 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-8">
      {/* Dynamic System Error Banner */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl flex items-start gap-3 shadow-xs animate-fade-in">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="font-semibold text-sm">System Notification</h4>
            <p className="text-xs sm:text-sm text-red-700 mt-1">{error}</p>
          </div>
          <button
            onClick={() => setError(null)}
            className="text-red-500 hover:text-red-700 text-xs font-semibold underline cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Form Section */}
      <section className="relative z-10">
        <CustomerForm onAdd={handleAddCustomer} />
      </section>

      {/* Loading Overlay or Dashboard Content */}
      <div className="relative">
        {loading && (
          <div className="absolute inset-0 bg-gray-50/70 z-20 flex items-center justify-center min-h-[300px] rounded-xl transition-all">
            <div className="flex flex-col items-center gap-2">
              <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
              <p className="text-sm text-gray-500 font-medium">Refreshing Queue...</p>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-display font-bold text-gray-950">
            Queue Dashboard
          </h2>
          <button
            onClick={loadCustomers}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 text-xs font-semibold text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-all disabled:opacity-60"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            Refresh Board
          </button>
        </div>

        {/* 3-Column FIFO Queue Flow */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Column 1: Waiting Queue */}
          <section id="waiting-queue-section">
            <QueueList
              title="1. Waiting Queue"
              customers={waitingCustomers}
              emptyMessage="No customers in queue."
              onServe={handleServe}
              onDelete={handleDelete}
            />
          </section>

          {/* Column 2: Being Served */}
          <section id="being-served-section">
            <QueueList
              title="2. Being Served"
              customers={beingServedCustomers}
              emptyMessage="No customers in queue."
              onComplete={handleComplete}
              onDelete={handleDelete}
            />
          </section>

          {/* Column 3: Completed */}
          <section id="completed-section">
            <QueueList
              title="3. Completed Today"
              customers={completedCustomers}
              emptyMessage="No customers in queue."
              onDelete={handleDelete}
            />
          </section>
        </div>
      </div>
    </div>
  );
}
