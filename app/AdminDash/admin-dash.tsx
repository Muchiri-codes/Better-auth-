"use client";
import { signOut } from "better-auth/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth } from "../lib/auth";
import { LayoutDashboard, Users, Sprout, CloudSun, AlertTriangle, TrendingUp } from "lucide-react";

export default function AgriAdvisorDashboard({ session }: { session: any }) {
  const user = session.user;

  // Mock Data
  const stats = [
    { name: 'Active Farms', value: '24', icon: Sprout, color: 'text-green-600' },
    { name: 'Pending Advice', value: '5', icon: AlertTriangle, color: 'text-amber-600' },
    { name: 'Yield Forecast', value: '+12%', icon: TrendingUp, color: 'text-blue-600' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* 1. Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col">
        <h1 className="text-xl font-bold text-green-700 flex items-center gap-2 mb-8">
          <Sprout /> AgriAdvisor
        </h1>
        <nav className="space-y-2 flex-1">
          <NavItem icon={<LayoutDashboard size={20}/>} label="Overview" active />
          <NavItem icon={<Users size={20}/>} label="My Farmers" />
          <NavItem icon={<CloudSun size={20}/>} label="Weather & Soil" />
        </nav>
      </aside>

      {/* 2. Main Content */}
      <main className="flex-1 overflow-y-auto p-8 pt-20 md:pt-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Advisor Portal</h2>
            <p className="text-gray-500 text-sm">Welcome back, {user.name}. Here is what’s happening today.</p>
          </div>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
            + New Assessment
          </button>
        </header>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((item) => (
            <div key={item.name} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm font-medium">{item.name}</p>
                  <h3 className="text-3xl font-bold mt-1">{item.value}</h3>
                </div>
                <item.icon className={item.color} size={24} />
              </div>
            </div>
          ))}
        </div>

        {/* Active Farms Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h3 className="font-bold text-gray-800">Active Client Monitoring</h3>
          </div>
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-medium">
              <tr>
                <th className="px-6 py-3">Farm Name</th>
                <th className="px-6 py-3">Crop</th>
                <th className="px-6 py-3">Soil Moisture</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <TableRow name="Green Valley" crop="Wheat" moisture="34%" status="Healthy" />
              <TableRow name="Sunset Orchards" crop="Apples" moisture="18%" status="Needs Irrigation" warning />
              <TableRow name="Hillside Acres" crop="Corn" moisture="28%" status="Healthy" />
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

// Helper Components
function NavItem({ icon, label, active = false }: any) {
  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition ${
      active ? "bg-green-50 text-green-700" : "text-gray-500 hover:bg-gray-50"
    }`}>
      {icon}
      <span className="font-medium">{label}</span>
    </div>
  );
}

function TableRow({ name, crop, moisture, status, warning = false }: any) {
  return (
    <tr className="text-sm text-gray-700 hover:bg-gray-50 transition">
      <td className="px-6 py-4 font-medium">{name}</td>
      <td className="px-6 py-4">{crop}</td>
      <td className="px-6 py-4">{moisture}</td>
      <td className="px-6 py-4">
        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
          warning ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
        }`}>
          {status}
        </span>
      </td>
      <td className="px-6 py-4">
        <button className="text-blue-600 hover:underline">View Map</button>
      </td>
    </tr>
  );
}