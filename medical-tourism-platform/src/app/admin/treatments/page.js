'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { 
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Star,
  MapPin,
  DollarSign,
  MoreHorizontal,
  X
} from 'lucide-react';

export default function TreatmentManagement() {
  const { data: session } = useSession();
  const [treatments, setTreatments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTreatment, setEditingTreatment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'cardiology',
    basePrice: '',
    currency: 'USD',
    duration: {
      hospital_stay: '',
      total_recovery: '',
      follow_up: ''
    },
    procedures: [],
    inclusions: [],
    exclusions: [],
    requirements: {
      preOperative: [],
      postOperative: [],
      contraindications: []
    },
    metadata: {
      minAge: '',
      maxAge: '',
      genderRestriction: 'any'
    }
  });

  const categories = [
    'cardiology', 'oncology', 'orthopedics', 'neurology', 'cosmetic',
    'dental', 'eye_care', 'fertility', 'transplant', 'general'
  ];

  // Sample data
  const sampleTreatments = [
    {
      _id: '1',
      name: 'Comprehensive Cardiac Care Package',
      description: 'Complete heart health assessment and treatment',
      category: 'cardiology',
      pricing: { basePrice: 2500, currency: 'USD' },
      duration: { hospital_stay: '1-2 days', total_recovery: '1 week' },
      rating: { average: 4.8, totalReviews: 156 },
      isActive: true,
      hospital: { name: 'Apollo Hospitals Chennai' }
    },
    {
      _id: '2',
      name: 'Cancer Screening Package',
      description: 'Comprehensive cancer screening and early detection',
      category: 'oncology',
      pricing: { basePrice: 1800, currency: 'USD' },
      duration: { hospital_stay: '1 day', total_recovery: '2-3 days' },
      rating: { average: 4.9, totalReviews: 89 },
      isActive: true,
      hospital: { name: 'Fortis Hospital Bangalore' }
    }
  ];

  useEffect(() => {
    setTreatments(sampleTreatments);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editingTreatment ? `/api/treatments/${editingTreatment._id}` : '/api/treatments';
      const method = editingTreatment ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          pricing: {
            basePrice: parseFloat(formData.basePrice),
            currency: formData.currency,
            inclusions: formData.inclusions,
            exclusions: formData.exclusions
          }
        }),
      });

      if (response.ok) {
        const treatment = await response.json();
        if (editingTreatment) {
          setTreatments(treatments.map(t => t._id === treatment._id ? treatment : t));
        } else {
          setTreatments([...treatments, treatment]);
        }
        handleCloseForm();
      }
    } catch (error) {
      console.error('Error saving treatment:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (treatment) => {
    setEditingTreatment(treatment);
    setFormData({
      name: treatment.name,
      description: treatment.description,
      category: treatment.category,
      basePrice: treatment.pricing.basePrice.toString(),
      currency: treatment.pricing.currency,
      duration: treatment.duration,
      procedures: treatment.procedures || [],
      inclusions: treatment.pricing.inclusions || [],
      exclusions: treatment.pricing.exclusions || [],
      requirements: treatment.requirements || { preOperative: [], postOperative: [], contraindications: [] },
      metadata: treatment.metadata || { minAge: '', maxAge: '', genderRestriction: 'any' }
    });
    setShowForm(true);
  };

  const handleDelete = async (treatmentId) => {
    if (confirm('Are you sure you want to delete this treatment?')) {
      try {
        const response = await fetch(`/api/treatments/${treatmentId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setTreatments(treatments.filter(t => t._id !== treatmentId));
        }
      } catch (error) {
        console.error('Error deleting treatment:', error);
      }
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingTreatment(null);
    setFormData({
      name: '',
      description: '',
      category: 'cardiology',
      basePrice: '',
      currency: 'USD',
      duration: { hospital_stay: '', total_recovery: '', follow_up: '' },
      procedures: [],
      inclusions: [],
      exclusions: [],
      requirements: { preOperative: [], postOperative: [], contraindications: [] },
      metadata: { minAge: '', maxAge: '', genderRestriction: 'any' }
    });
  };

  const filteredTreatments = treatments.filter(treatment => {
    const matchesSearch = treatment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         treatment.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || treatment.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Treatment Packages</h1>
            <p className="text-gray-600">Manage treatment packages and pricing</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Treatment
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search treatments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>

            <div className="flex items-center space-x-2">
              <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Filter className="w-4 h-4" />
                <span>More Filters</span>
              </button>
            </div>
          </div>
        </div>

        {/* Treatments List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 font-medium text-gray-600">Treatment</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-600">Category</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-600">Price</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-600">Rating</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-600">Status</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTreatments.map((treatment) => (
                  <tr key={treatment._id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div>
                        <h3 className="font-medium text-gray-900">{treatment.name}</h3>
                        <p className="text-sm text-gray-600">{treatment.hospital.name}</p>
                        <p className="text-sm text-gray-500 line-clamp-1">{treatment.description}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm">
                        {treatment.category}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 text-emerald-600 mr-1" />
                        <span className="font-medium">{treatment.pricing.basePrice}</span>
                        <span className="text-gray-500 ml-1">{treatment.pricing.currency}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                        <span>{treatment.rating.average}</span>
                        <span className="text-gray-500 ml-1">({treatment.rating.totalReviews})</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        treatment.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {treatment.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEdit(treatment)}
                          className="p-2 text-gray-400 hover:text-emerald-600 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(treatment._id)}
                          className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Treatment Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingTreatment ? 'Edit Treatment' : 'Add New Treatment'}
                </h2>
                <button
                  onClick={handleCloseForm}
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Basic Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Treatment Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      required
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    rows="4"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  />
                </div>

                {/* Pricing */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Base Price *
                    </label>
                    <input
                      type="number"
                      value={formData.basePrice}
                      onChange={(e) => setFormData({...formData, basePrice: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Currency
                    </label>
                    <select
                      value={formData.currency}
                      onChange={(e) => setFormData({...formData, currency: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="INR">INR</option>
                      <option value="GBP">GBP</option>
                    </select>
                  </div>
                </div>

                {/* Duration */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Duration</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Hospital Stay
                      </label>
                      <input
                        type="text"
                        value={formData.duration.hospital_stay}
                        onChange={(e) => setFormData({
                          ...formData, 
                          duration: {...formData.duration, hospital_stay: e.target.value}
                        })}
                        placeholder="e.g., 1-2 days"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Total Recovery
                      </label>
                      <input
                        type="text"
                        value={formData.duration.total_recovery}
                        onChange={(e) => setFormData({
                          ...formData, 
                          duration: {...formData.duration, total_recovery: e.target.value}
                        })}
                        placeholder="e.g., 1-2 weeks"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Follow-up
                      </label>
                      <input
                        type="text"
                        value={formData.duration.follow_up}
                        onChange={(e) => setFormData({
                          ...formData, 
                          duration: {...formData.duration, follow_up: e.target.value}
                        })}
                        placeholder="e.g., 1 month"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Age Restrictions */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Requirements</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Minimum Age
                      </label>
                      <input
                        type="number"
                        value={formData.metadata.minAge}
                        onChange={(e) => setFormData({
                          ...formData, 
                          metadata: {...formData.metadata, minAge: e.target.value}
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Maximum Age
                      </label>
                      <input
                        type="number"
                        value={formData.metadata.maxAge}
                        onChange={(e) => setFormData({
                          ...formData, 
                          metadata: {...formData.metadata, maxAge: e.target.value}
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Gender Restriction
                      </label>
                      <select
                        value={formData.metadata.genderRestriction}
                        onChange={(e) => setFormData({
                          ...formData, 
                          metadata: {...formData.metadata, genderRestriction: e.target.value}
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      >
                        <option value="any">Any</option>
                        <option value="male">Male Only</option>
                        <option value="female">Female Only</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={handleCloseForm}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : editingTreatment ? 'Update Treatment' : 'Create Treatment'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}