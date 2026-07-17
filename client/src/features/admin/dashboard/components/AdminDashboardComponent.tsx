"use client";

import React from "react";
import { useGetAdminDashboardQuery } from "../hooks/useGetAdminDashboardQuery";
import { useState } from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from "recharts";
import {
  Bell,
  Settings,
  Menu,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  Users,
  Calendar,
  DollarSign,
  CheckCircle,
  Clock,
  AlertCircle,
  Eye,
  Trash2,
  Download,
  Plus,
} from "lucide-react";
import { platform } from "os";

// Mock Data
// const appointmentData = [
//   { date: 'Mon', appointments: 45 },
//   { date: 'Tue', appointments: 52 },
//   { date: 'Wed', appointments: 48 },
//   { date: 'Thu', appointments: 61 },
//   { date: 'Fri', appointments: 55 },
//   { date: 'Sat', appointments: 38 },
//   { date: 'Sun', appointments: 32 },
// ]

// const revenueData = [
//   { week: "Week 1", consultations: 8000, platform: 2000 },
//   { week: "Week 2", consultations: 9500, platform: 2500 },
//   { week: "Week 3", consultations: 8200, platform: 2200 },
//   { week: "Week 4", consultations: 10800, platform: 3000 },
// ];


// const recentAppointments = [
  // {
  //   id: 1,
  //   patient: "Sarah Johnson",
  //   doctor: "Dr. Michael Chen",
  //   specialty: "Cardiology",
  //   date: "2024-07-10",
  //   time: "2:00 PM",
  //   status: "Completed",
  // },
  // {
  //   id: 2,
  //   patient: "Emily Davis",
  //   doctor: "Dr. Sarah Miller",
  //   specialty: "Orthopedics",
  //   date: "2024-07-10",
  //   time: "3:30 PM",
  //   status: "Ongoing",
  // },
  // {
  //   id: 3,
  //   patient: "John Smith",
  //   doctor: "Dr. David Wilson",
  //   specialty: "Neurology",
  //   date: "2024-07-11",
  //   time: "10:00 AM",
  //   status: "Confirmed",
  // },
  // {
  //   id: 4,
  //   patient: "Jessica Brown",
  //   doctor: "Dr. Michael Chen",
  //   specialty: "Cardiology",
  //   date: "2024-07-11",
  //   time: "11:30 AM",
  //   status: "Confirmed",
  // },
  // {
  //   id: 5,
  //   patient: "Robert Taylor",
  //   doctor: "Dr. Emma White",
  //   specialty: "Pediatrics",
  //   date: "2024-07-11",
  //   time: "1:00 PM",
  //   status: "Cancelled",
  // },
// ];

// const pendingDoctors = [
//   {
//     id: 1,
//     name: "Dr. Lisa Anderson",
//     specialty: "Dermatology",
//     appliedDate: "2024-07-08",
//     status: "Pending",
//   },
//   {
//     id: 2,
//     name: "Dr. James Martinez",
//     specialty: "Psychiatry",
//     appliedDate: "2024-07-09",
//     status: "Pending",
//   },
//   {
//     id: 3,
//     name: "Dr. Susan Lee",
//     specialty: "Ophthalmology",
//     appliedDate: "2024-07-09",
//     status: "Pending",
//   },
// ];

// const transactions = [
//   {
//     id: 1,
//     user: "Dr. Michael Chen",
//     type: "Income",
//     amount: 450,
//     date: "2024-07-10",
//   },
//   {
//     id: 2,
//     user: "Dr. Sarah Miller",
//     type: "Income",
//     amount: 380,
//     date: "2024-07-10",
//   },
//   {
//     id: 3,
//     user: "Patient Refund",
//     type: "Refund",
//     amount: -100,
//     date: "2024-07-09",
//   },
//   {
//     id: 4,
//     user: "Dr. David Wilson",
//     type: "Income",
//     amount: 520,
//     date: "2024-07-09",
//   },
// ];

function AdminDashboardComponent() {
  const [timeFilter, setTimeFilter] = useState<"WEEK" | "MONTH" | "YEAR">(
    "WEEK",
  );
  const { data } = useGetAdminDashboardQuery();

  const stats = data?.data.statistics;
  const appointmentAnalytics = data?.data.appointmentAnalytics;
  const appointmentStatus = data?.data.appointmentStatusDistribution;
  const appointmentData = appointmentAnalytics?.labels.map((x, i) => ({
    date: x,
    appointments: appointmentAnalytics.appointments[i],
  }));

  const appointmentStatusData = [
    { name: "Confirmed", value: appointmentStatus?.confirmed, color: "#3b82f6" },
    { name: "Completed", value: appointmentStatus?.completed, color: "#10b981" },
    { name: "Ongoing", value: appointmentStatus?.ongoing, color: "#8b5cf6" },
    // { name: "No Show", value: appointmentStatus?.noShow, color: "#f59e0b" },
    { name: "Expired", value: appointmentStatus?.expired, color: "#6b7280" },
    { name: "Cancelled", value: appointmentStatus?.cancelled, color: "#ef4444" },
  ];

const userGrowthData = data?.data.userGrowth.labels.map((x,i)=>({label : x, doctors : data.data.userGrowth.doctors[i], patients : data.data.userGrowth.patients[i]}))
// const revenueData = [
//   { week: "Week 1", consultations: 8000, platform: 2000 },
//   { week: "Week 2", consultations: 9500, platform: 2500 },
//   { week: "Week 3", consultations: 8200, platform: 2200 },
//   { week: "Week 4", consultations: 10800, platform: 3000 },
// ];
const revenueData = data?.data.revenueAnalytics.labels.map((x,i)=>({label : x, platform: data.data.revenueAnalytics.platformRevenue[i]}))
//   [
//   { month: "Jan", doctors: 120, patients: 450 },
//   { month: "Feb", doctors: 135, patients: 520 },
//   { month: "Mar", doctors: 155, patients: 620 },
//   { month: "Apr", doctors: 180, patients: 750 },
//   { month: "May", doctors: 210, patients: 890 },
//   { month: "Jun", doctors: 245, patients: 1050 },
// ];

  return (
    <div className="flex  bg-gray-50">
      {/* Sidebar */}

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}

        {/* Dashboard Content */}
        <div className="p-8 space-y-8">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Total Doctors",
                value: data?.data.statistics.totalDoctors,
                trend: "+12%",
                icon: "👨‍⚕️",
                color: "from-blue-50 to-blue-100",
                iconColor: "text-blue-600",
              },
              {
                title: "Total Patients",
                value: data?.data.statistics.totalPatients,
                trend: "+8%",
                icon: "👥",
                color: "from-purple-50 to-purple-100",
                iconColor: "text-purple-600",
              },
              {
                title: "Total Appointments",
                value: stats?.totalAppointments,
                trend: "+15%",
                icon: "📅",
                color: "from-green-50 to-green-100",
                iconColor: "text-green-600",
              },
              {
                title: "Completed",
                value: stats?.completedAppointments,
                trend: "+5%",
                icon: "✓",
                color: "from-emerald-50 to-emerald-100",
                iconColor: "text-emerald-600",
              },
              {
                title: "Upcoming",
                value: stats?.upcomingAppointments,
                trend: "+3%",
                icon: "⏱️",
                color: "from-amber-50 to-amber-100",
                iconColor: "text-amber-600",
              },
              {
                title: "Today's Appointments",
                value: stats?.todayAppointments,
                trend: "+2",
                icon: "🎯",
                color: "from-pink-50 to-pink-100",
                iconColor: "text-pink-600",
              },
              {
                title: "Platform Revenue",
                value: "$45.8K",
                trend: "+22%",
                icon: "💰",
                color: "from-green-50 to-green-100",
                iconColor: "text-green-600",
              },
              // {
              //   title: "Pending Approvals",
              //   value: "12",
              //   trend: "+3",
              //   icon: "⏳",
              //   color: "from-red-50 to-red-100",
              //   iconColor: "text-red-600",
              // },
            ].map((card, idx) => (
              <div
                key={idx}
                className={`bg-gradient-to-br ${card.color} rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">
                      {card.title}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {card.value}
                    </p>
                 
                    {/* </p> */}
                  </div>
                  <div className={`text-3xl ${card.iconColor}`}>
                    {card.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <select
            value={timeFilter}
            onChange={(e) =>
              setTimeFilter(e.target.value as "WEEK" | "MONTH" | "YEAR")
            }
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <option value="WEEK">This Week</option>
            <option value="MONTH">This Month</option>
            <option value="YEAR">This Year</option>
          </select>
          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Appointment Analytics */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Appointment Analytics
                  </h2>
                  <p className="text-sm text-gray-600">
                    Weekly appointment trends
                  </p>
                </div>
                {/* <select
                  value={appointmentFilter}
                  onChange={(e) => setAppointmentFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <option value="today">Today</option>
                  <option value="7days">Last 7 Days</option>
                  <option value="30days">Last 30 Days</option>
                  <option value="monthly">Monthly</option>
                </select> */}
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={appointmentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "12px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="appointments"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ fill: "#3b82f6", r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Revenue Analytics */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Revenue Analytics
                  </h2>
                  <p className="text-2xl font-bold text-green-600 mt-1">
                    $42,500
                  </p>
                </div>
                {/* <select
                  value={revenueFilter}
                  onChange={(e) => setRevenueFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select> */}
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="label" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "12px",
                    }}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="consultations"
                    stackId="1"
                    stroke="#3b82f6"
                    fill="#dbeafe"
                  />
                  <Area
                    type="monotone"
                    dataKey="platform"
                    stackId="1"
                    stroke="#8b5cf6"
                    fill="#ede9fe"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Charts Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Appointment Status */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all">
              <h2 className="text-lg font-bold text-gray-900 mb-6">
                Appointment Status Distribution
              </h2>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={appointmentStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name} ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {appointmentStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* User Growth */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    User Growth
                  </h2>
                  <p className="text-sm text-gray-600">
                    New doctors vs patients
                  </p>
                </div>
                {/* <select
                  value={userGrowthFilter}
                  onChange={(e) => setUserGrowthFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select> */}
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="label" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "12px",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="doctors"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ fill: "#3b82f6", r: 5 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="patients"
                    stroke="#8b5cf6"
                    strokeWidth={3}
                    dot={{ fill: "#8b5cf6", r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          

          {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Transactions */}

            {/* Quick Actions */}
            {/* <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all">
              <h2 className="text-lg font-bold text-gray-900 mb-6">
                Quick Actions
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  {
                    icon: "✓",
                    label: "Verify Doctors",
                    color: "bg-blue-50 text-blue-600",
                  },
                  {
                    icon: "👥",
                    label: "Manage Users",
                    color: "bg-purple-50 text-purple-600",
                  },
                  {
                    icon: "📊",
                    label: "View Reports",
                    color: "bg-green-50 text-green-600",
                  },
                  {
                    icon: "📅",
                    label: "View Appointments",
                    color: "bg-pink-50 text-pink-600",
                  },
                  {
                    icon: "💰",
                    label: "Wallet Management",
                    color: "bg-amber-50 text-amber-600",
                  },
                  {
                    icon: "📢",
                    label: "Broadcast Notification",
                    color: "bg-red-50 text-red-600",
                  },
                ].map((action, idx) => (
                  <button
                    key={idx}
                    className={`${action.color} p-4 rounded-lg hover:shadow-md transition-all font-semibold text-sm`}
                  >
                    <div className="text-2xl mb-2">{action.icon}</div>
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          </div> */} 

          {/* Recent Notifications */}
    
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardComponent;
