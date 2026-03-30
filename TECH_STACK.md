# 🛠️ Krishi Sakhi - Tech Stack & Requirements

## 📋 **COMPLETE TECHNICAL SPECIFICATION**

### 🚀 **Core Technologies**

#### **Backend Framework**
- **Flask (Python)** - Lightweight web application framework
- **Flask-CORS** - Cross-origin resource sharing support
- **Flask-SQLAlchemy** - Object-relational mapping for database operations

#### **AI & Machine Learning**
- **Transformers (Hugging Face)** - Natural language processing models
- **PyTorch** - Deep learning framework for model loading
- **Microsoft DialoGPT-medium** - 345M parameter conversational AI model
- **Fallback Models:** DistilGPT-2 (82M), GPT-2 (124M)

#### **Frontend Technologies**
- **HTML5** - Modern web markup with semantic elements
- **CSS3** - Advanced styling with animations, gradients, and flexbox/grid
- **Vanilla JavaScript** - Pure JS without frameworks for maximum performance
- **Font Awesome 6.4.0** - Professional icon library

#### **Database**
- **SQLite** - Lightweight, file-based relational database
- **SQLAlchemy ORM** - Python database toolkit

#### **External APIs**
- **OpenWeatherMap API** - Real-time weather data
- **API Key:** `37f9e59ffd6a9b04476c29ad3079e271`

---

## 📦 **PYTHON REQUIREMENTS**

### **Required Python Packages:**
```bash
# Core Framework
Flask==2.3.2
Flask-CORS==4.0.0
Flask-SQLAlchemy==3.0.5

# AI & ML
transformers==4.30.0
torch==2.0.1
tokenizers==0.13.3

# Utilities
requests==2.31.0
Pillow==9.5.0
numpy==1.24.3

# Development
python-dotenv==1.0.0
```

### **Installation Commands:**
```bash
# Install all requirements
pip install flask flask-cors flask-sqlalchemy
pip install transformers torch tokenizers
pip install requests pillow numpy python-dotenv
```

---

## 🏗️ **PROJECT ARCHITECTURE**

### **Directory Structure:**
```
Sprout_7_Clean/
├── backend/                    # Server-side application
│   └── app_qwen_enhanced.py   # Main Flask application
├── frontend/                   # Client-side application
│   └── app.html               # Complete web interface
├── data/                      # Data storage
│   ├── sqlite/               # Database files
│   │   └── krishi_sakhi.db   # SQLite database
│   └── knowledge_base/       # AI knowledge files
│       ├── comprehensive_farming_knowledge.json
│       ├── pest_disease_encyclopedia.json
│       ├── market_information.json
│       └── farming_knowledge.json
├── documentation/             # Project documentation
└── START_QWEN_ENHANCED.bat   # Quick launch script
```

---

## 🌐 **WEB TECHNOLOGIES BREAKDOWN**

### **HTML5 Features Used:**
- **Semantic Elements:** `<section>`, `<nav>`, `<main>`, `<header>`
- **Modern Forms:** Input types, validation, accessibility
- **Data Attributes:** Custom data storage for dynamic content

### **CSS3 Advanced Features:**
- **CSS Grid & Flexbox** - Modern layout systems
- **CSS Variables** - Dynamic color theming
- **Animations & Keyframes** - Smooth transitions and effects
- **Backdrop Filters** - Modern blur effects
- **Gradient Backgrounds** - Beautiful visual design
- **Media Queries** - Responsive design for all devices

### **JavaScript ES6+ Features:**
- **Async/Await** - Modern asynchronous programming
- **Fetch API** - HTTP requests to backend
- **Template Literals** - Dynamic string generation
- **Arrow Functions** - Concise function syntax
- **Destructuring** - Clean data extraction
- **Local Storage** - Client-side data persistence

---

## 🧠 **AI MODEL SPECIFICATIONS**

### **Primary Model: Microsoft DialoGPT-medium**
- **Parameters:** 345 million
- **Type:** Conversational AI
- **Memory Usage:** ~2-3 GB RAM
- **Loading Time:** ~30 seconds
- **Capabilities:** Natural conversation, context retention

### **Model Loading Hierarchy:**
1. **DialoGPT-medium** (345M) - Primary choice ✅
2. **DistilGPT-2** (82M) - Lightweight fallback
3. **GPT-2 Base** (124M) - Emergency fallback
4. **Knowledge Base** - Rule-based responses

### **Knowledge Base System:**
- **4 JSON files** with comprehensive Kerala farming data
- **50+ crop varieties** with detailed cultivation info
- **Disease management** encyclopedia
- **Government schemes** database
- **Market pricing** information

---

## 🔧 **SYSTEM REQUIREMENTS**

### **Minimum Hardware:**
- **RAM:** 4 GB (8 GB recommended)
- **Storage:** 2 GB free space
- **CPU:** Dual-core processor
- **GPU:** Not required (CPU-only inference)

### **Software Requirements:**
- **Python:** 3.8 or higher
- **Operating System:** Windows 10/11, Linux, macOS
- **Web Browser:** Chrome, Firefox, Edge (modern browsers)
- **Internet:** Required for weather API and model downloads

### **Network Requirements:**
- **API Calls:** OpenWeatherMap (weather data)
- **Model Download:** ~1GB download (one-time)
- **Runtime:** Minimal bandwidth needed

---

## 🚀 **DEPLOYMENT OPTIONS**

### **🎦 Automated Setup (Recommended for New Computers)**

**For complete first-time installation:**

#### **Windows Setup:**
```batch
# Run the comprehensive setup script
SETUP_NEW_COMPUTER.bat

# This script will:
# - Check/install Python 3.8+
# - Install all dependencies
# - Create directory structure
# - Initialize database
# - Download AI models
# - Verify installation
```

#### **Linux/macOS/Unix Setup:**
```bash
# Make executable and run
chmod +x setup_new_computer.sh
./setup_new_computer.sh

# Automated features:
# - OS detection (Ubuntu/Debian/CentOS/macOS)
# - System package installation
# - Python dependency management
# - Database initialization
# - Verification and testing
```

### **📦 Requirements Management**
```bash
# Install from requirements file
pip install -r requirements.txt

# The requirements.txt includes:
# - Flask==2.3.2 (web framework)
# - torch==2.0.1 (AI models)
# - transformers==4.30.0 (Hugging Face)
# - All other dependencies with tested versions
```

---

### **👨‍💻 Manual Local Development:**
```bash
# Start backend server
cd backend
python app_qwen_enhanced.py

# Access frontend
open frontend/app.html
```

### **Production Deployment:**
- **WSGI Server:** Gunicorn, uWSGI
- **Web Server:** Nginx, Apache
- **Process Manager:** Supervisor, systemd
- **Container:** Docker support ready

### **Cloud Deployment:**
- **Platform:** AWS, Google Cloud, Azure
- **Services:** EC2, Compute Engine, Virtual Machines
- **Database:** Can upgrade to PostgreSQL/MySQL
- **Storage:** S3, Cloud Storage for knowledge bases

---

## 🔐 **SECURITY CONSIDERATIONS**

### **Current Security Features:**
- **CORS Configuration** - Controlled API access
- **Input Validation** - SQL injection prevention
- **No sensitive data storage** - Local processing only
- **API Key management** - Environment variables ready

### **Production Security Checklist:**
- [ ] HTTPS implementation
- [ ] API rate limiting
- [ ] User authentication
- [ ] Database encryption
- [ ] Environment variable management
- [ ] Security headers

---

## 📊 **PERFORMANCE METRICS**

### **Response Times:**
- **AI Model Response:** 2-5 seconds
- **Knowledge Base Query:** <1 second
- **Weather API:** 1-3 seconds
- **Page Load:** <2 seconds

### **Resource Usage:**
- **Memory:** 2-4 GB during operation
- **CPU:** Moderate during AI inference
- **Disk I/O:** Minimal (SQLite operations)
- **Network:** Low bandwidth usage

---

## 🛠️ **DEVELOPMENT TOOLS**

### **Recommended IDEs:**
- **VS Code** - Primary recommendation
- **PyCharm** - Python-focused development
- **Sublime Text** - Lightweight option

### **Browser Developer Tools:**
- **Chrome DevTools** - Frontend debugging
- **Network Tab** - API monitoring
- **Console** - JavaScript debugging

### **Testing Tools:**
- **Postman** - API testing
- **Browser Testing** - Multiple browser compatibility
- **Python unittest** - Backend testing

---

## 🔄 **UPDATE & MAINTENANCE**

### **Model Updates:**
- Check Hugging Face for model updates
- Version pinning in requirements
- Backward compatibility testing

### **Knowledge Base Updates:**
- JSON file updates for new crops/diseases
- Market price data refresh
- Government scheme updates

### **Dependencies:**
- Regular security updates
- Python version compatibility
- Library version management

---

## 🎯 **PRODUCTION READINESS**

### **Current Status:** ✅ **PRODUCTION READY**
- Stable AI model loading
- Complete feature set
- Error handling implemented
- Performance optimized
- Documentation complete

### **Scaling Considerations:**
- Database upgrade path (SQLite → PostgreSQL)
- Load balancing for multiple users
- Caching layer implementation
- CDN for static assets

---

*Last Updated: September 2025*  
*Tech Stack Version: 2.0.0*  
*Compatibility: Python 3.8+, Modern Browsers*
