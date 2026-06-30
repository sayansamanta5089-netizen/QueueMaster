import { Users } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 py-6 px-4 sm:px-6 lg:px-8 shadow-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 text-white p-2.5 rounded-lg shadow-sm flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-gray-900 tracking-tight">
              QueueMaster
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Simple Queue Management for Small Businesses
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 self-start md:self-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
            Live Queue Active
          </span>
        </div>
      </div>
    </header>
  );
}
