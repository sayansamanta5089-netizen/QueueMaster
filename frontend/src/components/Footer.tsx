export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto py-6 px-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-gray-500">
        <div>
          <p>© {currentYear} QueueMaster. All rights reserved.</p>
        </div>
        <div className="flex items-center gap-1.5">
          <span>Built for Small Businesses</span>
          <span className="text-gray-300">•</span>
          <span>Fast FIFO Queue System</span>
        </div>
      </div>
    </footer>
  );
}
