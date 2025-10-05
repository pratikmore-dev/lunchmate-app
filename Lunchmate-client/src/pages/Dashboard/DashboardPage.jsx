import StatCard from '../../components/common/StatCard';
import { Calendar, DollarSign, TrendingUp, Package } from 'lucide-react';

function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-8 text-white shadow-lg">
        <h1 className="text-3xl font-bold mb-2">Welcome back, John! 👋</h1>
        <p className="text-indigo-100">Here's what's happening with your lunch orders today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon="📦"
          title="Orders This Month"
          value="18"
          subtitle="+3 from last month"
          bgColor="bg-blue-100"
        />
        <StatCard
          icon="💰"
          title="Total Spent"
          value="₹2,450"
          subtitle="Out of ₹3,000 budget"
          bgColor="bg-green-100"
        />
        <StatCard
          icon="🎯"
          title="Subsidy Used"
          value="₹1,350"
          subtitle="75% utilized"
          bgColor="bg-yellow-100"
        />
        <StatCard
          icon="⭐"
          title="Favorite Meals"
          value="5"
          subtitle="Most ordered"
          bgColor="bg-purple-100"
        />
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">Recent Orders</h2>
            <button className="text-indigo-600 text-sm font-medium hover:text-indigo-700">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {[
              { meal: 'Chicken Biryani', date: 'Today, 12:30 PM', price: '₹180', status: 'Delivered' },
              { meal: 'Paneer Tikka', date: 'Yesterday', price: '₹150', status: 'Delivered' },
              { meal: 'Veg Thali', date: '2 days ago', price: '₹120', status: 'Delivered' },
            ].map((order, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center text-2xl">
                    🍽️
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{order.meal}</p>
                    <p className="text-sm text-gray-500">{order.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800">{order.price}</p>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full flex items-center gap-3 p-4 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-all text-left group">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                🍜
              </div>
              <div>
                <p className="font-semibold text-gray-800">Order Today's Lunch</p>
                <p className="text-sm text-gray-500">View today's menu</p>
              </div>
            </button>

            <button className="w-full flex items-center gap-3 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-all text-left group">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                📊
              </div>
              <div>
                <p className="font-semibold text-gray-800">View Reports</p>
                <p className="text-sm text-gray-500">Monthly spending summary</p>
              </div>
            </button>

            <button className="w-full flex items-center gap-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-all text-left group">
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                ⚙️
              </div>
              <div>
                <p className="font-semibold text-gray-800">Settings</p>
                <p className="text-sm text-gray-500">Manage preferences</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Upcoming Meals Preview */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-4">This Week's Menu Preview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { day: 'Monday', meal: 'Butter Chicken', emoji: '🍗' },
            { day: 'Tuesday', meal: 'Veg Pulao', emoji: '🍚' },
            { day: 'Wednesday', meal: 'Fish Curry', emoji: '🐟' },
          ].map((item, index) => (
            <div key={index} className="p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg border border-orange-200">
              <div className="text-3xl mb-2">{item.emoji}</div>
              <p className="text-sm text-gray-500 font-medium">{item.day}</p>
              <p className="font-semibold text-gray-800">{item.meal}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;