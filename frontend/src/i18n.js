import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "title": "LegalChatBot",
      "chat": "Chat",
      "placeholder": "Ask a legal question...",
      "send": "Send",
      "error": "Oops! Something went wrong.",
      "loading": "Thinking...",
      "darkMode": "Dark Mode",
      "lightMode": "Light Mode",
      "language": "Language",
      "clearChat": "Clear Chat",
      "saveChat": "Save Chat",
      "welcomeMessage": "Hello! I'm your legal assistant. How can I help you today?"
    }
  },
  hi: {
    translation: {
      "title": "कानूनी चैटबॉट",
      "chat": "चैट",
      "placeholder": "कानूनी प्रश्न पूछें...",
      "send": "भेजें",
      "error": "उफ़! कुछ गलत हुआ।",
      "loading": "सोच रहा हूँ...",
      "darkMode": "डार्क मोड",
      "lightMode": "लाइट मोड",
      "language": "भाषा",
      "clearChat": "चैट साफ़ करें",
      "saveChat": "चैट सहेजें",
      "welcomeMessage": "नमस्ते! मैं आपका कानूनी सहायक हूँ। आज मैं आपकी कैसे मदद कर सकता हूँ?"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,

    interpolation: {
      escapeValue: false,
    },

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage'],
    }
  });

export default i18n;