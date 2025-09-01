'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft,
  Star,
  MapPin,
  Clock,
  DollarSign,
  Check,
  X,
  Calendar,
  Heart,
  Phone,
  Mail,
  User,
  Award,
  Shield
} from 'lucide-react';

export default function TreatmentDetail() {
  const params = useParams();
  const [treatment, setTreatment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Sample treatment data
  const sampleTreatment = {
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
    recovery: '1 week',
    followUp: '1 month',
    successRate: 95,
    description: 'Our comprehensive cardiac care package provides complete heart health assessment and treatment using state-of-the-art technology and experienced cardiologists. This package is designed for patients seeking thorough cardiac evaluation and treatment planning.',
    procedures: [
      { name: 'ECG', description: 'Electrocardiogram to check heart rhythm', duration: '30 minutes', included: true },
      { name: 'Echocardiogram', description: '2D Echo test to visualize heart structure', duration: '45 minutes', included: true },
      { name: 'Stress Test', description: 'Cardiac stress test to evaluate heart function', duration: '1 hour', included: true },
      { name: 'Blood Tests', description: 'Comprehensive cardiac markers', duration: '15 minutes', included: true }
    ],
    inclusions: [
      'Initial consultation with cardiologist',
      'All diagnostic tests',
      'Detailed medical report',
      'Follow-up consultation',
      'Medication guidance',
      'Dietary recommendations'
    ],
    exclusions: [
      'Accommodation',
      'Travel expenses',
      'Additional medications',
      'Emergency procedures'
    ],
    doctor: {
      name: 'Dr. Sarah Wilson',
      specialty: 'Interventional Cardiology',
      experience: '15 years',
      rating: 4.9,
      image: '/doctor1.jpg',
      bio: 'Dr. Sarah Wilson is a renowned interventional cardiologist with over 15 years of experience in treating complex cardiac conditions.'
    },
    hospitalInfo: {
      name: 'Apollo Hospitals Chennai',
      accreditation: 'JCI Accredited',
      established: '1983',
      beds: '550',
      address: '21, Greams Lane, Chennai, Tamil Nadu 600006, India',
      phone: '+91-44-2829-3333',
      email: 'info@apollo-chennai.com'
    }
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setTreatment(sampleTreatment);
      setLoading(false);
    }, 1000);
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (!treatment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Treatment Not Found</h2>
          <Link href="/treatments" className="text-emerald-600 hover:text-emerald-700">
            ← Back to Treatments
          </Link>
        </div>
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
              <Link href="/treatments" className="flex items-center text-gray-600 hover:text-gray-900 mr-6">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Treatments
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
              <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
                Book Consultation
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Treatment Header */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{treatment.name}</h1>
                  <div className="flex items-center space-x-4 text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{treatment.hospital}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{treatment.location}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span className="ml-1 font-semibold">{treatment.rating}</span>
                  <span className="ml-1 text-gray-500">({treatment.reviews} reviews)</span>
                </div>
              </div>

              <p className="text-gray-600 mb-6">{treatment.description}</p>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-emerald-600 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="font-medium">{treatment.duration}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Activity className="w-5 h-5 text-blue-600 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Success Rate</p>
                    <p className="font-medium">{treatment.successRate}%</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Heart className="w-5 h-5 text-red-600 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Recovery</p>
                    <p className="font-medium">{treatment.recovery}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center mb-2">
                  <DollarSign className="w-6 h-6 text-emerald-600" />
                  <span className="text-3xl font-bold text-emerald-600">{treatment.price}</span>
                  <span className="text-gray-500 ml-1">{treatment.currency}</span>
                </div>
                <p className="text-sm text-gray-600">Starting price</p>
              </div>

              <button className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg hover:bg-emerald-700 transition-colors mb-4">
                Book Consultation
              </button>
              
              <button className="w-full border border-emerald-600 text-emerald-600 py-3 px-4 rounded-lg hover:bg-emerald-50 transition-colors">
                Get Quote
              </button>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">Quick Contact</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 text-gray-400 mr-2" />
                    <span>{treatment.hospitalInfo.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 text-gray-400 mr-2" />
                    <span>{treatment.hospitalInfo.email}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-8">
              {['overview', 'procedures', 'doctor', 'hospital'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm ${
                    activeTab === tab
                      ? 'border-emerald-500 text-emerald-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-8">
            {activeTab === 'overview' && (
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">What's Included</h3>
                  <ul className="space-y-2">
                    {treatment.inclusions.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="w-4 h-4 text-emerald-500 mr-2" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">What's Not Included</h3>
                  <ul className="space-y-2">
                    {treatment.exclusions.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <X className="w-4 h-4 text-red-500 mr-2" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'procedures' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Included Procedures</h3>
                <div className="space-y-4">
                  {treatment.procedures.map((procedure, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 mb-1">{procedure.name}</h4>
                          <p className="text-gray-600 text-sm mb-2">{procedure.description}</p>
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="w-4 h-4 mr-1" />
                            <span>Duration: {procedure.duration}</span>
                          </div>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          procedure.included 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {procedure.included ? 'Included' : 'Optional'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'doctor' && (
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="w-10 h-10 text-gray-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{treatment.doctor.name}</h3>
                      <p className="text-emerald-600 font-medium">{treatment.doctor.specialty}</p>
                      <div className="flex items-center mt-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="ml-1 text-sm text-gray-600">{treatment.doctor.rating}</span>
                        <span className="ml-2 text-sm text-gray-500">{treatment.doctor.experience} experience</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600">{treatment.doctor.bio}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Qualifications</h4>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Award className="w-4 h-4 text-emerald-500 mr-2" />
                      <span className="text-gray-700">MBBS, MD (Cardiology)</span>
                    </div>
                    <div className="flex items-center">
                      <Award className="w-4 h-4 text-emerald-500 mr-2" />
                      <span className="text-gray-700">Fellowship in Interventional Cardiology</span>
                    </div>
                    <div className="flex items-center">
                      <Shield className="w-4 h-4 text-emerald-500 mr-2" />
                      <span className="text-gray-700">Board Certified Cardiologist</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'hospital' && (
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{treatment.hospitalInfo.name}</h3>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center">
                      <Shield className="w-4 h-4 text-emerald-500 mr-2" />
                      <span className="text-gray-700">{treatment.hospitalInfo.accreditation}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 text-emerald-500 mr-2" />
                      <span className="text-gray-700">Established {treatment.hospitalInfo.established}</span>
                    </div>
                    <div className="flex items-center">
                      <Activity className="w-4 h-4 text-emerald-500 mr-2" />
                      <span className="text-gray-700">{treatment.hospitalInfo.beds} beds</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-start">
                      <MapPin className="w-4 h-4 text-gray-400 mr-2 mt-1" />
                      <span className="text-gray-700">{treatment.hospitalInfo.address}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-gray-700">{treatment.hospitalInfo.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-gray-700">{treatment.hospitalInfo.email}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Facilities</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {['ICU', 'Emergency', 'Surgery', 'Radiology', 'Laboratory', 'Pharmacy', 'Blood Bank', 'Dialysis'].map((facility) => (
                      <div key={facility} className="flex items-center">
                        <Check className="w-4 h-4 text-emerald-500 mr-2" />
                        <span className="text-gray-700 text-sm">{facility}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start Your Medical Journey?</h2>
          <p className="text-gray-600 mb-6">Get personalized treatment recommendations and cost estimates</p>
          <div className="flex justify-center space-x-4">
            <button className="bg-emerald-600 text-white px-8 py-3 rounded-lg hover:bg-emerald-700 transition-colors">
              Book Free Consultation
            </button>
            <button className="border border-emerald-600 text-emerald-600 px-8 py-3 rounded-lg hover:bg-emerald-50 transition-colors">
              Download Brochure
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}