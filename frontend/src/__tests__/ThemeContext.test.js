import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, useTheme } from '../contexts/ThemeContext';

// Test component that uses the theme context
const TestComponent = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

describe('ThemeContext', () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.getItem.mockReturnValue(null);
  });

  test('provides default light theme', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    
    expect(screen.getByTestId('theme')).toHaveTextContent('light');
  });

  test('loads theme from localStorage', () => {
    localStorage.getItem.mockReturnValue('dark');
    
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    
    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
  });

  test('toggles theme correctly', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    
    expect(screen.getByTestId('theme')).toHaveTextContent('light');
    
    fireEvent.click(screen.getByText('Toggle Theme'));
    
    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
    
    fireEvent.click(screen.getByText('Toggle Theme'));
    
    expect(screen.getByTestId('theme')).toHaveTextContent('light');
  });

  test('saves theme to localStorage when toggled', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    
    fireEvent.click(screen.getByText('Toggle Theme'));
    
    expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'dark');
  });

  test('throws error when useTheme is used outside ThemeProvider', () => {
    // Suppress console.error for this test
    const originalError = console.error;
    console.error = jest.fn();
    
    expect(() => render(<TestComponent />)).toThrow('useTheme must be used within a ThemeProvider');
    
    console.error = originalError;
  });
});
