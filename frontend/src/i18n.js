import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation files
const resources = {
  en: {
    translation: {
      "appTitle": "LegalChatBot",
      "chatHeader": "Chat",
      "inputPlaceholder": "Ask a legal question...",
      "sendButton": "Send",
      "loadingMessage": "Thinking...",
      "errorMessage": "Oops! Something went wrong. Please try again.",
      "networkError": "Unable to connect to the server. Please check your internet connection.",
      "welcomeMessage": "Hello! I'm your legal assistant. Feel free to ask me any questions about Indian law.",
      "clearHistory": "Clear History",
      "darkMode": "Dark Mode",
      "lightMode": "Light Mode",
      "language": "Language",
      "today": "Today",
      "yesterday": "Yesterday"
    }
  },
  hi: {
    translation: {
      "appTitle": "लीगल चैटबॉट",
      "chatHeader": "चैट",
      "inputPlaceholder": "कानूनी प्रश्न पूछें...",
      "sendButton": "भेजें",
      "loadingMessage": "सोच रहा हूं...",
      "errorMessage": "ओह! कुछ गलत हुआ। कृपया पुनः प्रयास करें।",
      "networkError": "सर्वर से कनेक्ट नहीं हो सका। कृपया अपना इंटरनेट कनेक्शन जांचें।",
      "welcomeMessage": "नमस्ते! मैं आपका कानूनी सहायक हूं। भारतीय कानून के बारे में मुझसे कोई भी प्रश्न पूछ सकते हैं।",
      "clearHistory": "इतिहास साफ करें",
      "darkMode": "डार्क मोड",
      "lightMode": "लाइट मोड",
      "language": "भाषा",
      "today": "आज",
      "yesterday": "कल"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: true,

    interpolation: {
      escapeValue: false
    },

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage']
    }
  });

export default i18n;