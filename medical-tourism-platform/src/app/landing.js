'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Heart, 
  Shield, 
  Globe, 
  Star, 
  ArrowRight, 
  Phone, 
  Mail, 
  MapPin,
  Users,
  Award,
  Clock,
  CheckCircle,
  Menu,
  X,
  User
} from 'lucide-react';

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const specialties = [
    { name: 'Hair & Beard Transplant', icon: '👨‍⚕️', description: 'Advanced FUE and FUT techniques' },
    { name: 'Breast Enlargement', icon: '🏥', description: 'Safe and natural procedures' },
    { name: 'Breast Uplift', icon: '💊', description: 'Reconstructive surgery' },
    { name: 'Breast Reduction', icon: '🩺', description: 'Comfort and confidence' },
    { name: 'Gynecomastia', icon: '⚕️', description: 'Male breast reduction' },
    { name: 'Arm Lift - Thigh Lift', icon: '🏃‍♀️', description: 'Body contouring' },
    { name: 'Liposuction', icon: '💉', description: 'Fat removal procedures' },
    { name: 'Tummy Tuck', icon: '🤸‍♀️', description: 'Abdominal contouring' },
    { name: 'Brazilian Butt Lift', icon: '🍑', description: 'Natural enhancement' },
    { name: 'Facelift - Neck Lift', icon: '😊', description: 'Facial rejuvenation' },
    { name: 'Botox - Dermal Fillers', icon: '💆‍♀️', description: 'Non-surgical treatments' },
    { name: 'Rhinoplasty', icon: '👃', description: 'Nose reshaping surgery' }
  ];

  const stats = [
    { number: '2309', label: 'Successful Surgeries' },
    { number: '1363', label: 'Happy Patients' },
    { number: '4236', label: 'Expert Doctors' },
    { number: '64', label: 'Partner Hospitals' }
  ];

  const doctors = [
    { name: 'Dr. Sarah Wilson', specialty: 'Cardiology', image: '/doctor1.jpg', rating: 4.9 },
    { name: 'Dr. Michael Chen', specialty: 'Neurology', image: '/doctor2.jpg', rating: 4.8 },
    { name: 'Dr. Emily Davis', specialty: 'Oncology', image: '/doctor3.jpg', rating: 4.9 },
    { name: 'Dr. James Brown', specialty: 'Orthopedics', image: '/doctor4.jpg', rating: 4.7 },
    { name: 'Dr. Lisa Garcia', specialty: 'Dermatology', image: '/doctor5.jpg', rating: 4.8 }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Heart className="w-8 h-8 text-emerald-500 mr-2" />
              <span className="text-xl font-bold text-gray-900">MedTourism</span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link href="#about" className="text-gray-600 hover:text-emerald-600 transition-colors">About</Link>
              <Link href="#treatments" className="text-gray-600 hover:text-emerald-600 transition-colors">Treatments</Link>
              <Link href="#doctors" className="text-gray-600 hover:text-emerald-600 transition-colors">Doctors</Link>
              <Link href="#reviews" className="text-gray-600 hover:text-emerald-600 transition-colors">Reviews</Link>
              <Link href="#contact" className="text-gray-600 hover:text-emerald-600 transition-colors">Contact</Link>
            </nav>

            <div className="hidden md:flex items-center space-x-4">
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
                Free Consultation
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <nav className="flex flex-col space-y-4">
                <Link href="#about" className="text-gray-600 hover:text-emerald-600 transition-colors">About</Link>
                <Link href="#treatments" className="text-gray-600 hover:text-emerald-600 transition-colors">Treatments</Link>
                <Link href="#doctors" className="text-gray-600 hover:text-emerald-600 transition-colors">Doctors</Link>
                <Link href="#reviews" className="text-gray-600 hover:text-emerald-600 transition-colors">Reviews</Link>
                <Link href="#contact" className="text-gray-600 hover:text-emerald-600 transition-colors">Contact</Link>
                <div className="flex flex-col space-y-2 pt-4 border-t">
                  <Link href="/auth/signin" className="text-gray-600 hover:text-emerald-600 transition-colors">Sign In</Link>
                  <Link href="/auth/signup" className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-center">Free Consultation</Link>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Medical Tourism
                <span className="block text-emerald-200">Healthcare & Travel</span>
              </h1>
              <p className="text-xl mb-8 text-emerald-100">
                Connect with world-class healthcare providers for safe, affordable, and high-quality medical treatments abroad.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/auth/signup" 
                  className="bg-white text-emerald-600 px-8 py-4 rounded-lg font-semibold hover:bg-emerald-50 transition-colors inline-flex items-center justify-center"
                >
                  Get Started <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link 
                  href="/treatments" 
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-emerald-600 transition-colors inline-flex items-center justify-center"
                >
                  Free Consultation
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Quick Appointment</h3>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="space-y-4">
                  {['Cardiology', 'Neurology', 'Oncology', 'Orthopedics'].map((specialty, index) => (
                    <div key={specialty} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">{specialty}</span>
                      <button className="bg-emerald-500 text-white px-4 py-1 rounded-full text-sm">
                        Book
                      </button>
                    </div>
                  ))}
                </div>
                <button className="w-full bg-emerald-500 text-white py-3 rounded-lg mt-6 font-semibold">
                  Schedule Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Treatment Packages */}
      <section id="treatments" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Suggestion Packages
            </h2>
            <p className="text-xl text-gray-600">Choose from our comprehensive treatment packages</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {specialties.slice(0, 6).map((specialty, index) => (
              <div key={specialty.name} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="text-4xl mb-4">{specialty.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{specialty.name}</h3>
                  <p className="text-gray-600 mb-4">{specialty.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                      <span className="ml-2 text-gray-600 text-sm">4.9</span>
                    </div>
                    <button className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors">
                      Explore
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Doctors */}
      <section id="doctors" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Doctors</h2>
              <p className="text-xl text-gray-600">Meet our experienced medical professionals</p>
            </div>
            <Link href="/doctors" className="text-emerald-600 hover:text-emerald-700 font-medium">
              View All
            </Link>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {doctors.map((doctor, index) => (
              <div key={doctor.name} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
                <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <User className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{doctor.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{doctor.specialty}</p>
                <div className="flex items-center justify-center mb-3">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="ml-1 text-sm text-gray-600">{doctor.rating}</span>
                </div>
                <button className="bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-emerald-600 transition-colors">
                  View Profile
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Patient Reviews */}
      <section id="reviews" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Patient Reviews</h2>
            <p className="text-xl text-gray-600">What our patients say about their experience</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-gray-400" />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900">Patient {index + 1}</h4>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">
                  "Excellent service and professional care. The entire process was smooth and the results exceeded my expectations."
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
            <p className="text-xl text-gray-600">Experience the best in medical tourism</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Safe & Secure</h3>
              <p className="text-gray-600">All our partner hospitals are internationally accredited with highest safety standards.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Doctors</h3>
              <p className="text-gray-600">World-renowned specialists with years of experience in their respective fields.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Global Network</h3>
              <p className="text-gray-600">Access to premium healthcare facilities across multiple countries.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-gray-600">Round-the-clock assistance throughout your medical journey.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Personalized Care</h3>
              <p className="text-gray-600">Tailored treatment plans designed specifically for your needs.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Proven Results</h3>
              <p className="text-gray-600">High success rates and satisfied patients from around the world.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Get in Touch</h2>
              <p className="text-xl text-gray-600 mb-8">
                Ready to start your medical journey? Contact us for a free consultation.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="w-6 h-6 text-emerald-500 mr-4" />
                  <span className="text-gray-700">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-6 h-6 text-emerald-500 mr-4" />
                  <span className="text-gray-700">info@medtourism.com</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-6 h-6 text-emerald-500 mr-4" />
                  <span className="text-gray-700">123 Medical Plaza, Healthcare City</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8">
              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                  <option>Select Treatment</option>
                  {specialties.map((specialty) => (
                    <option key={specialty.name} value={specialty.name}>{specialty.name}</option>
                  ))}
                </select>
                <textarea
                  rows="4"
                  placeholder="Tell us about your medical needs..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Heart className="w-8 h-8 text-emerald-500 mr-2" />
                <span className="text-xl font-bold">MedTourism</span>
              </div>
              <p className="text-gray-400">
                Your trusted partner for world-class medical care and tourism experiences.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white transition-colors">Medical Consultation</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Treatment Packages</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Travel Assistance</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Follow-up Care</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Our Team</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  <span>info@medtourism.com</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>Healthcare City</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 MedTourism Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}