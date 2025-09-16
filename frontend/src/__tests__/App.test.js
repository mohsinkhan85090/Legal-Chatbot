import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

describe('App Component', () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.getItem.mockReturnValue(null);
  });

  test('renders main app components', () => {
    render(<App />);
    
    expect(screen.getByText('appTitle')).toBeInTheDocument();
    expect(screen.getByText('chatHeader')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('inputPlaceholder')).toBeInTheDocument();
  });

  test('theme toggle functionality', async () => {
    render(<App />);
    
    const themeButton = screen.getByRole('button', { name: /mode/i });
    fireEvent.click(themeButton);
    
    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith('theme', expect.any(String));
    });
  });

  test('language selector is present', () => {
    render(<App />);
    
    const languageSelect = screen.getByRole('combobox');
    expect(languageSelect).toBeInTheDocument();
  });
});
