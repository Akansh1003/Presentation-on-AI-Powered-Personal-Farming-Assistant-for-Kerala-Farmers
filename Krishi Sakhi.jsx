import React, { useState, useRef, useEffect } from 'react';
import { Camera, Home, User, BookOpen, IndianRupee, Cloud, LogOut, Settings, Search, Upload, Leaf, Beaker, AlertTriangle, CheckCircle, Clock, MapPin, Thermometer, Droplets, Wind, TrendingUp, TrendingDown, Minus, Mic, Download } from 'lucide-react';

const KrishiSakhi = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedImage, setSelectedImage] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [treatmentPreference, setTreatmentPreference] = useState('both');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [language, setLanguage] = useState('en');
  const [notifications, setNotifications] = useState([]);
  const fileInputRef = useRef(null);

  const sidebarItems = [
    { icon: Home, label: 'Home', key: 'home' },
    { icon: User, label: 'Profile', key: 'profile' },
    { icon: BookOpen, label: 'Farm Guide', key: 'farmguide' },
    { icon: IndianRupee, label: 'Market Prices', key: 'market' },
    { icon: Cloud, label: 'Weather Forecast', key: 'weather' },
    { icon: Camera, label: 'Disease Detection', key: 'detection' },
    { icon: Settings, label: 'Settings', key: 'settings' },
  ];

  const mockWeatherData = {
    location: "Kochi, Kerala",
    temperature: "28°C",
    humidity: "85%",
    windSpeed: "12 km/h",
    condition: "Partly Cloudy",
    forecast: [
      { day: "Today", temp: "28°C", condition: "Partly Cloudy" },
      { day: "Tomorrow", temp: "30°C", condition: "Sunny" },
      { day: "Day 3", temp: "26°C", condition: "Light Rain" }
    ]
  };

  const mockMarketPrices = [
    { crop: "Rice", price: "₹2,850", unit: "per quintal", trend: "up", change: "+2.5%" },
    { crop: "Coconut", price: "₹28", unit: "per piece", trend: "down", change: "-1.2%" },
    { crop: "Pepper", price: "₹625", unit: "per kg", trend: "up", change: "+5.1%" },
    { crop: "Cardamom", price: "₹1,250", unit: "per kg", trend: "stable", change: "0%" }
  ];

  const translations = {
    en: {
      welcome: "Hello! User",
      subtitle: "What can I help you today?",
      description: "I'm Krishi Sakhi, your agricultural assistant. Let's make your farming better.",
      diseaseDetection: "Disease Detection",
      farmGuide: "Farm Guide",
      marketPrices: "Market Prices",
      weatherForecast: "Weather Forecast",
      organicOnly: "Organic Only",
      chemicalOnly: "Chemical Only",
      bothOptions: "Both Options",
      treatmentPreference: "Treatment Preference",
      organicTreatment: "Organic Treatment",
      chemicalTreatment: "Chemical Treatment",
      uploadImage: "Click to upload or drag and drop crop images",
      analyzing: "Analyzing your crop image...",
      confidence: "Confidence",
      preventionTips: "Prevention Tips",
      exportResults: "Export Results",
      searchPlaceholder: "Ask anything about farming...",
      profile: "Profile",
      settings: "Settings",
      logout: "Logout",
      language: "Language",
      voiceCommands: "Voice Commands",
      startVoice: "Start Voice"
    },
    ml: {
      welcome: "നമസ്കാരം! ഉപയോക്താവ്",
      subtitle: "ഇന്ന് ഞാൻ എങ്ങനെ സഹായിക്കാം?",
      description: "ഞാൻ കൃഷി സഖി ആണ്, നിങ്ങളുടെ കൃഷി സഹായി. നമുക്ക് നിങ്ങളുടെ കൃഷി മെച്ചപ്പെടുത്താം.",
      diseaseDetection: "രോഗ നിർണയം",
      farmGuide: "കൃഷി ഗൈഡ്",
      marketPrices: "മാർക്കറ്റ് വില",
      weatherForecast: "കാലാവസ്ഥ പ്രവചനം",
      organicOnly: "ജൈവിക മാത്രം",
      chemicalOnly: "രാസ മാത്രം",
      bothOptions: "രണ്ടും",
      treatmentPreference: "ചികിത്സാ മുൻഗണന",
      organicTreatment: "ജൈവിക ചികിത്സ",
      chemicalTreatment: "രാസ ചികിത്സ",
      uploadImage: "ചെടിയുടെ ചിത്രങ്ങൾ അപ്‌ലോഡ് ചെയ്യാൻ ക്ലിക് ചെയ്യുക",
      analyzing: "നിങ്ങളുടെ വിള ചിത്രം വിശകലനം ചെയ്യുന്നു...",
      confidence: "വിശ്വാസ്യത",
      preventionTips: "പ്രതിരോധ നുറുങ്ങുകൾ",
      exportResults: "ഫലങ്ങൾ ഡൗൺലോഡ് ചെയ്യുക",
      searchPlaceholder: "കൃഷിയെക്കുറിച്ച് എന്തും ചോദിക്കൂ...",
      profile: "പ്രൊഫൈൽ",
      settings: "ക്രമീകരണങ്ങൾ",
      logout: "ലോഗ് ഔട്ട്",
      language: "ഭാഷ",
      voiceCommands: "വോയ്‌സ് കമാൻഡുകൾ",
      startVoice: "വോയ്‌സ് ആരംഭിക്കൂ"
    }
  };

  const t = translations[language];

  const showNotification = (message, type = 'info') => {
    const id = Date.now();
    const notification = { id, message, type };
    setNotifications(prev => [...prev, notification]);
    
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        simulateAnalysis();
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisResult(null);
    setTimeout(() => {
      setAnalysisResult({
        disease: "Leaf Blight",
        confidence: 87,
        severity: "Moderate",
        organicTreatment: {
          name: "Neem Oil Spray",
          ingredients: ["Neem oil", "Liquid soap", "Water"],
          method: "Mix 2 tablespoons neem oil with 1 teaspoon liquid soap in 1 liter water. Spray on affected areas in early morning or evening.",
          effectiveness: "75%",
          timeToSeeResults: "5-7 days",
          cost: "₹50-100"
        },
        chemicalTreatment: {
          name: "Copper Fungicide",
          ingredients: ["Copper sulfate", "Lime"],
          method: "Apply copper-based fungicide as per manufacturer instructions. Ensure proper protective equipment.",
          effectiveness: "90%",
          timeToSeeResults: "3-5 days",
          cost: "₹200-300"
        },
        prevention: "Ensure proper drainage, avoid overhead watering, maintain plant spacing"
      });
      setIsAnalyzing(false);
      showNotification("Disease analysis completed!", "success");
    }, 2000);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      showNotification(`Searching for: ${searchQuery}`, "info");
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-5 h-5 text-green-600" />;
      case 'down': return <TrendingDown className="w-5 h-5 text-red-600" />;
      default: return <Minus className="w-5 h-5 text-gray-600" />;
    }
  };

  const handleLogout = () => {
    if (confirm(language === 'ml' ? 'നിങ്ങൾക്ക് ലോഗ് ഔട്ട് ചെയ്യണോ?' : 'Are you sure you want to logout?')) {
      showNotification(language === 'ml' ? 'ലോഗ് ഔട്ട് ചെയ്യുന്നു...' : 'Logging out...', 'info');
    }
  };

  const renderHome = () => (
    <div className="flex-1 p-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">{t.welcome}</h1>
        <h2 className="text-2xl text-gray-600 mb-4">{t.subtitle}</h2>
        <p className="text-green-600 text-lg">{t.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 max-w-4xl mx-auto">
        {[
          { icon: Camera, title: t.diseaseDetection, desc: 'Upload crop photos for instant disease identification', tab: 'detection' },
          { icon: BookOpen, title: t.farmGuide, desc: 'Access comprehensive farming guides and expert advice', tab: 'farmguide' },
          { icon: IndianRupee, title: t.marketPrices, desc: 'Get real-time market prices for your crops', tab: 'market' },
          { icon: Cloud, title: t.weatherForecast, desc: 'Stay updated with accurate weather forecasts', tab: 'weather' }
        ].map((feature) => (
          <div 
            key={feature.tab}
            onClick={() => setActiveTab(feature.tab)}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-green-100 cursor-pointer"
          >
            <div className="bg-green-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
              <feature.icon className="text-green-600" size={28} />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.desc}</p>
          </div>
        ))}
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            className="w-full px-6 py-4 text-lg rounded-full border-2 border-green-200 focus:border-green-400 focus:outline-none shadow-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button 
            onClick={handleSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-colors"
          >
            <Search size={20} />
          </button>
        </div>
      </div>
    </div>
  );

  const renderDiseaseDetection = () => (
    <div className="flex-1 p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">{t.diseaseDetection}</h2>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <h3 className="text-xl font-semibold mb-4">{t.treatmentPreference}</h3>
          <div className="flex gap-4 flex-wrap">
            {[
              { value: 'organic', icon: Leaf, label: t.organicOnly },
              { value: 'chemical', icon: Beaker, label: t.chemicalOnly },
              { value: 'both', icon: CheckCircle, label: t.bothOptions }
            ].map((option) => (
              <label key={option.value} className="flex items-center cursor-pointer bg-gray-50 px-4 py-2 rounded-lg hover:bg-green-50 transition-colors">
                <input
                  type="radio"
                  name="treatment"
                  value={option.value}
                  checked={treatmentPreference === option.value}
                  onChange={(e) => setTreatmentPreference(e.target.value)}
                  className="mr-2"
                />
                <option.icon className="text-green-600 mr-2" size={18} />
                {option.label}
              </label>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-green-300 rounded-2xl p-8 text-center cursor-pointer hover:border-green-400 hover:bg-green-50 transition-colors"
          >
            {selectedImage ? (
              <div>
                <img src={selectedImage} alt="Uploaded crop" className="max-w-full max-h-64 mx-auto rounded-lg mb-4" />
                <p className="text-green-600 font-semibold">Image uploaded successfully!</p>
              </div>
            ) : (
              <div>
                <Upload className="mx-auto mb-4 text-green-500" size={48} />
                <p className="text-lg text-gray-600">{t.uploadImage}</p>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        </div>

        {(isAnalyzing || analysisResult) && (
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            {isAnalyzing ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500 mx-auto mb-4"></div>
                <p className="text-lg text-gray-600">{t.analyzing}</p>
              </div>
            ) : analysisResult && (
              <div>
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{analysisResult.disease}</h3>
                  <div className="bg-gray-200 rounded-full h-3 w-full max-w-md mx-auto mb-2">
                    <div 
                      className="bg-green-500 h-3 rounded-full transition-all duration-1000"
                      style={{ width: `${analysisResult.confidence}%` }}
                    ></div>
                  </div>
                  <p className="text-gray-600">{analysisResult.confidence}% {t.confidence}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {(treatmentPreference === 'organic' || treatmentPreference === 'both') && (
                    <div className="bg-green-50 rounded-xl p-6 border-l-4 border-green-500">
                      <h4 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
                        <Leaf className="mr-2" size={20} />
                        {t.organicTreatment}
                      </h4>
                      <TreatmentCard treatment={analysisResult.organicTreatment} />
                    </div>
                  )}

                  {(treatmentPreference === 'chemical' || treatmentPreference === 'both') && (
                    <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-500">
                      <h4 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                        <Beaker className="mr-2" size={20} />
                        {t.chemicalTreatment}
                      </h4>
                      <TreatmentCard treatment={analysisResult.chemicalTreatment} />
                    </div>
                  )}
                </div>

                <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-start">
                    <AlertTriangle className="text-yellow-600 mr-2 mt-1" size={20} />
                    <div>
                      <h6 className="font-semibold text-yellow-800 mb-1">{t.preventionTips}:</h6>
                      <p className="text-yellow-700 text-sm">{analysisResult.prevention}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <button 
                    onClick={() => showNotification("Analysis results exported!", "success")}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full transition-colors flex items-center mx-auto"
                  >
                    <Download size={16} className="mr-2" />
                    {t.exportResults}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  const TreatmentCard = ({ treatment }) => (
    <div className="space-y-3">
      <h5 className="font-semibold">{treatment.name}</h5>
      <div className="grid grid-cols-3 gap-4 text-sm">
        <div className="flex items-center">
          <CheckCircle size={16} className="text-green-600 mr-1" />
          <span>{treatment.effectiveness}</span>
        </div>
        <div className="flex items-center">
          <Clock size={16} className="text-green-600 mr-1" />
          <span>{treatment.timeToSeeResults}</span>
        </div>
        <div className="flex items-center">
          <IndianRupee size={16} className="text-green-600 mr-1" />
          <span>{treatment.cost}</span>
        </div>
      </div>
      <div>
        <h6 className="font-medium text-sm text-gray-700 mb-1">Ingredients:</h6>
        <p className="text-sm text-gray-600">{treatment.ingredients.join(', ')}</p>
      </div>
      <div>
        <h6 className="font-medium text-sm text-gray-700 mb-1">Method:</h6>
        <p className="text-sm text-gray-600">{treatment.method}</p>
      </div>
    </div>
  );

  const renderWeather = () => (
    <div className="flex-1 p-8">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">{t.weatherForecast}</h2>

        <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-2xl p-6 mb-6 shadow-lg">
          <div className="flex items-center mb-4">
            <MapPin className="mr-2" size={20} />
            <span className="text-lg">{mockWeatherData.location}</span>
          </div>
          
          <div className="text-center mb-6">
            <div className="text-5xl font-bold mb-2">{mockWeatherData.temperature}</div>
            <div className="text-xl opacity-90">{mockWeatherData.condition}</div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <Droplets className="mr-2" size={20} />
              <span>Humidity: {mockWeatherData.humidity}</span>
            </div>
            <div className="flex items-center">
              <Wind className="mr-2" size={20} />
              <span>Wind: {mockWeatherData.windSpeed}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold mb-4">3-Day Forecast</h3>
          <div className="space-y-3">
            {mockWeatherData.forecast.map((day, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">{day.day}</span>
                <span className="text-blue-600 font-semibold">{day.temp}</span>
                <span className="text-gray-600">{day.condition}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderMarket = () => (
    <div className="flex-1 p-8">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">{t.marketPrices}</h2>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-green-500 text-white p-4">
            <h3 className="text-lg font-semibold">Today's Rates</h3>
            <p className="text-green-100 text-sm">Updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="divide-y divide-gray-200">
            {mockMarketPrices.map((item, index) => (
              <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-lg text-gray-800">{item.crop}</h4>
                    <p className="text-sm text-gray-600">{item.unit}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">{item.price}</div>
                    <div className={`flex items-center justify-end text-sm ${
                      item.trend === 'up' ? 'text-green-600' : 
                      item.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {getTrendIcon(item.trend)}
                      <span className="ml-1">{item.change}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="flex-1 p-8">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">{t.profile}</h2>
        <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User size={40} className="text-green-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Farmer User</h3>
          <p className="text-gray-600 mb-4">Kerala, India</p>
          <p className="text-gray-500">Profile management features coming soon...</p>
        </div>
      </div>
    </div>
  );

  const renderFarmGuide = () => (
    <div className="flex-1 p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">{t.farmGuide}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: 'Rice Cultivation', desc: 'Complete guide to rice farming in Kerala' },
            { title: 'Coconut Farming', desc: 'Modern coconut cultivation techniques' },
            { title: 'Pepper Cultivation', desc: 'Improve pepper quality and yield' },
            { title: 'Organic Farming', desc: 'Chemical-free farming methods' }
          ].map((guide, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{guide.title}</h3>
              <p className="text-gray-600">{guide.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="flex-1 p-8">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">{t.settings}</h2>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.language}</label>
            <select 
              value={language} 
              onChange={(e) => {
                setLanguage(e.target.value);
                showNotification(`Language changed to ${e.target.value === 'ml' ? 'Malayalam' : 'English'}`, 'success');
              }}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="en">English</option>
              <option value="ml">മലയാളം</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Default Treatment Preference</label>
            <select 
              value={treatmentPreference}
              onChange={(e) => {
                setTreatmentPreference(e.target.value);
                showNotification('Treatment preference updated', 'success');
              }}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="organic">{t.organicOnly}</option>
              <option value="chemical">{t.chemicalOnly}</option>
              <option value="both">{t.bothOptions}</option>
            </select>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">{t.voiceCommands}</h3>
            <button 
              onClick={() => showNotification('Voice feature coming soon!', 'info')}
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Mic size={16} className="mr-2" />
              {t.startVoice}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return renderHome();
      case 'detection': return renderDiseaseDetection();
      case 'weather': return renderWeather();
      case 'market': return renderMarket();
      case 'profile': return renderProfile();
      case 'farmguide': return renderFarmGuide();
      case 'settings': return renderSettings();
      default: return renderHome();
    }
  };

  const getTranslatedLabel = (label) => {
    const labelMap = {
      'Home': language === 'ml' ? 'വീട്' : 'Home',
      'Profile': language === 'ml' ? 'പ്രൊഫൈൽ' : 'Profile',
      'Farm Guide': language === 'ml' ? 'കൃഷി ഗൈഡ്' : 'Farm Guide',
      'Market Prices': language === 'ml' ? 'മാർക്കറ്റ് വില' : 'Market Prices',
      'Weather Forecast': language === 'ml' ? 'കാലാവസ്ഥ പ്രവചനം' : 'Weather Forecast',
      'Disease Detection': language === 'ml' ? 'രോഗ നിർണയം' : 'Disease Detection',
      'Settings': language === 'ml' ? 'ക്രമീകരണങ്ങൾ' : 'Settings'
    };
    return labelMap[label] || label;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            {language === 'ml' ? 'കൃഷി സഖി' : 'Krishi Sakhi'}
          </h1>
          <select 
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-white/20 text-white border border-white/30 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            <option value="en" className="text-gray-800">English</option>
            <option value="ml" className="text-gray-800">മലയാളം</option>
          </select>
        </div>
      </header>

      <div className="flex max-w-7xl mx-auto bg-white shadow-xl rounded-t-2xl overflow-hidden">
        {/* Sidebar */}
        <aside className="w-80 bg-gradient-to-b from-green-400 to-green-500 text-white">
          <nav className="p-6">
            <ul className="space-y-2">
              {sidebarItems.map((item) => (
                <li key={item.key}>
                  <button
                    onClick={() => setActiveTab(item.key)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 text-left ${
                      activeTab === item.key 
                        ? 'bg-white/20 border-r-4 border-white shadow-lg' 
                        : 'hover:bg-white/10'
                    }`}
                  >
                    <item.icon size={20} />
                    <span className="font-medium">{getTranslatedLabel(item.label)}</span>
                  </button>
                </li>
              ))}
              <li className="pt-4 border-t border-white/20">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-red-500/20 transition-colors text-left"
                >
                  <LogOut size={20} />
                  <span className="font-medium">{t.logout}</span>
                </button>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-gray-50">
          {renderContent()}
        </main>
      </div>

      {/* Notifications */}
      <div className="fixed top-4 right-4 space-y-2 z-50">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 rounded-lg shadow-lg text-white max-w-sm transition-all duration-300 ${
              notification.type === 'success' ? 'bg-green-500' :
              notification.type === 'error' ? 'bg-red-500' :
              notification.type === 'warning' ? 'bg-yellow-500' :
              'bg-blue-500'
            }`}
          >
            <div className="flex justify-between items-start">
              <p className="text-sm">{notification.message}</p>
              <button
                onClick={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
                className="ml-2 text-white/70 hover:text-white"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KrishiSakhi;
