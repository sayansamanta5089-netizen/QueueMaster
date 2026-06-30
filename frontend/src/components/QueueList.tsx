import { Customer } from "../types";
import CustomerCard from "./CustomerCard";
import EmptyState from "./EmptyState";

interface QueueListProps {
  title: string;
  customers: Customer[];
  emptyMessage?: string;
  onServe?: (id: number) => Promise<void>;
  onComplete?: (id: number) => Promise<void>;
  onDelete?: (id: number) => Promise<void>;
}

export default function QueueList({
  title,
  customers,
  emptyMessage,
  onServe,
  onComplete,
  onDelete,
}: QueueListProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs flex flex-col h-full">
      <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
        <h3 className="font-display font-bold text-lg text-gray-950">
          {title}
        </h3>
        <span className="inline-flex items-center justify-center px-2.5 py-1 text-xs font-bold font-mono leading-none text-blue-800 bg-blue-50 border border-blue-100 rounded-full">
          {customers.length}
        </span>
      </div>

      <div className="flex-1">
        {customers.length === 0 ? (
          <EmptyState message={emptyMessage} />
        ) : (
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
            {customers.map((customer) => (
              <CustomerCard
                key={customer.id}
                customer={customer}
                onServe={onServe}
                onComplete={onComplete}
                onDelete={onDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
