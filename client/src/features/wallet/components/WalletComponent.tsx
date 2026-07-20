"use client";

import { act, useState } from "react";
import {
  CreditCard,
  Plus,
  Calendar,
  Download,
  ArrowUpRight,
  ArrowDownLeft,
  MoreVertical,
  Wallet,
  Eye,
  EyeOff,
  PersonStandingIcon,
  AlertCircleIcon,
  IndianRupee,
} from "lucide-react";
import { useGetWalletQuery } from "../hooks/useGetWalletQuery";
import { useModal } from "@/src/hooks/useModal";
import AddMoneyModal from "./AddMoneyModal";
import Pagination from "@/src/components/Pagination";

interface Transaction {
  id: string;
  type: "debit" | "credit";
  description: string;
  amount: number;
  date: string;
  status: "completed" | "pending";
  category: string;
}

const transactions: Transaction[] = [
  {
    id: "1",
    type: "debit",
    description: "Consultation with Dr. Sarah Johnson",
    amount: 99,
    date: "2024-03-15",
    status: "completed",
    category: "consultation",
  },
  {
    id: "2",
    type: "credit",
    description: "Referral bonus",
    amount: 50,
    date: "2024-03-10",
    status: "completed",
    category: "bonus",
  },
  {
    id: "3",
    type: "debit",
    description: "Consultation with Dr. Michael Chen",
    amount: 79,
    date: "2024-03-05",
    status: "completed",
    category: "consultation",
  },
  {
    id: "4",
    type: "credit",
    description: "Insurance reimbursement",
    amount: 199,
    date: "2024-02-28",
    status: "completed",
    category: "reimbursement",
  },
  {
    id: "5",
    type: "debit",
    description: "Lab test charges",
    amount: 120,
    date: "2024-02-20",
    status: "pending",
    category: "test",
  },
  {
    id: "6",
    type: "debit",
    description: "Prescription refill",
    amount: 45,
    date: "2024-02-15",
    status: "completed",
    category: "prescription",
  },
];

const ITEMS_PER_PAGE = 5;

export default function WalletPage() {
  const [showBalance, setShowBalance] = useState(true);
  const [activeFilter, setActiveFilter] = useState<"all" | "CREDIT" | "DEBIT">(
    "all",
  );
  const [currentPage, setCurrentPage] = useState(1);
  const { data } = useGetWalletQuery({
    page: currentPage,
    limit: ITEMS_PER_PAGE,
    order: "desc",
    type: activeFilter !== "all" ? activeFilter : null,
  });
  const { open } = useModal();

  // const filteredTransactions = transactions.filter(t => {
  //   if (activeFilter === 'income') return t.type === 'credit'
  //   if (activeFilter === 'expense') return t.type === 'debit'
  //   return true
  // })

  const totalPages = Math.ceil((data?.data.totalCount ?? 0) / ITEMS_PER_PAGE);
  // const startIndex = (currentPage - 1) * ITEMS_PER_PAGE

  // const handleNextPage = () => {
  //   if (currentPage < totalPages) {
  //     setCurrentPage(currentPage + 1)
  //   }
  // }

  // const handlePreviousPage = () => {
  //   if (currentPage > 1) {
  //     setCurrentPage(currentPage - 1)
  //   }
  // }

  const handleFilterChange = (filter: "all" | "CREDIT" | "DEBIT") => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  const handleAddMoney = () => {
    open(AddMoneyModal);
  };
  return (
    <div className="space-y-6 sm:space-y-8 px-2 sm:px-0">
      {" "}
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Wallet & Billing
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          Manage your payments and track transactions
        </p>
      </div>
      {/* Main Balance Card */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-5 sm:p-8 text-white space-y-6 shadow-lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          {" "}
          <div>
            <p className="text-sm font-medium opacity-90">Available Balance</p>
            <div className="flex items-center gap-3 mt-2">
              <p className="text-3xl sm:text-5xl font-bold break-all">
                {" "}
                {showBalance ? (
                  <>{`${data?.data.balance.toFixed(2)}`}</>
                ) : (
                  "••••••"
                )}
              </p>
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="p-2 hover:bg-blue-700 rounded-lg transition"
              >
                {showBalance ? (
                  <Eye className="w-5 h-5" />
                ) : (
                  <EyeOff className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
          <Wallet className="w-12 h-12 opacity-80" />
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {" "}
          <button
            onClick={handleAddMoney}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-slate-100 transition"
          >
            <Plus className="w-4 h-4" />
            Add Funds
          </button>
        </div>
      </div>
      {/* Transaction History */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">
            Transaction History
          </h2>
        </div>

        {/* Filter Tabs */}
        <div className="border-b border-slate-200 py-3 flex flex-col sm:flex-row sm:items-center gap-2">
          {" "}
          <label htmlFor="">Filter</label>
          <select
            value={activeFilter}
            onChange={(e) =>
              handleFilterChange(e.target.value as "all" | "CREDIT" | "DEBIT")
            }
            className="w-full sm:w-auto px-4 py-2 text-sm font-medium border rounded-lg text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {(["all", "CREDIT", "DEBIT"] as const).map((filter) => (
              <option key={filter} value={filter}>
                {filter}
              </option>
            ))}
          </select>
        </div>

        {/* Transactions List */}
        <div className="space-y-3">
          {data?.data.transactions && data?.data.transactions?.length > 0 ? (
            data?.data.transactions.map((transaction) => {
              const transactionIcons: Record<string, React.ReactNode> = {
                DEBIT: <ArrowDownLeft className={`w-6 h-6 text-red-600`} />,
                CREDIT: <ArrowUpRight className={`w-6 h-6 text-green-600`} />,
                pending: <AlertCircleIcon className={`w-6 h-6 text-red-600`} />,
              };
              console.log(transaction.type);
              return (
                <div
                  key={transaction.id}
                  className="bg-white rounded-lg border border-slate-200 p-3 sm:p-4 hover:shadow-md transition"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      {/* Icon */}
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          transaction.type === "DEBIT"
                            ? "bg-red-100"
                            : "bg-green-100"
                        }`}
                      >
                        {
                          transactionIcons[
                            transaction.status === "PENDING"
                              ? "pending"
                              : transaction.type
                          ]
                        }
                      </div>

                      {/* Details */}
                      <div className="min-w-0">
                        <p className="font-semibold text-sm sm:text-base text-slate-900 truncate">
                          {transaction.description}
                        </p>

                        <p className="text-xs text-slate-500 flex items-center gap-2 mt-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(transaction.date).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            },
                          )}
                          <span className="sm:block hidden">• {transaction.status}</span>
                        </p>
                      </div>
                    </div>

                    {/* Amount */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center">
                      <p
                        className={`text-base font-bold ${
                          transaction.type === "DEBIT"
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        {transaction.type === "DEBIT" ? "-" : "+"}₹
                        {transaction.amount}
                      </p>

                      <p className="text-xs text-slate-500 sm:hidden">
                        {transaction.status}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-8">
              <p className="text-slate-600">No transactions found</p>
            </div>
          )}
        </div>
        <Pagination
          onPageChange={(page) => setCurrentPage(page)}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}
