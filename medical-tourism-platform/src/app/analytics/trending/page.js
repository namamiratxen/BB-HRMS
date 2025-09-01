'use client';

import { useState } from 'react';
import { 
  Activity,
  BarChart3,
  Users,
  FileText,
  Calendar,
  DollarSign,
  Settings,
  TrendingUp,
  Plus,
  Search,
  Filter,
  Download,
  MoreHorizontal,
  ArrowLeft
} from 'lucide-react';

export default function TrendingPage() {
  const [selectedChart, setSelectedChart] = useState('column');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
        <div className="flex items-center h-16 px-6 border-b">
          <Activity className="w-8 h-8 text-emerald-500 mr-2" />
          <div>
            <span className="text-lg font-bold text-gray-900">Med. Pharma</span>
            <div className="text-sm text-gray-600">Analytics Hub</div>
          </div>
        </div>
        
        <nav className="mt-6">
          <div className="px-6 mb-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">BOARDS</p>
          </div>
          <div className="space-y-1">
            <a href="/admin/dashboard" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50">
              <BarChart3 className="w-5 h-5 mr-3" />
              Dashboard
            </a>
            <a href="#" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50">
              <TrendingUp className="w-5 h-5 mr-3" />
              Sample submissions
            </a>
            <a href="#" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50">
              <FileText className="w-5 h-5 mr-3" />
              Results
            </a>
            <a href="#" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50">
              <FileText className="w-5 h-5 mr-3" />
              Quotes
              <span className="ml-auto bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">5</span>
            </a>
            <a href="#" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50">
              <FileText className="w-5 h-5 mr-3" />
              Invoices
            </a>
            <a href="#" className="flex items-center px-6 py-3 text-gray-700 bg-emerald-50 border-r-2 border-emerald-500">
              <TrendingUp className="w-5 h-5 mr-3" />
              Trending
              <span className="ml-auto bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">2</span>
            </a>
            <a href="#" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50">
              <Plus className="w-5 h-5 mr-3" />
              Sample registration
            </a>
          </div>

          <div className="px-6 mt-8 mb-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">OTHER</p>
          </div>
          <div className="space-y-1">
            <a href="#" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50">
              <Settings className="w-5 h-5 mr-3" />
              Settings
            </a>
            <a href="#" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50">
              <FileText className="w-5 h-5 mr-3" />
              Integrations
            </a>
            <a href="#" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50">
              <Activity className="w-5 h-5 mr-3" />
              Support
            </a>
          </div>
        </nav>

        {/* User Profile */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">SM</span>
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">Sarah Milley</p>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b h-16 flex items-center justify-between px-8">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">Trending</h1>
            <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">○</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            <button className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
              + Sample registration
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Column Chart */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-emerald-500" />
                  <h2 className="text-xl font-semibold text-gray-900">Column chart</h2>
                  <span className="text-sm text-gray-500">Jan 28 - Jan 29</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="text-gray-400 hover:text-gray-600">
                    <Download className="w-4 h-4" />
                  </button>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Filter className="w-4 h-4" />
                  </button>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Chart */}
              <div className="h-64 flex items-end justify-center space-x-4 p-4">
                <div className="flex flex-col items-center">
                  <div className="bg-green-400 w-12 rounded-t" style={{height: '25%'}}></div>
                  <span className="text-xs text-gray-600 mt-2">Apple Green</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-cyan-400 w-12 rounded-t" style={{height: '55%'}}></div>
                  <span className="text-xs text-gray-600 mt-2">Apple Golden</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-blue-400 w-12 rounded-t" style={{height: '35%'}}></div>
                  <span className="text-xs text-gray-600 mt-2">Apple Red</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-purple-400 w-12 rounded-t" style={{height: '90%'}}></div>
                  <span className="text-xs text-gray-600 mt-2">Apple Crisp</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-yellow-400 w-12 rounded-t" style={{height: '80%'}}></div>
                  <span className="text-xs text-gray-600 mt-2">Apple Gala</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-red-400 w-12 rounded-t" style={{height: '45%'}}></div>
                  <span className="text-xs text-gray-600 mt-2">Apple Honey</span>
                </div>
              </div>
            </div>

            {/* Money Spent */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-5 h-5 text-emerald-500" />
                  <h2 className="text-xl font-semibold text-gray-900">Money spent</h2>
                  <span className="text-sm text-gray-500">Jan 2025 - Dec 2025</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="text-gray-400 hover:text-gray-600">
                    <Download className="w-4 h-4" />
                  </button>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Filter className="w-4 h-4" />
                  </button>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-3xl font-bold text-gray-900">100 000.00 EUR</div>
                <div className="flex items-center text-green-600 text-sm">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  40%
                </div>
              </div>

              {/* Line Chart Representation */}
              <div className="h-32 relative">
                <svg className="w-full h-full">
                  <polyline
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                    points="0,100 50,80 100,60 150,40 200,30 250,20 300,15"
                  />
                </svg>
              </div>
            </div>

            {/* Scatter Plot */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-emerald-500" />
                  <h2 className="text-xl font-semibold text-gray-900">Scatter plot</h2>
                  <span className="text-sm text-gray-500">Jan 28 - Jan 29</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="text-gray-400 hover:text-gray-600">
                    <Download className="w-4 h-4" />
                  </button>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Filter className="w-4 h-4" />
                  </button>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Scatter Plot */}
              <div className="h-64 relative border border-gray-200 rounded-lg">
                <div className="absolute inset-0 p-4">
                  {/* Scatter points */}
                  <div className="relative w-full h-full">
                    <div className="absolute w-2 h-2 bg-emerald-500 rounded-full" style={{left: '20%', bottom: '60%'}}></div>
                    <div className="absolute w-2 h-2 bg-emerald-500 rounded-full" style={{left: '30%', bottom: '40%'}}></div>
                    <div className="absolute w-2 h-2 bg-emerald-500 rounded-full" style={{left: '40%', bottom: '70%'}}></div>
                    <div className="absolute w-2 h-2 bg-emerald-500 rounded-full" style={{left: '50%', bottom: '30%'}}></div>
                    <div className="absolute w-2 h-2 bg-emerald-500 rounded-full" style={{left: '60%', bottom: '50%'}}></div>
                    <div className="absolute w-2 h-2 bg-emerald-500 rounded-full" style={{left: '70%', bottom: '80%'}}></div>
                    <div className="absolute w-2 h-2 bg-emerald-500 rounded-full" style={{left: '80%', bottom: '60%'}}></div>
                  </div>
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-sm text-gray-600">
                    E.Coli / Lactobacillus Spp.
                  </div>
                </div>
              </div>
            </div>

            {/* Fail Rate */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-emerald-500" />
                  <h2 className="text-xl font-semibold text-gray-900">Fail rate</h2>
                  <span className="text-sm text-gray-500">Jan 2025 - April 2025</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="text-gray-400 hover:text-gray-600">
                    <Download className="w-4 h-4" />
                  </button>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Filter className="w-4 h-4" />
                  </button>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Donut Chart */}
              <div className="flex items-center justify-center h-64">
                <div className="relative w-48 h-48">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="96"
                      cy="96"
                      r="80"
                      fill="none"
                      stroke="#d1fae5"
                      strokeWidth="16"
                    />
                    <circle
                      cx="96"
                      cy="96"
                      r="80"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="16"
                      strokeDasharray={`${70 * 5.02} ${30 * 5.02}`}
                      strokeLinecap="round"
                    />
                    <circle
                      cx="96"
                      cy="96"
                      r="80"
                      fill="none"
                      stroke="#60a5fa"
                      strokeWidth="16"
                      strokeDasharray={`${20 * 5.02} ${80 * 5.02}`}
                      strokeDashoffset={`-${70 * 5.02}`}
                      strokeLinecap="round"
                    />
                    <circle
                      cx="96"
                      cy="96"
                      r="80"
                      fill="none"
                      stroke="#8b5cf6"
                      strokeWidth="16"
                      strokeDasharray={`${10 * 5.02} ${90 * 5.02}`}
                      strokeDashoffset={`-${90 * 5.02}`}
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-600">Pass 70%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-400 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-600">Failed 20%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-purple-400 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-600">Passed with comments 10%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}