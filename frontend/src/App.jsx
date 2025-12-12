// Main Application Component - React + Tailwind
import { useState, useEffect, useMemo } from 'react';

function App() {
  // State Management
  const [apis, setApis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // API-Daten beim Laden abrufen
  useEffect(() => {
    const fetchAPIs = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/apis');
        if (!response.ok) {
          throw new Error('Failed to fetch APIs');
        }
        const result = await response.json();
        setApis(result.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAPIs();
  }, []);

  // Einzigartige Kategorien extrahieren
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(apis.map(api => api.category))];
    return ['All', ...uniqueCategories.sort()];
  }, [apis]);

  // Debounced Search + Filter Logic
  const filteredAPIs = useMemo(() => {
    return apis.filter(api => {
      // Category Filter
      const matchesCategory = selectedCategory === 'All' || api.category === selectedCategory;

      // Search Filter (name + description)
      const matchesSearch = searchTerm === '' ||
        api.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        api.description.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [apis, searchTerm, selectedCategory]);

  // Auth Badge Color Mapping
  const getAuthBadgeColor = (auth) => {
    switch (auth) {
      case 'No':
        return 'bg-green-100 text-green-800';
      case 'API Key':
        return 'bg-blue-100 text-blue-800';
      case 'OAuth':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-700 font-medium">Loading APIs...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-100">
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-md">
          <div className="text-red-600 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
          <p className="text-sm text-gray-500 mt-4">Make sure the backend server is running on port 3001</p>
        </div>
      </div>
    );
  }

  // Main Application UI
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Free APIs Directory
            </h1>
            <p className="text-gray-600 text-lg">
              Discover {apis.length} free APIs for your next project
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search APIs by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-5 py-3 pl-12 rounded-lg border-2 border-gray-200 input-focus text-gray-900 placeholder-gray-400"
              />
              <svg
                className="absolute left-4 top-3.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Counter */}
        <div className="mb-6 text-center">
          <p className="text-gray-600">
            Showing <span className="font-bold text-gray-900">{filteredAPIs.length}</span> of{' '}
            <span className="font-bold text-gray-900">{apis.length}</span> APIs
          </p>
        </div>

        {/* API Cards Grid */}
        {filteredAPIs.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">No APIs found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAPIs.map(api => (
              <div
                key={api.id}
                className="bg-white rounded-xl shadow-md overflow-hidden api-card border border-gray-100"
              >
                <div className="p-6">
                  {/* API Header */}
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900 leading-tight">
                      {api.name}
                    </h3>
                    <span className={`badge ${getAuthBadgeColor(api.auth)} ml-2 flex-shrink-0`}>
                      {api.auth}
                    </span>
                  </div>

                  {/* Category Badge */}
                  <div className="mb-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
                      {api.category}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {api.description}
                  </p>

                  {/* Link */}
                  <a
                    href={api.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm group"
                  >
                    Visit Documentation
                    <svg
                      className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-gray-600 text-sm">
          <p>Built with React, Vite, Tailwind CSS, and Express.js</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
