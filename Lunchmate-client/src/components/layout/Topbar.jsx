import { Bell, Search, Menu } from 'lucide-react';

function Topbar() {
  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <button className="lg:hidden text-gray-600 hover:text-gray-900">
          <Menu size={24} />
        </button>
        <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
      </div>

      {/* Search Bar */}
      <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-4 py-2 w-96">
        <Search size={18} className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search meals, orders..."
          className="bg-transparent outline-none text-gray-700 w-full"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-all">
          <Bell size={20} className="text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User Avatar */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
            JD
          </div>
        </div>
      </div>
    </div>
  );
}

export default Topbar;