"use client";

import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Calendar,
  Clock,
  CheckCircle,
  Users,
  RotateCw,
  Wallet,
  Search,
  Bell,
  Settings,
  LogOut,
  Plus,
  Menu,
  AlertCircle,
  TrendingUp,
  Download,
  Zap,
  FileText,
  MessageSquare,
  BarChart3,
  Grid,
  ChevronRight,
} from "lucide-react";
import ClayWrapper from "@/src/components/ui/ClayWrapper";
import { useDoctorDashboardQuery } from "../hooks/useDoctorDashboardQuery";



// Mock Data
const kpiCards = [
  {
    id: 1,
    icon: Calendar,
    label: "Today's Appointments",
    value: "8",
    comparison: "+2 from yesterday",
    color: "blue",
    key : 'todayAppointments'
  },
  {
    id: 2,
    icon: Clock,
    label: "Upcomming Appointments",
    value: "3",
    comparison: "2 new this hour",
    color: "amber",
    key : "upcomingAppointments"
  },
  {
    id: 3,
    icon: CheckCircle,
    label: "Total Appointments Completed",
    value: "5",
    comparison: "62% completion rate",
    color: "green",
    key : "totalAppointmentsCompleted"
  },
  {
    id: 4,
    icon: Users,
    label: "Todays Appointment Completed",
    value: "287",
    comparison: "+8 this month",
    color: "purple",
    key : "todaysCompletedAppointments"
  },
  {
    id: 6,
    icon: Wallet,
    label: "Wallet Balance",
    value: "$2,450",
    comparison: "+12% from last week",
    color: "emerald",
    key : 'walletBalance'
  },
];

const appointmentTrendData = [
  { date: "Mon", bookings: 12 },
  { date: "Tue", bookings: 15 },
  { date: "Wed", bookings: 18 },
  { date: "Thu", bookings: 14 },
  { date: "Fri", bookings: 22 },
  { date: "Sat", bookings: 16 },
  { date: "Sun", bookings: 10 },
];

const recentTransactions = [
  {
    id: 1,
    date: "Today 2:30 PM",
    patientName: "Sarah Johnson",
    consultation: "Video Consultation",
    amount: "$45.00",
    status: "Credited",
  },
  {
    id: 2,
    date: "Today 1:15 PM",
    patientName: "Michael Chen",
    consultation: "Audio Consultation",
    amount: "$30.00",
    status: "Credited",
  },
  {
    id: 3,
    date: "Yesterday 4:20 PM",
    patientName: "Emily Davis",
    consultation: "Follow-up Video",
    amount: "$35.00",
    status: "Credited",
  },
  {
    id: 4,
    date: "Yesterday 10:45 AM",
    patientName: "David Wilson",
    consultation: "Video Consultation",
    amount: "-$200.00",
    status: "Withdrawal",
  },
  {
    id: 5,
    date: "2 days ago 3:30 PM",
    patientName: "Lisa Anderson",
    consultation: "Audio Consultation",
    amount: "$25.00",
    status: "Credited",
  },
];

const quickActions = [
  { icon: BarChart3, label: "Manage Availability", color: "blue" },
  { icon: Calendar, label: "View Appointments", color: "emerald" },
  { icon: Users, label: "View Patients", color: "purple" },
  { icon: FileText, label: "Create Prescription", color: "pink" },
  { icon: Download, label: "Withdraw Earnings", color: "orange" },
  { icon: Settings, label: "Edit Profile", color: "gray" },
];

const getColorClasses = (color: string) => {
  const colors: { [key: string]: { bg: string; text: string; icon: string } } =
    {
      blue: { bg: "bg-blue-50", text: "text-blue-600", icon: "text-blue-500" },
      green: {
        bg: "bg-green-50",
        text: "text-green-600",
        icon: "text-green-500",
      },
      emerald: {
        bg: "bg-emerald-50",
        text: "text-emerald-600",
        icon: "text-emerald-500",
      },
      amber: {
        bg: "bg-amber-50",
        text: "text-amber-600",
        icon: "text-amber-500",
      },
      purple: {
        bg: "bg-purple-50",
        text: "text-purple-600",
        icon: "text-purple-500",
      },
      pink: { bg: "bg-pink-50", text: "text-pink-600", icon: "text-pink-500" },
      orange: {
        bg: "bg-orange-50",
        text: "text-orange-600",
        icon: "text-orange-500",
      },
      gray: { bg: "bg-gray-50", text: "text-gray-600", icon: "text-gray-500" },
    };
  return colors[color] || colors.blue;
};

const DoctorDashboardComponent = () => {
  const { data, isLoading } = useDoctorDashboardQuery();
  console.log(data);
  const [selectedPeriod, setSelectedPeriod] = useState("7days");
  console.log(data, isLoading, !data && !isLoading, isLoading)
  if(!data && isLoading){
    return null
  }

  const summary = data?.data.summary 
  return (
    <div className="flex  bg-gray-50">
      {/* Sidebar */}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-8 space-y-8">
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {kpiCards.map((card) => {
                const Icon = card.icon;
                const { bg, text, icon } = getColorClasses(card.color);
                const key = card.key as keyof typeof summary
                console.log(key, summary)
                return (
                  //   <div
                  //     key={card.id}
                  //     className="bg-white rounded-16 border border-gray-200 p-6 hover:shadow-lg transition-shadow"
                  //   >
                  //     <div className={`w-12 h-12 ${bg} rounded-lg flex items-center justify-center mb-4`}>
                  //       <Icon className={`w-6 h-6 ${icon}`} />
                  //     </div>
                  //     <p className="text-sm text-gray-500 font-medium">{card.label}</p>
                  //     <div className="mt-3 flex items-end justify-between">
                  //       <h3 className="text-3xl font-bold text-gray-900">{card.value}</h3>
                  //     </div>
                  //     <p className={`text-xs mt-3 ${text}`}>{card.comparison}</p>
                  //   </div>
                  <ClayWrapper key={card.id} variant="secondary">
                    <div className="bg-gradient-to-br  rounded-xl p-2 space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-amber-900 uppercase tracking-wide">
                          {card.label}{" "}
                        </p>
                        <div
                          className={`w-12 h-12 ${bg} rounded-lg flex items-center justify-center mb-4`}
                        >
                          <Icon className={`w-6 h-6 ${icon}`} />
                        </div>
                        {/* <Clock className="w-5 h-5 text-amber-600" /> */}
                      </div>
                      <p className={`text-4xl font-bold  ${text}`}>
                        {/* {stats?.upcoming} */} {summary[key]}
                      </p>
                      <p className={`text-xs text-amber-700 ${text}`}>
                        {card.comparison}
                      </p>
                    </div>
                  </ClayWrapper>
                );
              })}
            </div>

            {/* Charts and Transactions Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Appointment Booking Trend */}
              <div className="lg:col-span-2 bg-white rounded-16 border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-900">
                    Appointment Booking Trend
                  </h3>
                  <select
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    className="text-sm border border-gray-300 rounded-lg px-3 py-2 text-gray-700 bg-white hover:border-gray-400 focus:outline-none focus:border-blue-500"
                  >
                    <option value="7days">Last 7 Days</option>
                    <option value="30days">Last 30 Days</option>
                    <option value="month">This Month</option>
                    <option value="year">This Year</option>
                  </select>
                </div>

                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={appointmentTrendData}
                    margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="date" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#ffffff",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                      }}
                      cursor={{ stroke: "#e5e7eb" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="bookings"
                      stroke="#2563eb"
                      strokeWidth={3}
                      dot={{ fill: "#2563eb", r: 5 }}
                      activeDot={{ r: 7 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-16 border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  {quickActions.map((action) => {
                    const Icon = action.icon;
                    const { text } = getColorClasses(action.color);
                    return (
                      <button
                        key={action.label}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors group"
                      >
                        <Icon className={`w-5 h-5 flex-shrink-0 ${text}`} />
                        <span className="text-sm font-medium text-gray-700 flex-1 text-left">
                          {action.label}
                        </span>
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Wallet & Transactions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-16 border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">
                  Recent Transactions
                </h3>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 text-gray-500 font-medium">
                          Date
                        </th>
                        <th className="text-left py-3 px-4 text-gray-500 font-medium">
                          Patient Name
                        </th>
                        <th className="text-left py-3 px-4 text-gray-500 font-medium">
                          Consultation
                        </th>
                        <th className="text-left py-3 px-4 text-gray-500 font-medium">
                          Amount
                        </th>
                        <th className="text-left py-3 px-4 text-gray-500 font-medium">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentTransactions.map((transaction) => (
                        <tr
                          key={transaction.id}
                          className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                        >
                          <td className="py-3 px-4 text-gray-700">
                            {transaction.date}
                          </td>
                          <td className="py-3 px-4 text-gray-900 font-medium">
                            {transaction.patientName}
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            {transaction.consultation}
                          </td>
                          <td className="py-3 px-4 font-semibold text-gray-900">
                            {transaction.amount}
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                transaction.status === "Credited"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-orange-100 text-orange-700"
                              }`}
                            >
                              {transaction.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <button className="mt-6 w-full py-2 text-blue-600 font-medium hover:text-blue-700 transition-colors">
                  View All Transactions
                </button>
              </div>

              {/* Wallet Card */}
              <ClayWrapper>
                <div className="rounded-16 p-6 text-white">
                  <p className="text-sm font-medium text-blue-100 mb-2">
                    Wallet Balance
                  </p>
                  <h2 className="text-4xl font-bold mb-8">$2,450.00</h2>

                  <button className="w-full bg-white text-blue-600 font-semibold py-3 rounded-lg hover:bg-blue-50 transition-colors mb-4">
                    Withdraw Funds
                  </button>

                  <div className="space-y-3 pt-4 border-t border-blue-400">
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-100">This Month Earnings</span>
                      <span className="font-semibold">$8,250</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-100">Pending Amount</span>
                      <span className="font-semibold">$450</span>
                    </div>
                  </div>
                </div>
              </ClayWrapper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboardComponent;
