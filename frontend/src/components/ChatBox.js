import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

const ChatBox = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const chatBoxRef = useRef(null);

  // Load conversation history from localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem('legal-chatbot-history');
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (error) {
        console.error('Error loading chat history:', error);
      }
    } else {
      // Add welcome message
      setMessages([{
        id: Date.now(),
        text: t('welcomeMessage'),
        isUser: false,
        timestamp: Date.now()
      }]);
    }
  }, [t]);

  // Save conversation history to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('legal-chatbot-history', JSON.stringify(messages));
    }
  }, [messages]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const sendMessage = async (message) => {
    const userMessage = {
      id: Date.now(),
      text: message,
      isUser: true,
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
        body: JSON.stringify({ query: message }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      
      const botMessage = {
        id: Date.now() + 1,
        text: data.answer || t('errorMessage'),
        isUser: false,
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: error.message.includes('fetch') ? t('networkError') : t('errorMessage'),
        isUser: false,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, errorMessage]);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const clearHistory = () => {
    setMessages([{
      id: Date.now(),
      text: t('welcomeMessage'),
      isUser: false,
      timestamp: Date.now()
    }]);
    localStorage.removeItem('legal-chatbot-history');
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>{t('chatHeader')}</h2>
        <button onClick={clearHistory} className="clear-history-btn" title={t('clearHistory')}>
          <svg viewBox="0 0 24 24" width="16" height="16">
            <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
          </svg>
        </button>
      </div>
      
      <div className="chat-messages" ref={chatBoxRef}>
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message.text}
            isUser={message.isUser}
            timestamp={message.timestamp}
          />
        ))}
        {isLoading && <ChatMessage isLoading={true} />}
      </div>

      <ChatInput
        onSendMessage={sendMessage}
        isLoading={isLoading}
        disabled={!!error}
      />
    </div>
  );
};

export default ChatBox;
