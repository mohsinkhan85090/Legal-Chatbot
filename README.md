# ⚖️ Legal-Chatbot

An AI-powered legal advisor for **Indian laws**, designed to instantly provide users with relevant IPC sections, rights, and legal guidance based on real-world scenarios.  
Built with **React**, **Flask**, **Firestore**, and **RAG (Gemini API)** to ensure accurate, fast, and context-aware legal advice.

![Legal Chatbot Demo](https://github.com/user-attachments/assets/db1ee6ed-341b-4342-ae75-77455d8016e5)

---

## 🚀 Features

### Core Legal Features
- **Instant Legal Guidance** – Quickly retrieve IPC sections and their explanations
- **Scenario-Based Queries** – Ask real-life legal questions (e.g., *"What are my rights if detained by police?"*)
- **RAG Integration** – Combines custom legal datasets with the **Gemini API** for precise answers
- **Firestore Backend** – Efficient storage and retrieval of legal data

### Modern UI/UX Features
- **🌙 Dark/Light Theme** – Toggle between themes with system preference detection
- **🌍 Multilingual Support** – Full English/Hindi localization
- **📱 Mobile Responsive** – Optimized for all device sizes
- **💬 Conversation History** – Chat history persisted locally
- **⚡ Loading States** – Visual feedback and error handling
- **✨ Smooth Animations** – Modern transitions and interactions

---

## 🛠️ Tech Stack

- **Frontend:** React 18, CSS Custom Properties, React i18next
- **Backend:** Python, Flask  
- **Database:** Google Firestore  
- **AI Model:** Gemini API with Retrieval-Augmented Generation (RAG)  
- **Other:** LocalStorage, Responsive Design, PWA-ready

---

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js 16+ and npm
- Python 3.8+
- Google Cloud account (for Firestore and Gemini API)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mohsinkhan85090/Legal-Chatbot.git
   cd Legal-Chatbot
   ```

2. **Start the frontend**
   ```bash
   # Easy way - use the run script
   ./run.sh
   
   # Or manually
   cd frontend
   npm install
   npm start
   ```

3. **Set up backend (optional)**
   ```bash
   pip install -r requirements.txt
   # Configure your API keys in .env
   python backend/app.py
   ```

The application will open at `http://localhost:3000` with a beautiful, responsive interface.

---

## 📸 Screenshots

### Light Theme
![Light Theme](https://github.com/user-attachments/assets/db1ee6ed-341b-4342-ae75-77455d8016e5)

### Dark Theme  
![Dark Theme](https://github.com/user-attachments/assets/a550dfb7-e165-4768-9dde-bdd1cd333834)

### Mobile Responsive
![Mobile View](https://github.com/user-attachments/assets/2c1a4c86-4c37-484a-afad-d3ea5273f7bd)

---

## 🔧 Development

### Frontend Commands
```bash
cd frontend

npm start          # Development server
npm run build      # Production build  
npm test           # Run tests
```

### Project Structure
```
Legal-Chatbot/
├── frontend/           # React application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── contexts/      # React contexts
│   │   └── styles/        # CSS files
├── backend/            # Flask API server
├── docs/              # Documentation
└── DEVELOPMENT.md     # Detailed dev docs
```

## ✨ Key Features Demonstrated

- **🎨 Theme System**: Seamless dark/light mode switching
- **🌐 Internationalization**: Complete English/Hindi support  
- **📱 Responsive Design**: Works perfectly on mobile and desktop
- **💾 Data Persistence**: Chat history survives page refreshes
- **🔄 Error Handling**: Graceful network error management
- **⚡ Loading States**: Professional loading indicators
- **🎭 Animations**: Smooth message transitions and interactions

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Built with ❤️ for the legal community
- Uses Google's Gemini AI for intelligent responses
- Designed with accessibility and inclusivity in mind

---

**Ready to explore Indian legal knowledge? Start chatting now!** 🚀
