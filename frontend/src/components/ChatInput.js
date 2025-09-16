import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './ChatInput.css';

const ChatInput = ({ onSendMessage, isLoading = false }) => {
  const [message, setMessage] = useState('');
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="chat-input-container">
      <form onSubmit={handleSubmit} className="chat-input-form">
        <div className="input-wrapper">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t('placeholder')}
            className="message-input"
            disabled={isLoading}
            maxLength={500}
          />
          <button
            type="submit"
            disabled={!message.trim() || isLoading}
            className="send-button"
            aria-label={t('send')}
          >
            {isLoading ? (
              <div className="loading-spinner"></div>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22,2 15,22 11,13 2,9"></polygon>
              </svg>
            )}
          </button>
        </div>
        <div className="character-count">
          {message.length}/500
        </div>
      </form>
    </div>
  );
};

export default ChatInput;