import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ChatMessage from '../components/ChatMessage';

describe('ChatMessage Component', () => {
  test('renders user message correctly', () => {
    render(
      <ChatMessage 
        message="Test user message"
        isUser={true}
        timestamp={Date.now()}
      />
    );
    
    expect(screen.getByText('Test user message')).toBeInTheDocument();
    const messageElement = screen.getByText('Test user message').closest('.chat-message');
    expect(messageElement).toHaveClass('user-message');
  });

  test('renders bot message correctly', () => {
    render(
      <ChatMessage 
        message="Test bot message"
        isUser={false}
        timestamp={Date.now()}
      />
    );
    
    expect(screen.getByText('Test bot message')).toBeInTheDocument();
    const messageElement = screen.getByText('Test bot message').closest('.chat-message');
    expect(messageElement).toHaveClass('bot-message');
  });

  test('renders loading state correctly', () => {
    render(<ChatMessage isLoading={true} />);
    
    expect(screen.getByText('loadingMessage')).toBeInTheDocument();
    expect(screen.getByText('loadingMessage').closest('.message-content')).toHaveClass('loading');
  });

  test('displays timestamp when provided', () => {
    const timestamp = Date.now();
    render(
      <ChatMessage 
        message="Test message"
        isUser={false}
        timestamp={timestamp}
      />
    );
    
    const timestampElement = screen.getByText(/AM|PM/);
    expect(timestampElement).toBeInTheDocument();
  });

  test('does not display timestamp when not provided', () => {
    render(
      <ChatMessage 
        message="Test message"
        isUser={false}
      />
    );
    
    const timestampElement = screen.queryByText(/AM|PM/);
    expect(timestampElement).not.toBeInTheDocument();
  });
});
