# ⚖️ Legal-Chatbot

An AI-powered legal advisor for **Indian laws**, designed to instantly provide users with relevant IPC sections, rights, and legal guidance based on real-world scenarios.  
Built with **Flask**, **Firestore**, and **RAG (Gemini API)** to ensure accurate, fast, and context-aware legal advice.

---

## 🚀 Features

- **Instant Legal Guidance** – Quickly retrieve IPC sections and their explanations.
- **Scenario-Based Queries** – Ask real-life legal questions (e.g., *"What are my rights if detained by police?"*).
- **RAG Integration** – Combines custom legal datasets with the **Gemini API** for precise answers.
- **Firestore Backend** – Efficient storage and retrieval of legal data.
- **Clean Web Interface** – Built using HTML and Tailwind CSS for a smooth user experience.

---

## 🛠️ Tech Stack

- **Backend:** Python, Flask  
- **Frontend:** HTML, Tailwind CSS  
- **Database:** Google Firestore  
- **AI Model:** Gemini API with Retrieval-Augmented Generation (RAG)  
- **Other:** REST API, JSON

---

## 🚀 Quick Start

### Prerequisites
- Python 3.7 or higher
- pip (Python package manager)

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/mohsinkhan85090/Legal-Chatbot.git
   cd Legal-Chatbot
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Start the backend server**
   ```bash
   ./run.sh
   ```
   Or manually:
   ```bash
   cd backend
   python app.py
   ```

4. **Open the frontend**
   - Open `index.html` in your web browser
   - Or use a local server:
     ```bash
     python -m http.server 8000
     ```
   - Then visit `http://localhost:8000`

### Usage
1. The Flask backend runs on `http://127.0.0.1:5000`
2. Open the chatbot interface in your browser
3. Ask legal questions in the chat interface
4. Get instant responses about Indian laws

### Testing
```bash
cd test
python test_backend.py
```

---
