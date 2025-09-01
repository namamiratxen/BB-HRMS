'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
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

export default function HospitalDashboard() {
  const { data: session } = useSession();
  const [currentStep, setCurrentStep] = useState('start');
  const [submissionType, setSubmissionType] = useState('');
  const [samples, setSamples] = useState([]);

  const steps = [
    { id: 'start', label: 'Start', completed: true },
    { id: 'submission_type', label: 'Submission type', completed: currentStep !== 'start' },
    { id: 'add_submission', label: 'Add submission', completed: false },
    { id: 'confirmation', label: 'Confirmation', completed: false },
    { id: 'success', label: 'Success!', completed: false }
  ];

  const submissionTypes = [
    'Sample registration',
    'Submission type #2',
    'Label registration'
  ];

  const labOrders = [
    {
      orderNumber: '36-035628',
      bookDate: 'Feb 3, 2025',
      summary: '1 sample: ObjectNotFound',
      status: 'Completed',
      documents: ['DOC', 'PDF', 'XLSX']
    },
    {
      orderNumber: '36-035627',
      bookDate: 'Feb 2, 2025',
      summary: '2 samples: Paprika',
      status: 'Booked in',
      documents: ['DOC', 'XLSX']
    },
    {
      orderNumber: '35-087456',
      bookDate: 'Feb 2, 2025',
      summary: '4 samples: Kondensmilch',
      status: 'Unknown',
      documents: ['XLSX']
    },
    {
      orderNumber: '35-035108',
      bookDate: 'Feb 1, 2025',
      summary: '8 samples: Pears',
      status: 'Booked in',
      documents: ['DOC', 'XLSX']
    }
  ];

  const renderStepIndicator = () => (
    <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step.completed 
                ? 'bg-emerald-500 text-white' 
                : currentStep === step.id
                ? 'bg-emerald-100 text-emerald-600 border-2 border-emerald-500'
                : 'bg-gray-200 text-gray-400'
            }`}>
              {step.completed ? '✓' : index + 1}
            </div>
            <span className={`ml-2 text-sm ${
              step.completed || currentStep === step.id ? 'text-gray-900' : 'text-gray-400'
            }`}>
              {step.label}
            </span>
            {index < steps.length - 1 && (
              <div className={`w-16 h-0.5 mx-4 ${
                steps[index + 1].completed ? 'bg-emerald-500' : 'bg-gray-200'
              }`}></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderSubmissionStart = () => (
    <div className="bg-white rounded-xl p-8 shadow-sm">
      <h2 className="text-2xl font-semibold text-gray-900 mb-8">Submit a sample registration</h2>
      
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-emerald-500 transition-colors cursor-pointer">
          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-6 h-6 text-emerald-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Start from scratch</h3>
          <p className="text-gray-600">Fill in all the necessary information on our website</p>
        </div>

        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-emerald-500 transition-colors cursor-pointer">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">File</h3>
          <p className="text-gray-600">Upload a submission file. You can't edit it</p>
        </div>
      </div>

      <div className="border border-gray-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Past submissions</h3>
          <button className="text-emerald-600 hover:text-emerald-700 text-sm">View all</button>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="text-gray-600 text-sm">E.coli in UK-grown apples</div>
          <div className="text-gray-600 text-sm">E.coli in UK-grown apples</div>
          <div className="text-gray-600 text-sm">Hand swabs 2022</div>
          <div className="text-gray-600 text-sm">Hand swabs 2022</div>
          <div className="text-gray-600 text-sm">E.coli in UK-grown apples</div>
          <div className="text-gray-600 text-sm">E.coli in UK-grown apples</div>
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <button 
          onClick={() => setCurrentStep('submission_type')}
          className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );

  const renderSubmissionType = () => (
    <div className="bg-white rounded-xl p-8 shadow-sm">
      <h2 className="text-2xl font-semibold text-gray-900 mb-8">Select the submission type</h2>
      
      <div className="space-y-4 mb-8">
        {submissionTypes.map((type) => (
          <div 
            key={type}
            onClick={() => setSubmissionType(type)}
            className={`p-4 border-2 rounded-xl cursor-pointer transition-colors ${
              submissionType === type 
                ? 'border-emerald-500 bg-emerald-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <span className="font-medium text-gray-900">{type}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <button 
          onClick={() => setCurrentStep('start')}
          className="text-gray-600 hover:text-gray-900 px-6 py-3"
        >
          Back
        </button>
        <button 
          onClick={() => setCurrentStep('add_submission')}
          disabled={!submissionType}
          className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </div>
  );

  const renderLabOrders = () => (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setCurrentStep('start')}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Sample submissions
          </button>
        </div>
        <button className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
          + Sample registration
        </button>
      </div>

      {/* Filters */}
      <div className="bg-gray-50 rounded-xl p-6 mb-6">
        <div className="flex items-center mb-4">
          <Filter className="w-5 h-5 text-emerald-500 mr-2" />
          <h3 className="font-semibold text-gray-900">Filters</h3>
          <button className="ml-auto text-emerald-600 hover:text-emerald-700 text-sm">Clear All</button>
        </div>
        
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm text-gray-600">Show only out of scope</span>
          </label>
          <button className="flex items-center space-x-2 px-3 py-1 border border-gray-300 rounded-lg text-sm">
            <span># Job number</span>
          </button>
          <button className="flex items-center space-x-2 px-3 py-1 border border-gray-300 rounded-lg text-sm">
            <Calendar className="w-4 h-4" />
            <span>Due Date</span>
          </button>
          <button className="flex items-center space-x-2 px-3 py-1 border border-gray-300 rounded-lg text-sm">
            <Calendar className="w-4 h-4" />
            <span>Start date</span>
          </button>
          <button className="text-emerald-600 hover:text-emerald-700 text-sm">+ Add filter</button>
        </div>
      </div>

      {/* Lab Orders Table */}
      <div className="border border-gray-200 rounded-xl">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-emerald-500" />
            <h3 className="font-semibold text-gray-900">Lab orders</h3>
            <span className="text-sm text-gray-500">24 items in total</span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-gray-900">
              <Download className="w-4 h-4" />
            </button>
            <button className="text-gray-600 hover:text-gray-900">
              <Settings className="w-4 h-4" />
            </button>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded text-sm">By order</button>
              <button className="px-3 py-1 text-gray-600 rounded text-sm hover:bg-gray-100">By sample</button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-3 px-4 font-medium text-gray-600">Lab order number</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Book in date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Summary</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Documents</th>
              </tr>
            </thead>
            <tbody>
              {labOrders.map((order, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">{order.orderNumber}</td>
                  <td className="py-3 px-4 text-gray-600">{order.bookDate}</td>
                  <td className="py-3 px-4 text-gray-600">{order.summary}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.status === 'Completed' 
                        ? 'bg-green-100 text-green-800' 
                        : order.status === 'Booked in'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-1">
                      {order.documents.map((doc, i) => (
                        <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                          {doc}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (currentStep) {
      case 'start':
        return renderSubmissionStart();
      case 'submission_type':
        return renderSubmissionType();
      case 'lab_orders':
        return renderLabOrders();
      default:
        return renderSubmissionStart();
    }
  };

  const renderSubmissionStart = () => (
    <div className="bg-white rounded-xl p-8 shadow-sm">
      <h2 className="text-2xl font-semibold text-gray-900 mb-8">Submit a sample registration</h2>
      
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div 
          onClick={() => setCurrentStep('submission_type')}
          className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-emerald-500 transition-colors cursor-pointer"
        >
          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-6 h-6 text-emerald-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Start from scratch</h3>
          <p className="text-gray-600">Fill in all the necessary information on our website</p>
        </div>

        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-emerald-500 transition-colors cursor-pointer">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">File</h3>
          <p className="text-gray-600">Upload a submission file. You can't edit it</p>
        </div>
      </div>

      <div className="border border-gray-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Past submissions</h3>
          <button 
            onClick={() => setCurrentStep('lab_orders')}
            className="text-emerald-600 hover:text-emerald-700 text-sm"
          >
            View all
          </button>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="text-gray-600 text-sm">E.coli in UK-grown apples</div>
          <div className="text-gray-600 text-sm">E.coli in UK-grown apples</div>
          <div className="text-gray-600 text-sm">Hand swabs 2022</div>
          <div className="text-gray-600 text-sm">Hand swabs 2022</div>
          <div className="text-gray-600 text-sm">E.coli in UK-grown apples</div>
          <div className="text-gray-600 text-sm">E.coli in UK-grown apples</div>
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <button 
          onClick={() => setCurrentStep('submission_type')}
          className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );

  const renderSubmissionType = () => (
    <div className="bg-white rounded-xl p-8 shadow-sm">
      <h2 className="text-2xl font-semibold text-gray-900 mb-8">Select the submission type</h2>
      
      <div className="space-y-4 mb-8">
        {submissionTypes.map((type) => (
          <div 
            key={type}
            onClick={() => setSubmissionType(type)}
            className={`p-4 border-2 rounded-xl cursor-pointer transition-colors ${
              submissionType === type 
                ? 'border-emerald-500 bg-emerald-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <span className="font-medium text-gray-900">{type}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <button 
          onClick={() => setCurrentStep('start')}
          className="text-gray-600 hover:text-gray-900 px-6 py-3"
        >
          Back
        </button>
        <button 
          onClick={() => setCurrentStep('add_submission')}
          disabled={!submissionType}
          className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </div>
  );

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
            <a href="#" className="flex items-center px-6 py-3 text-gray-700 bg-emerald-50 border-r-2 border-emerald-500">
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
            <a href="#" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50">
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
            <button 
              onClick={() => setCurrentStep('lab_orders')}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to dashboard
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8">
          {currentStep !== 'lab_orders' && renderStepIndicator()}
          {renderContent()}
        </div>
      </div>
    </div>
  );
}