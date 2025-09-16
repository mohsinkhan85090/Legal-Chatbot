import React from 'react';
import './ChatMessage.css';

const ChatMessage = ({ message, sender, timestamp, isLoading = false }) => {
  const isUser = sender === 'user';
  const messageClass = isUser ? 'chat-message user-message' : 'chat-message bot-message';
  const animationClass = isUser ? 'slide-in-right' : 'slide-in-left';

  return (
    <div className={`${messageClass} ${animationClass}`}>
      <div className="message-content">
        {isLoading ? (
          <div className="loading-message">
            <div className="loading-spinner"></div>
            <span>Thinking...</span>
          </div>
        ) : (
          <>
            <div className="message-text">{message}</div>
            {timestamp && (
              <div className="message-timestamp">
                {new Date(timestamp).toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;