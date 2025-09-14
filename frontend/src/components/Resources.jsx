import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  BookOpen, 
  Play, 
  Headphones, 
  Search, 
  Filter,
  Heart,
  Brain,
  Zap,
  Moon,
  Users,
  Shield,
  Lightbulb
} from 'lucide-react';

function Resources() {
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const categories = [
    { id: 'all', label: 'All Categories', icon: BookOpen },
    { id: 'breathing', label: 'Breathing', icon: Heart },
    { id: 'grounding', label: 'Grounding', icon: Brain },
    { id: 'stress', label: 'Stress Management', icon: Zap },
    { id: 'sleep', label: 'Sleep', icon: Moon },
    { id: 'social', label: 'Social Connection', icon: Users },
    { id: 'safety', label: 'Safety & Crisis', icon: Shield },
    { id: 'mindfulness', label: 'Mindfulness', icon: Lightbulb }
  ];

  const types = [
    { id: 'all', label: 'All Types' },
    { id: 'article', label: 'Articles' },
    { id: 'exercise', label: 'Exercises' },
    { id: 'meditation', label: 'Meditations' },
    { id: 'video', label: 'Videos' }
  ];

  useEffect(() => {
    fetchResources();
  }, []);

  useEffect(() => {
    filterResources();
  }, [resources, searchTerm, selectedCategory, selectedType]);

  const fetchResources = async () => {
    try {
      const response = await axios.get('/api/resources');
      setResources(response.data);
    } catch (error) {
      console.error('Error fetching resources:', error);
    }
  };

  const filterResources = () => {
    let filtered = resources;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(resource =>
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(resource => resource.category === selectedCategory);
    }

    // Filter by type
    if (selectedType !== 'all') {
      filtered = filtered.filter(resource => resource.type === selectedType);
    }

    setFilteredResources(filtered);
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'article':
        return <BookOpen className="h-5 w-5 text-blue-500" />;
      case 'exercise':
        return <Brain className="h-5 w-5 text-green-500" />;
      case 'meditation':
        return <Headphones className="h-5 w-5 text-purple-500" />;
      case 'video':
        return <Play className="h-5 w-5 text-red-500" />;
      default:
        return <BookOpen className="h-5 w-5 text-gray-500" />;
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      breathing: 'bg-pink-100 text-pink-800',
      grounding: 'bg-blue-100 text-blue-800',
      stress: 'bg-red-100 text-red-800',
      sleep: 'bg-purple-100 text-purple-800',
      social: 'bg-green-100 text-green-800',
      safety: 'bg-orange-100 text-orange-800',
      mindfulness: 'bg-yellow-100 text-yellow-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Mental Health Resources</h1>
        <p className="text-lg text-gray-600">Explore articles, exercises, and tools to support your well-being</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-8 border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="lg:w-64">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          {/* Type Filter */}
          <div className="lg:w-48">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {types.map(type => (
                <option key={type.id} value={type.id}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.slice(1).map(category => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full border transition-colors ${
                selectedCategory === category.id
                  ? 'bg-primary-100 text-primary-700 border-primary-300'
                  : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="text-sm font-medium">{category.label}</span>
            </button>
          );
        })}
      </div>

      {/* Resources Grid */}
      {filteredResources.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    {getTypeIcon(resource.type)}
                    <span className="text-sm font-medium text-gray-600 capitalize">
                      {resource.type}
                    </span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(resource.category)}`}>
                    {resource.category}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {resource.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {resource.content}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {new Date(resource.created_at).toLocaleDateString()}
                  </span>
                  <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                    Learn More →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No resources found</h3>
          <p className="text-gray-600">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}

      {/* Crisis Resources */}
      <div className="mt-12 bg-red-50 border border-red-200 rounded-2xl p-8">
        <div className="text-center">
          <Shield className="h-12 w-12 text-red-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-red-900 mb-4">Need Immediate Help?</h2>
          <p className="text-red-800 mb-6">
            If you're experiencing a mental health crisis, please reach out to these resources:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <div className="bg-white rounded-lg p-4 border border-red-200">
              <h3 className="font-semibold text-gray-900 mb-2">National Suicide Prevention Lifeline</h3>
              <p className="text-2xl font-bold text-red-600 mb-2">988</p>
              <p className="text-sm text-gray-600">Available 24/7</p>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-red-200">
              <h3 className="font-semibold text-gray-900 mb-2">Crisis Text Line</h3>
              <p className="text-2xl font-bold text-red-600 mb-2">Text HOME to 741741</p>
              <p className="text-sm text-gray-600">24/7 crisis support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Resources;
