'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  Clock, 
  DollarSign,
  Heart,
  ArrowLeft,
  Grid,
  List
} from 'lucide-react';

export default function TreatmentsPage() {
  const [treatments, setTreatments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    priceRange: '',
    rating: ''
  });

  const categories = [
    'All Categories',
    'Cardiology',
    'Oncology', 
    'Orthopedics',
    'Neurology',
    'Cosmetic',
    'Dental',
    'Eye Care',
    'Fertility',
    'Transplant'
  ];

  const sampleTreatments = [
    {
      id: 1,
      name: 'Comprehensive Cardiac Care Package',
      hospital: 'Apollo Hospitals Chennai',
      location: 'Chennai, India',
      price: 2500,
      currency: 'USD',
      rating: 4.8,
      reviews: 156,
      category: 'Cardiology',
      duration: '1-2 days',
      image: '/treatment1.jpg',
      description: 'Complete heart health assessment and treatment package including ECG, Echo, and consultation.',
      inclusions: ['Consultation', 'Tests', 'Reports', 'Follow-up'],
      doctor: 'Dr. Sarah Wilson'
    },
    {
      id: 2,
      name: 'Cancer Screening Package',
      hospital: 'Fortis Hospital Bangalore',
      location: 'Bangalore, India',
      price: 1800,
      currency: 'USD',
      rating: 4.9,
      reviews: 89,
      category: 'Oncology',
      duration: '1 day',
      image: '/treatment2.jpg',
      description: 'Comprehensive cancer screening and early detection package with latest technology.',
      inclusions: ['CT Scan', 'Blood Tests', 'Consultation', 'Report'],
      doctor: 'Dr. Emily Davis'
    },
    {
      id: 3,
      name: 'Hair Transplant FUE Technique',
      hospital: 'Medanta Hospital',
      location: 'Delhi, India',
      price: 3200,
      currency: 'USD',
      rating: 4.7,
      reviews: 234,
      category: 'Cosmetic',
      duration: '1 day',
      image: '/treatment3.jpg',
      description: 'Advanced FUE hair transplant technique with natural-looking results.',
      inclusions: ['Procedure', 'Medications', 'Follow-up', 'Care Kit'],
      doctor: 'Dr. Rajesh Kumar'
    },
    {
      id: 4,
      name: 'Knee Replacement Surgery',
      hospital: 'Max Healthcare',
      location: 'Mumbai, India',
      price: 5500,
      currency: 'USD',
      rating: 4.6,
      reviews: 78,
      category: 'Orthopedics',
      duration: '3-5 days',
      image: '/treatment4.jpg',
      description: 'Complete knee replacement surgery with rehabilitation program.',
      inclusions: ['Surgery', 'Implant', 'Physiotherapy', 'Stay'],
      doctor: 'Dr. Amit Sharma'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setTreatments(sampleTreatments);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredTreatments = treatments.filter(treatment => {
    const matchesSearch = treatment.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                         treatment.hospital.toLowerCase().includes(filters.search.toLowerCase()) ||
                         treatment.location.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesCategory = !filters.category || filters.category === 'All Categories' || 
                           treatment.category === filters.category;
    
    return matchesSearch && matchesCategory;
  });

  const TreatmentCard = ({ treatment }) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className="h-48 bg-gradient-to-r from-emerald-400 to-teal-500"></div>
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{treatment.name}</h3>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="ml-1 text-sm text-gray-600">{treatment.rating}</span>
            <span className="ml-1 text-sm text-gray-500">({treatment.reviews})</span>
          </div>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            <span className="text-sm">{treatment.hospital}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            <span className="text-sm">{treatment.location}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="w-4 h-4 mr-2" />
            <span className="text-sm">Duration: {treatment.duration}</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{treatment.description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <DollarSign className="w-5 h-5 text-emerald-600" />
            <span className="text-2xl font-bold text-emerald-600">{treatment.price}</span>
            <span className="text-gray-500 ml-1">{treatment.currency}</span>
          </div>
          <Link 
            href={`/treatments/${treatment.id}`}
            className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );

  const TreatmentListItem = ({ treatment }) => (
    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-6">
        <div className="w-24 h-24 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-lg"></div>
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-xl font-semibold text-gray-900">{treatment.name}</h3>
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="ml-1 text-sm text-gray-600">{treatment.rating}</span>
              <span className="ml-1 text-sm text-gray-500">({treatment.reviews})</span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4 mb-3">
            <div className="flex items-center text-gray-600">
              <MapPin className="w-4 h-4 mr-2" />
              <span className="text-sm">{treatment.hospital}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Clock className="w-4 h-4 mr-2" />
              <span className="text-sm">Duration: {treatment.duration}</span>
            </div>
          </div>

          <p className="text-gray-600 text-sm mb-4">{treatment.description}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <DollarSign className="w-5 h-5 text-emerald-600" />
              <span className="text-2xl font-bold text-emerald-600">{treatment.price}</span>
              <span className="text-gray-500 ml-1">{treatment.currency}</span>
            </div>
            <Link 
              href={`/treatments/${treatment.id}`}
              className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900 mr-6">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Home
              </Link>
              <Heart className="w-8 h-8 text-emerald-500 mr-2" />
              <span className="text-xl font-bold text-gray-900">MedTourism</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link 
                href="/auth/signin" 
                className="text-gray-600 hover:text-emerald-600 transition-colors"
              >
                Sign In
              </Link>
              <Link 
                href="/auth/signup" 
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Treatment Packages</h1>
          <p className="text-gray-600">Discover world-class medical treatments at affordable prices</p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-4 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search treatments..."
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            
            <select
              value={filters.category}
              onChange={(e) => setFilters({...filters, category: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <select
              value={filters.priceRange}
              onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="">All Prices</option>
              <option value="0-1000">$0 - $1,000</option>
              <option value="1000-3000">$1,000 - $3,000</option>
              <option value="3000-5000">$3,000 - $5,000</option>
              <option value="5000+">$5,000+</option>
            </select>

            <select
              value={filters.rating}
              onChange={(e) => setFilters({...filters, rating: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="">All Ratings</option>
              <option value="4.5">4.5+ Stars</option>
              <option value="4.0">4.0+ Stars</option>
              <option value="3.5">3.5+ Stars</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              Showing {filteredTreatments.length} of {treatments.length} treatments
            </p>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-emerald-100 text-emerald-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-emerald-100 text-emerald-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Treatments Grid/List */}
        <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-6'}>
          {filteredTreatments.map((treatment) => 
            viewMode === 'grid' ? (
              <TreatmentCard key={treatment.id} treatment={treatment} />
            ) : (
              <TreatmentListItem key={treatment.id} treatment={treatment} />
            )
          )}
        </div>

        {filteredTreatments.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No treatments found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}