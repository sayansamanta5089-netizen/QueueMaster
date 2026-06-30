import { Inbox } from "lucide-react";

interface EmptyStateProps {
  message?: string;
}

export default function EmptyState({ message = "No customers in queue." }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 border border-dashed border-gray-300 rounded-xl bg-gray-50/50 text-center">
      <div className="bg-gray-100 text-gray-400 p-4 rounded-full mb-3 shadow-xs">
        <Inbox className="w-8 h-8" />
      </div>
      <p className="text-gray-500 font-medium text-sm">
        {message}
      </p>
    </div>
  );
}
