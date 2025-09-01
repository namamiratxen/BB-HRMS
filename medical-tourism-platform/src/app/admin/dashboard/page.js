'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { 
  Users, 
  Calendar, 
  DollarSign, 
  Activity,
  TrendingUp,
  Hospital,
  UserCheck,
  FileText,
  BarChart3,
  PieChart,
  Download,
  Filter,
  Search,
  Plus,
  MoreHorizontal
} from 'lucide-react';

export default function AdminDashboard() {
  const { data: session, status } = useSession();

  const stats = [
    {
      title: 'Total Patients',
      value: '579',
      change: '+15%',
      changeType: 'positive',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Total Appointments',
      value: '54',
      change: '+10%',
      changeType: 'positive',
      icon: Calendar,
      color: 'bg-green-500'
    },
    {
      title: 'Total Income',
      value: '$8,399.24',
      change: '+28%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'bg-emerald-500'
    },
    {
      title: 'Total Treatments',
      value: '112',
      change: '+12%',
      changeType: 'positive',
      icon: Activity,
      color: 'bg-purple-500'
    }
  ];

  const appointments = [
    {
      id: 1,
      patient: 'Brooklyn Simmons',
      treatment: 'Allergy Testing',
      time: 'Tomorrow 10:30',
      avatar: null
    },
    {
      id: 2,
      patient: 'Courtney Henry',
      treatment: 'Routine Lab Tests',
      time: 'Tomorrow 10:00',
      avatar: null
    },
    {
      id: 3,
      patient: 'Sarah Miller Olivia',
      treatment: 'Chronic Disease Management',
      time: 'Today 15:00',
      avatar: null
    },
    {
      id: 4,
      patient: 'Esther Howard',
      treatment: 'Allergy Testing',
      time: 'Today 14:00',
      avatar: null
    },
    {
      id: 5,
      patient: 'Arlene McCoy',
      treatment: 'Routine Lab Tests',
      time: 'Today 11:30',
      avatar: null
    },
    {
      id: 6,
      patient: 'Jane Cooper',
      treatment: 'Acute Illness',
      time: 'Today 10:00',
      avatar: null
    }
  ];

  const patients = [
    {
      id: 1,
      name: 'Brooklyn Simmons',
      gender: 'Male',
      dateOfBirth: '1995-03-18',
      age: '29 years old',
      department: 'Cardiology',
      patientId: '#OM123AA'
    },
    {
      id: 2,
      name: 'Anthony Johnson',
      gender: 'Male',
      dateOfBirth: '1997-03-18',
      age: '27 years old',
      department: 'Cardiology',
      patientId: '#AT456BB'
    },
    {
      id: 3,
      name: 'Sarah Miller Olivia',
      gender: 'Female',
      dateOfBirth: '1987-03-18',
      age: '35 years old',
      department: 'Oncology',
      patientId: '#EA789CC'
    }
  ];

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
        <div className="flex items-center h-16 px-6 border-b">
          <Activity className="w-8 h-8 text-emerald-500 mr-2" />
          <span className="text-xl font-bold text-gray-900">Medisight</span>
        </div>
        
        <nav className="mt-6">
          <div className="px-6 mb-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">MAIN</p>
          </div>
          <div className="space-y-1">
            <a href="#" className="flex items-center px-6 py-3 text-gray-700 bg-emerald-50 border-r-2 border-emerald-500">
              <BarChart3 className="w-5 h-5 mr-3" />
              Dashboard
            </a>
            <a href="#" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50">
              <Users className="w-5 h-5 mr-3" />
              Patients
            </a>
            <a href="#" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50">
              <FileText className="w-5 h-5 mr-3" />
              Messages
            </a>
            <a href="#" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50">
              <Calendar className="w-5 h-5 mr-3" />
              Appointments
            </a>
            <a href="#" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50">
              <DollarSign className="w-5 h-5 mr-3" />
              Billing
            </a>
            <a href="#" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50">
              <Activity className="w-5 h-5 mr-3" />
              Transactions
            </a>
          </div>

          <div className="px-6 mt-8 mb-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">TOOLS</p>
          </div>
          <div className="space-y-1">
            <a href="#" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50">
              <Settings className="w-5 h-5 mr-3" />
              Settings
            </a>
            <a href="#" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50">
              <FileText className="w-5 h-5 mr-3" />
              Chat & Support
            </a>
            <a href="#" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50">
              <Activity className="w-5 h-5 mr-3" />
              Help Center
            </a>
          </div>
        </nav>

        {/* Upgrade Section */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="bg-emerald-50 rounded-lg p-4">
            <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center mb-3">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Upgrade to premium</h3>
            <p className="text-sm text-gray-600 mb-3">Upgrade your account to premium to get more features</p>
            <button className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg text-sm hover:bg-gray-800 transition-colors">
              Upgrade plan
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b h-16 flex items-center justify-between px-8">
          <h1 className="text-2xl font-bold text-gray-900">
            ☀️ Good Morning, Dr. Robert!
          </h1>
          <div className="flex items-center space-x-4">
            <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
              + Create new
            </button>
            <button className="text-gray-600 hover:text-gray-900">
              <Download className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-sm text-gray-600 mb-1">{stat.title}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                  <span className={`text-sm ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </span>
                </div>
                <button className="text-emerald-600 hover:text-emerald-700 text-sm mt-2">
                  See details →
                </button>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Overview Chart */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Overview</h2>
                  <MoreHorizontal className="w-5 h-5 text-gray-400" />
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></div>
                      <span className="text-gray-600">Hospitalized patients</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-gray-300 rounded-full mr-2"></div>
                      <span className="text-gray-600">Outpatients</span>
                    </div>
                  </div>
                </div>

                {/* Simple Chart Representation */}
                <div className="h-64 bg-gray-50 rounded-lg flex items-end justify-center p-4">
                  <div className="flex items-end space-x-2 h-full">
                    <div className="bg-emerald-500 w-8 rounded-t" style={{height: '60%'}}></div>
                    <div className="bg-gray-300 w-8 rounded-t" style={{height: '40%'}}></div>
                    <div className="bg-emerald-500 w-8 rounded-t" style={{height: '70%'}}></div>
                    <div className="bg-gray-300 w-8 rounded-t" style={{height: '30%'}}></div>
                    <div className="bg-emerald-500 w-8 rounded-t" style={{height: '80%'}}></div>
                    <div className="bg-gray-300 w-8 rounded-t" style={{height: '50%'}}></div>
                  </div>
                </div>
              </div>

              {/* Patient List */}
              <div className="bg-white rounded-xl p-6 shadow-sm mt-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Patient List</h2>
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                      <Filter className="w-4 h-4" />
                      <span>Filter</span>
                    </button>
                    <select className="border border-gray-300 rounded-lg px-3 py-1 text-sm">
                      <option>All status</option>
                      <option>Active</option>
                      <option>Inactive</option>
                    </select>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Name</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Gender</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Date of Birth</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Age</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Department</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Patient ID</th>
                      </tr>
                    </thead>
                    <tbody>
                      {patients.map((patient) => (
                        <tr key={patient.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center mr-3">
                                <span className="text-white text-sm font-medium">
                                  {patient.name.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                              <span className="font-medium text-gray-900">{patient.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-gray-600">{patient.gender}</td>
                          <td className="py-3 px-4 text-gray-600">{patient.dateOfBirth}</td>
                          <td className="py-3 px-4 text-gray-600">{patient.age}</td>
                          <td className="py-3 px-4 text-gray-600">{patient.department}</td>
                          <td className="py-3 px-4 text-gray-600">{patient.patientId}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Appointment List */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Appointment List</h2>
                  <MoreHorizontal className="w-5 h-5 text-gray-400" />
                </div>

                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          {appointment.patient.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 text-sm">{appointment.patient}</h3>
                        <p className="text-xs text-gray-600">{appointment.treatment}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-600">{appointment.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Stats</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Active Patients</span>
                    <span className="font-semibold text-gray-900">324</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Pending Appointments</span>
                    <span className="font-semibold text-gray-900">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Completed Today</span>
                    <span className="font-semibold text-gray-900">8</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Revenue Today</span>
                    <span className="font-semibold text-emerald-600">$2,450</span>
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