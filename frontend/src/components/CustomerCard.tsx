import { Clock, CheckCircle2, User, Trash2, PlayCircle, CheckCircle } from "lucide-react";
import { Customer } from "../types";

interface CustomerCardProps {
  customer: Customer;
  onServe?: (id: number) => Promise<void>;
  onComplete?: (id: number) => Promise<void>;
  onDelete?: (id: number) => Promise<void>;
}

export default function CustomerCard({
  customer,
  onServe,
  onComplete,
  onDelete,
}: CustomerCardProps) {
  const formatTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    } catch {
      return "Unknown Time";
    }
  };

  const statusColors = {
    "Waiting": "bg-amber-50 text-amber-700 border-amber-200",
    "Being Served": "bg-blue-50 text-blue-700 border-blue-200 animate-pulse",
    "Completed": "bg-green-50 text-green-700 border-green-200",
  };

  const statusIcons = {
    "Waiting": <Clock className="w-4 h-4 text-amber-500" />,
    "Being Served": <PlayCircle className="w-4 h-4 text-blue-500" />,
    "Completed": <CheckCircle2 className="w-4 h-4 text-green-500" />,
  };

  return (
    <div
      id={`customer-card-${customer.id}`}
      className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs hover:shadow-sm transition-all duration-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
    >
      <div className="flex items-center gap-3.5">
        <div className={`p-3 rounded-lg bg-gray-50 text-gray-500 flex items-center justify-center border border-gray-100`}>
          <User className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-gray-950 font-display text-base break-all">
              {customer.name}
            </h3>
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                statusColors[customer.status]
              }`}
            >
              {statusIcons[customer.status]}
              {customer.status}
            </span>
          </div>
          <p className="text-xs text-gray-400 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            Joined queue: {formatTime(customer.createdAt)}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 self-end sm:self-center">
        {customer.status === "Waiting" && onServe && (
          <button
            onClick={() => onServe(customer.id)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-xs hover:shadow-sm transition-all duration-150"
          >
            <PlayCircle className="w-3.5 h-3.5" />
            Serve
          </button>
        )}

        {customer.status === "Being Served" && onComplete && (
          <button
            onClick={() => onComplete(customer.id)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold rounded-lg shadow-xs hover:shadow-sm transition-all duration-150"
          >
            <CheckCircle className="w-3.5 h-3.5" />
            Complete
          </button>
        )}

        {/* Delete option is available for any state as specified by "Mark Customer, Remove Customer" */}
        {onDelete && (
          <button
            onClick={() => onDelete(customer.id)}
            title="Delete permanently"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 text-xs font-semibold rounded-lg border border-red-100 transition-all duration-150"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
