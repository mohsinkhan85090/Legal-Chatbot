import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const ChatInput = ({ onSendMessage, isLoading, disabled = false }) => {
  const { t } = useTranslation();
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = input.trim();
    if (!message || isLoading || disabled) return;
    
    onSendMessage(message);
    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="chat-input">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={t('inputPlaceholder')}
        disabled={isLoading || disabled}
        className="chat-input-field"
      />
      <button
        type="submit"
        disabled={!input.trim() || isLoading || disabled}
        className="chat-send-button"
      >
        {isLoading ? (
          <div className="button-spinner"></div>
        ) : (
          t('sendButton')
        )}
      </button>
    </form>
  );
};

export default ChatInput;
