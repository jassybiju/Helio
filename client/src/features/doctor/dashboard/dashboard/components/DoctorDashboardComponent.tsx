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
  Wallet,
  Settings,
  Download,
  FileText,
  BarChart3,
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
    key: "todayAppointments",
  },
  {
    id: 2,
    icon: Clock,
    label: "Upcomming Appointments",
    value: "3",
    comparison: "2 new this hour",
    color: "amber",
    key: "upcomingAppointments",
  },
  {
    id: 3,
    icon: CheckCircle,
    label: "Total Appointments Completed",
    value: "5",
    comparison: "62% completion rate",
    color: "green",
    key: "totalAppointmentsCompleted",
  },
  {
    id: 4,
    icon: Users,
    label: "Todays Appointment Completed",
    value: "287",
    comparison: "+8 this month",
    color: "purple",
    key: "todaysCompletedAppointments",
  },
  {
    id: 6,
    icon: Wallet,
    label: "Wallet Balance",
    value: "$2,450",
    comparison: "+12% from last week",
    color: "emerald",
    key: "walletBalance",
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
  const [selectedPeriod, setSelectedPeriod] = useState("WEEK");
  const { data, isLoading } = useDoctorDashboardQuery(selectedPeriod);
  if (!data && isLoading) {
    return null;
  }

  const appointmentTrendData = data?.data.bookingTrend.values.map((v, i) => ({
    date: data.data.bookingTrend.labels[i],
    bookings: v,
  }));
  const recentTransactions = data?.data.transactions;

  const summary = data?.data.summary!;
  return (
    <div className="flex  bg-gray-50">
      {/* Sidebar */}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-6 p-4 sm:p-6 lg:p-8">
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {kpiCards.map((card) => {
                const Icon = card.icon;
                const { bg, text, icon } = getColorClasses(card.color);
                const key = card.key as keyof typeof summary;
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
                    <div className="space-y-2 rounded-xl p-4">
                      {" "}
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
                      <p className={`text-3xl font-bold sm:text-4xl  ${text}`}>
                        {/* {stats?.upcoming} */} {summary[key]!}
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
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
              {/* Appointment Booking Trend */}
              <div className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-6 xl:col-span-2">
                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-lg font-bold text-gray-900">
                    Appointment Booking Trend
                  </h3>
                  <select
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm sm:w-auto border-gray-300 rounded-lg px-3 py-2 text-gray-700 bg-white hover:border-gray-400 focus:outline-none focus:border-blue-500"
                  >
                    <option value="WEEK">Last 7 Days</option>
                    <option value="MONTH">Last 30 Days</option>
                    <option value="YEAR">This Month</option>
                    <option value="year">This Year</option>
                  </select>
                </div>

                <div className="h-[240px] sm:h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
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
              </div>

              {/* Quick Actions */}
              <div className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-6">
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
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
              <div className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-6 xl:col-span-2">
                <h3 className="text-lg font-bold text-gray-900 mb-6">
                  Recent Transactions
                </h3>

                {/* Table */}
                <div className="-mx-4 overflow-x-auto sm:mx-0">
                  <table className="min-w-[700px] w-full text-sm">
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
                      {recentTransactions?.map((transaction) => (
                        <tr
                          key={transaction.id}
                          className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                        >
                          <td className="py-3 px-4 text-gray-700">
                            {transaction.date}
                          </td>
                          <td className="py-3 px-4 text-gray-900 font-medium">
                            {transaction.id}
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            {transaction.description}
                          </td>
                          <td className="py-3 px-4 font-semibold text-gray-900">
                            {transaction.amount}
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                transaction.type === "CREDIT"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-orange-100 text-orange-700"
                              }`}
                            >
                              {transaction.type}
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
           
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboardComponent;
