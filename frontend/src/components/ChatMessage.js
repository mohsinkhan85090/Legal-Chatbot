import React from 'react';
import { useTranslation } from 'react-i18next';

const ChatMessage = ({ message, isUser, timestamp, isLoading = false }) => {
  const { t } = useTranslation();

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 48) {
      return t('yesterday');
    } else {
      return date.toLocaleDateString();
    }
  };

  if (isLoading) {
    return (
      <div className="chat-message bot-message">
        <div className="message-content loading">
          <div className="loading-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <span className="loading-text">{t('loadingMessage')}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`chat-message ${isUser ? 'user-message' : 'bot-message'}`}>
      <div className="message-content">
        <div className="message-text">{message}</div>
        {timestamp && (
          <div className="message-timestamp">{formatTime(timestamp)}</div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
