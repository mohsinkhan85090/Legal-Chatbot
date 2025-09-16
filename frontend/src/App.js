import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import './App.css';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState('light');
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const { t, i18n } = useTranslation();

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('chatHistory');
    const savedTheme = localStorage.getItem('theme');
    const savedLanguage = localStorage.getItem('language');

    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (e) {
        console.error('Error loading chat history:', e);
      }
    }

    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }

    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, []); // Remove dependencies to avoid infinite re-renders

  // Add welcome message when translation is ready and no messages exist
  useEffect(() => {
    if (messages.length === 0 && i18n.isInitialized) {
      const welcomeMessage = {
        id: Date.now(),
        text: t('welcomeMessage'),
        sender: 'bot',
        timestamp: Date.now()
      };
      setMessages([welcomeMessage]);
    }
  }, [messages.length, t, i18n.isInitialized]);

  // Scroll to bottom when new messages are added
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatHistory', JSON.stringify(messages));
    }
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (messageText) => {
    const userMessage = {
      id: Date.now(),
      text: messageText,
      sender: 'user',
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://127.0.0.1:5000/chat', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: messageText })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      const botMessage = {
        id: Date.now() + 1,
        text: data.answer || 'Sorry, I didn\'t receive a proper response.',
        sender: 'bot',
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: t('error'),
        sender: 'bot',
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, errorMessage]);
      setError('Failed to connect to the server. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  const clearChat = () => {
    const welcomeMessage = {
      id: Date.now(),
      text: t('welcomeMessage'),
      sender: 'bot',
      timestamp: Date.now()
    };
    setMessages([welcomeMessage]);
    localStorage.removeItem('chatHistory');
  };

  const exportChat = () => {
    const chatText = messages.map(msg => 
      `[${new Date(msg.timestamp).toLocaleString()}] ${msg.sender.toUpperCase()}: ${msg.text}`
    ).join('\n');
    
    const blob = new Blob([chatText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `legal-chat-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="app">
      {/* Background Video */}
      <video className="background-video" autoPlay muted loop>
        <source src="/assets.mp4" type="video/mp4" />
      </video>

      {/* Header */}
      <div className="app-header desktop-only">
        <h1 className="app-title">{t('title')}</h1>
      </div>

      {/* Control Panel */}
      <div className="control-panel desktop-only">
        <button onClick={toggleTheme} className="control-button" title={theme === 'light' ? t('darkMode') : t('lightMode')}>
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
        <select 
          onChange={(e) => changeLanguage(e.target.value)} 
          value={i18n.language}
          className="language-selector"
          title={t('language')}
        >
          <option value="en">English</option>
          <option value="hi">हिन्दी</option>
        </select>
        <button onClick={clearChat} className="control-button" title={t('clearChat')}>
          🗑️
        </button>
        <button onClick={exportChat} className="control-button" title={t('saveChat')}>
          💾
        </button>
      </div>

      {/* Chat Container */}
      <div className="chat-container mobile-responsive">
        {/* Mobile Header */}
        <div className="chat-header mobile-only">
          <h2 className="chat-title">{t('title')}</h2>
          <div className="mobile-controls">
            <button onClick={toggleTheme} className="mobile-control-button">
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <select 
              onChange={(e) => changeLanguage(e.target.value)} 
              value={i18n.language}
              className="mobile-language-selector"
            >
              <option value="en">EN</option>
              <option value="hi">हि</option>
            </select>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="chat-messages">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message.text}
              sender={message.sender}
              timestamp={message.timestamp}
            />
          ))}
          {isLoading && (
            <ChatMessage
              message=""
              sender="bot"
              isLoading={true}
            />
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Error Display */}
        {error && (
          <div className="error-banner">
            <span>⚠️ {error}</span>
            <button onClick={() => setError(null)} className="error-close">×</button>
          </div>
        )}

        {/* Chat Input */}
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default App;