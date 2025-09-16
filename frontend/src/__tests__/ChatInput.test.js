import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ChatInput from '../components/ChatInput';

describe('ChatInput Component', () => {
  const mockOnSendMessage = jest.fn();

  beforeEach(() => {
    mockOnSendMessage.mockClear();
  });

  test('renders input field and send button', () => {
    render(<ChatInput onSendMessage={mockOnSendMessage} />);
    
    expect(screen.getByPlaceholderText('inputPlaceholder')).toBeInTheDocument();
    expect(screen.getByText('sendButton')).toBeInTheDocument();
  });

  test('calls onSendMessage when form is submitted', () => {
    render(<ChatInput onSendMessage={mockOnSendMessage} />);
    
    const input = screen.getByPlaceholderText('inputPlaceholder');
    const sendButton = screen.getByText('sendButton');
    
    fireEvent.change(input, { target: { value: 'Test message' } });
    fireEvent.click(sendButton);
    
    expect(mockOnSendMessage).toHaveBeenCalledWith('Test message');
  });

  test('calls onSendMessage when Enter key is pressed', () => {
    render(<ChatInput onSendMessage={mockOnSendMessage} />);
    
    const input = screen.getByPlaceholderText('inputPlaceholder');
    
    fireEvent.change(input, { target: { value: 'Test message' } });
    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter' });
    
    expect(mockOnSendMessage).toHaveBeenCalledWith('Test message');
  });

  test('clears input after sending message', () => {
    render(<ChatInput onSendMessage={mockOnSendMessage} />);
    
    const input = screen.getByPlaceholderText('inputPlaceholder');
    const sendButton = screen.getByText('sendButton');
    
    fireEvent.change(input, { target: { value: 'Test message' } });
    fireEvent.click(sendButton);
    
    expect(input.value).toBe('');
  });

  test('disables input and button when loading', () => {
    render(<ChatInput onSendMessage={mockOnSendMessage} isLoading={true} />);
    
    const input = screen.getByPlaceholderText('inputPlaceholder');
    const sendButton = screen.getByRole('button');
    
    expect(input).toBeDisabled();
    expect(sendButton).toBeDisabled();
  });

  test('disables input and button when disabled prop is true', () => {
    render(<ChatInput onSendMessage={mockOnSendMessage} disabled={true} />);
    
    const input = screen.getByPlaceholderText('inputPlaceholder');
    const sendButton = screen.getByRole('button');
    
    expect(input).toBeDisabled();
    expect(sendButton).toBeDisabled();
  });

  test('button is disabled when input is empty', () => {
    render(<ChatInput onSendMessage={mockOnSendMessage} />);
    
    const sendButton = screen.getByRole('button');
    
    expect(sendButton).toBeDisabled();
  });

  test('button is enabled when input has text', () => {
    render(<ChatInput onSendMessage={mockOnSendMessage} />);
    
    const input = screen.getByPlaceholderText('inputPlaceholder');
    const sendButton = screen.getByRole('button');
    
    fireEvent.change(input, { target: { value: 'Test message' } });
    
    expect(sendButton).not.toBeDisabled();
  });
});
