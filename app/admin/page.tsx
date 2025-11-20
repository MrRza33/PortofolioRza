"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  ArrowUpRight, 
  Users, 
  Eye, 
  FileText, 
  Briefcase 
} from "lucide-react";
import { formatDate } from "../../lib/utils";

// Mock Data
const stats = [
  { label: "Total Views", value: "45.2K", trend: "+12%", icon: Eye },
  { label: "Active Projects", value: "12", trend: "+2", icon: Briefcase },
  { label: "Blog Posts", value: "28", trend: "+4", icon: FileText },
  { label: "Unique Visitors", value: "14.5K", trend: "+8%", icon: Users },
];

const recentActivity = [
  { id: 1, action: "New project added", target: "Fintech Dashboard", time: "2 hours ago", user: "Admin" },
  { id: 2, action: "Blog post published", target: "The Future of AI", time: "5 hours ago", user: "Admin" },
  { id: 3, action: "Brand logo updated", target: "Stripe", time: "1 day ago", user: "Admin" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <button className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-md text-sm font-medium hover:opacity-90 transition-opacity">
          Download Report
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-gray-50 dark:bg-zinc-800 rounded-lg text-gray-500 dark:text-gray-400">
                  <Icon size={20} />
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full flex items-center gap-1">
                  {stat.trend} <ArrowUpRight size={12} />
                </span>
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl font-bold tracking-tight">{stat.value}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{stat.label}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold">Recent Activity</h2>
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 overflow-hidden">
            {recentActivity.map((activity, i) => (
              <div 
                key={activity.id}
                className={`p-4 flex items-center justify-between ${i !== recentActivity.length - 1 ? 'border-b border-gray-100 dark:border-zinc-800' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center text-xs font-bold">
                    {activity.user.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {activity.action} <span className="text-gray-500 dark:text-gray-500">on {activity.target}</span>
                    </p>
                    <p className="text-xs text-gray-400">{activity.time}</p>
                  </div>
                </div>
                <button className="text-xs text-gray-400 hover:text-black dark:hover:text-white">
                  View
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">System Status</h2>
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 p-6 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Database</span>
              <span className="text-green-600 font-medium">Healthy</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">API Latency</span>
              <span className="text-gray-900 dark:text-white font-medium">24ms</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Storage</span>
              <span className="text-gray-900 dark:text-white font-medium">45% Used</span>
            </div>
            <div className="pt-4 border-t border-gray-100 dark:border-zinc-800">
               <p className="text-xs text-gray-400">Last checked: {formatDate(new Date())}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
