import { Home, UtensilsCrossed, ClipboardList, FileText, Settings, LogOut } from 'lucide-react';

function Sidebar() {
  const menuItems = [
    { icon: Home, label: 'Dashboard', active: true },
    { icon: UtensilsCrossed, label: 'Today\'s Menu', active: false },
    { icon: ClipboardList, label: 'My Orders', active: false },
    { icon: FileText, label: 'Reports', active: false },
    { icon: Settings, label: 'Settings', active: false },
  ];

  return (
    <div className="h-screen w-64 bg-gradient-to-b from-indigo-600 to-indigo-800 text-white flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-indigo-500">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          🍱 LunchMate
        </h1>
        <p className="text-indigo-200 text-sm mt-1">Office Lunch System</p>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={index}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                item.active
                  ? 'bg-white text-indigo-600 shadow-lg'
                  : 'hover:bg-indigo-700 text-indigo-100'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-indigo-500">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-indigo-400 rounded-full flex items-center justify-center font-bold">
            JD
          </div>
          <div>
            <p className="font-medium">John Doe</p>
            <p className="text-indigo-200 text-sm">john@company.com</p>
          </div>
        </div>
        <button className="w-full flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all text-indigo-100">
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;