'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { 
  Calendar, 
  FileText, 
  Heart, 
  MapPin, 
  Phone, 
  Clock,
  Star,
  Plus,
  Search,
  Filter,
  Bell,
  User,
  Settings,
  LogOut
} from 'lucide-react';

export default function PatientDashboard() {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState('overview');

  const upcomingAppointments = [
    {
      id: 1,
      doctor: 'Dr. Sarah Wilson',
      specialty: 'Cardiology',
      date: 'Tomorrow',
      time: '10:30',
      type: 'Consultation'
    },
    {
      id: 2,
      doctor: 'Dr. Michael Chen',
      specialty: 'Neurology',
      date: 'Today',
      time: '15:00',
      type: 'Follow-up'
    }
  ];

  const recentTreatments = [
    {
      id: 1,
      name: 'Heart Surgery Consultation',
      hospital: 'Apollo Hospital',
      date: 'Jan 15, 2024',
      status: 'Completed'
    },
    {
      id: 2,
      name: 'Dental Implant',
      hospital: 'Fortis Healthcare',
      date: 'Jan 10, 2024',
      status: 'In Progress'
    }
  ];

  const healthMetrics = [
    { label: 'Blood Pressure', value: '120/80', status: 'normal' },
    { label: 'Heart Rate', value: '72 bpm', status: 'normal' },
    { label: 'Weight', value: '68 kg', status: 'normal' },
    { label: 'BMI', value: '22.5', status: 'normal' }
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
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Heart className="w-8 h-8 text-emerald-500 mr-2" />
              <span className="text-xl font-bold text-gray-900">MedTourism</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Bell className="w-6 h-6" />
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {session?.user?.name}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            ☀️ Good Morning, {session?.user?.name?.split(' ')[0]}!
          </h1>
          <p className="text-gray-600">Here's your health overview for today</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Appointments</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
              <Calendar className="w-8 h-8 text-emerald-500" />
            </div>
            <div className="mt-2 text-sm text-green-600">+2 this month</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Health Records</p>
                <p className="text-2xl font-bold text-gray-900">8</p>
              </div>
              <FileText className="w-8 h-8 text-blue-500" />
            </div>
            <div className="mt-2 text-sm text-green-600">Updated recently</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Treatments</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
              <Heart className="w-8 h-8 text-red-500" />
            </div>
            <div className="mt-2 text-sm text-blue-600">2 in progress</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Next Appointment</p>
                <p className="text-2xl font-bold text-gray-900">Today</p>
              </div>
              <Clock className="w-8 h-8 text-purple-500" />
            </div>
            <div className="mt-2 text-sm text-purple-600">at 3:00 PM</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upcoming Appointments */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Upcoming Appointments</h2>
                <button className="text-emerald-600 hover:text-emerald-700 font-medium">
                  View All
                </button>
              </div>

              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{appointment.doctor}</h3>
                        <p className="text-sm text-gray-600">{appointment.specialty}</p>
                        <p className="text-sm text-gray-500">{appointment.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{appointment.date}</p>
                      <p className="text-sm text-gray-600">{appointment.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-4 bg-emerald-600 text-white py-3 px-4 rounded-lg hover:bg-emerald-700 transition-colors">
                Schedule New Appointment
              </button>
            </div>

            {/* Recent Treatments */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Recent Treatments</h2>
                <button className="text-emerald-600 hover:text-emerald-700 font-medium">
                  View All
                </button>
              </div>

              <div className="space-y-4">
                {recentTreatments.map((treatment) => (
                  <div key={treatment.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-gray-900">{treatment.name}</h3>
                      <p className="text-sm text-gray-600">{treatment.hospital}</p>
                      <p className="text-sm text-gray-500">{treatment.date}</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        treatment.status === 'Completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {treatment.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Health Metrics */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Health Metrics</h2>
              <div className="space-y-4">
                {healthMetrics.map((metric, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-gray-600">{metric.label}</span>
                    <div className="text-right">
                      <span className="font-medium text-gray-900">{metric.value}</span>
                      <div className={`w-2 h-2 rounded-full ml-2 inline-block ${
                        metric.status === 'normal' ? 'bg-green-500' : 'bg-red-500'
                      }`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <Calendar className="w-5 h-5 text-emerald-500" />
                  <span>Book Appointment</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <FileText className="w-5 h-5 text-blue-500" />
                  <span>Upload Medical Records</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <Search className="w-5 h-5 text-purple-500" />
                  <span>Find Treatments</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <Phone className="w-5 h-5 text-green-500" />
                  <span>Contact Support</span>
                </button>
              </div>
            </div>

            {/* Treatment Recommendations */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Recommended Treatments</h2>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">Cardiac Health Checkup</h3>
                  <p className="text-sm text-gray-600 mb-3">Comprehensive heart health assessment</p>
                  <div className="flex items-center justify-between">
                    <span className="text-emerald-600 font-medium">$299</span>
                    <button className="bg-emerald-600 text-white px-3 py-1 rounded text-sm hover:bg-emerald-700 transition-colors">
                      Learn More
                    </button>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">Preventive Care Package</h3>
                  <p className="text-sm text-gray-600 mb-3">Annual health screening package</p>
                  <div className="flex items-center justify-between">
                    <span className="text-emerald-600 font-medium">$199</span>
                    <button className="bg-emerald-600 text-white px-3 py-1 rounded text-sm hover:bg-emerald-700 transition-colors">
                      Learn More
                    </button>
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