'use client'

import { useState } from 'react'
import { CreditCard, Plus, TrendingDown, Calendar, Download, ArrowUpRight, ArrowDownLeft, MoreVertical, Wallet, Eye, EyeOff, ChevronLeft, ChevronRight } from 'lucide-react'
import { useGetWalletQuery } from '../hooks/useGetWalletQuery'

interface Transaction {
  id: string
  type: 'debit' | 'credit'
  description: string
  amount: number
  date: string
  status: 'completed' | 'pending'
  category: string
}

const transactions: Transaction[] = [
  {
    id: '1',
    type: 'debit',
    description: 'Consultation with Dr. Sarah Johnson',
    amount: 99,
    date: '2024-03-15',
    status: 'completed',
    category: 'consultation',
  },
  {
    id: '2',
    type: 'credit',
    description: 'Referral bonus',
    amount: 50,
    date: '2024-03-10',
    status: 'completed',
    category: 'bonus',
  },
  {
    id: '3',
    type: 'debit',
    description: 'Consultation with Dr. Michael Chen',
    amount: 79,
    date: '2024-03-05',
    status: 'completed',
    category: 'consultation',
  },
  {
    id: '4',
    type: 'credit',
    description: 'Insurance reimbursement',
    amount: 199,
    date: '2024-02-28',
    status: 'completed',
    category: 'reimbursement',
  },
  {
    id: '5',
    type: 'debit',
    description: 'Lab test charges',
    amount: 120,
    date: '2024-02-20',
    status: 'pending',
    category: 'test',
  },
  {
    id: '6',
    type: 'debit',
    description: 'Prescription refill',
    amount: 45,
    date: '2024-02-15',
    status: 'completed',
    category: 'prescription',
  },
]

const ITEMS_PER_PAGE = 5

export default function WalletPage() {
  const [showBalance, setShowBalance] = useState(true)
  const {data} =useGetWalletQuery({page : 1, limit : 10, order : 'asc'})
  console.log(data)
  const [activeFilter, setActiveFilter] = useState<'all' | 'income' | 'expense'>('all')
  const [currentPage, setCurrentPage] = useState(1)

  const balance = 250.50
  const totalSpent = transactions
    .filter(t => t.type === 'debit' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0)
  const totalEarned = transactions
    .filter(t => t.type === 'credit' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0)

  const filteredTransactions = transactions.filter(t => {
    if (activeFilter === 'income') return t.type === 'credit'
    if (activeFilter === 'expense') return t.type === 'debit'
    return true
  })

  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleFilterChange = (filter: 'all' | 'income' | 'expense') => {
    setActiveFilter(filter)
    setCurrentPage(1)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Wallet & Billing</h1>
        <p className="text-slate-600">Manage your payments and track transactions</p>
      </div>

      {/* Main Balance Card */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-8 text-white space-y-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium opacity-90">Available Balance</p>
            <div className="flex items-center gap-3 mt-2">
              <p className="text-5xl font-bold">{showBalance ? `$${balance.toFixed(2)}` : '••••••'}</p>
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="p-2 hover:bg-blue-700 rounded-lg transition"
              >
                {showBalance ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <Wallet className="w-12 h-12 opacity-80" />
        </div>
        
        <div className="flex gap-3 flex-wrap">
          <button className="flex items-center gap-2 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-slate-100 transition">
            <Plus className="w-4 h-4" />
            Add Funds
          </button>
          <button className="flex items-center gap-2 px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-blue-700 transition">
            <CreditCard className="w-4 h-4" />
            Manage Cards
          </button>
          <button className="flex items-center gap-2 px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-blue-700 transition">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-600 uppercase">Total Spent</span>
            <div className="p-2 bg-red-100 rounded-lg">
              <ArrowDownLeft className="w-5 h-5 text-red-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-900">${totalSpent}</p>
          <p className="text-xs text-slate-500">Across {transactions.filter(t => t.type === 'debit').length} transactions</p>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-600 uppercase">Total Earned</span>
            <div className="p-2 bg-green-100 rounded-lg">
              <ArrowUpRight className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-900">${totalEarned}</p>
          <p className="text-xs text-slate-500">From refunds & bonuses</p>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-600 uppercase">Total Transactions</span>
            <div className="p-2 bg-blue-100 rounded-lg">
              <CreditCard className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-900">{transactions.length}</p>
          <p className="text-xs text-slate-500">All time activity</p>
        </div>
      </div>

      {/* Transaction History */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Transaction History</h2>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 border-b border-slate-200">
          {(['all', 'income', 'expense'] as const).map(filter => (
            <button
              key={filter}
              onClick={() => handleFilterChange(filter)}
              className={`px-4 py-3 font-medium text-sm capitalize transition border-b-2 ${
                activeFilter === filter
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Transactions List */}
        <div className="space-y-3">
          {data?.data.transactions.length > 0 ? (
            data?.data.transactions.map(transaction => (
              <div key={transaction.id} className="bg-white rounded-lg border border-slate-200 p-5 hover:shadow-md transition">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      transaction.type === 'debit' ? 'bg-red-100' : 'bg-green-100'
                    }`}>
                      {transaction.type === 'debit' ? (
                        <ArrowDownLeft className={`w-6 h-6 text-red-600`} />
                      ) : (
                        <ArrowUpRight className={`w-6 h-6 text-green-600`} />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900">{transaction.description}</p>
                      <p className="text-sm text-slate-500 flex items-center gap-2 mt-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(transaction.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="text-right flex items-center gap-3">
                    <div>
                      <p className={`text-lg font-bold ${
                        transaction.type === 'debit' ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {transaction.type === 'debit' ? '-' : '+'}${transaction.amount}
                      </p>
                      <p className={`text-xs font-medium ${
                        transaction.status === 'completed' ? 'text-green-600' : 'text-yellow-600'
                      }`}>
                        {transaction.status === 'completed' ? 'Completed' : 'Pending'}
                      </p>
                    </div>
                    <button className="p-2 text-slate-400 hover:text-slate-600 transition">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-slate-600">No transactions found</p>
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        {filteredTransactions.length > 0 && (
          <div className="flex items-center justify-between border-t border-slate-200 pt-4">
            <p className="text-sm text-slate-600">
              Showing <span className="font-semibold">{startIndex + 1}</span> to <span className="font-semibold">{Math.min(startIndex + ITEMS_PER_PAGE, filteredTransactions.length)}</span> of <span className="font-semibold">{filteredTransactions.length}</span> transactions
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <ChevronLeft className="w-4 h-4 text-slate-600" />
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded-lg font-medium text-sm transition ${
                      currentPage === page
                        ? 'bg-blue-600 text-white'
                        : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <ChevronRight className="w-4 h-4 text-slate-600" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Payment Methods */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Payment Methods</h2>
          <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1">
            <Plus className="w-4 h-4" />
            Add Card
          </button>
        </div>
        
        <div className="space-y-3">
          <div className="bg-white rounded-lg border border-slate-200 p-6 flex items-center justify-between hover:shadow-md transition">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <CreditCard className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-slate-900">Visa ending in 4242</p>
                <p className="text-sm text-slate-500">Expires 12/25 • Primary</p>
              </div>
            </div>
            <button className="p-2 text-slate-400 hover:text-slate-600 transition">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-6 flex items-center justify-between hover:shadow-md transition">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-100 rounded-lg">
                <CreditCard className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="font-semibold text-slate-900">Mastercard ending in 5555</p>
                <p className="text-sm text-slate-500">Expires 08/26</p>
              </div>
            </div>
            <button className="p-2 text-slate-400 hover:text-slate-600 transition">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
