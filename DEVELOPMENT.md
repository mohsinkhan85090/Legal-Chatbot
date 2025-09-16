# Legal Chatbot - Development Documentation

## Project Overview

This project has been enhanced from a vanilla HTML/CSS/JavaScript legal chatbot to a modern React-based application with comprehensive features.

## Architecture

### Frontend Structure
```
frontend/
├── public/
│   ├── index.html          # Main HTML template
│   └── assets.mp4          # Background video
├── src/
│   ├── components/         # React components
│   │   ├── ChatBox.js      # Main chat interface
│   │   ├── ChatMessage.js  # Individual message component
│   │   ├── ChatInput.js    # Input field component
│   │   └── Header.js       # App header with controls
│   ├── contexts/
│   │   └── ThemeContext.js # Theme management
│   ├── styles/
│   │   └── App.css         # Main stylesheet with themes
│   ├── __tests__/          # Test files
│   ├── App.js              # Main app component
│   ├── index.js            # Entry point
│   ├── i18n.js             # Internationalization setup
│   └── setupTests.js       # Test configuration
├── package.json            # Dependencies and scripts
```

## Key Features

### 1. Theme System
- **Light/Dark Mode Toggle**: Switches between themes
- **System Preference Detection**: Automatically detects user's preferred theme
- **CSS Custom Properties**: Used for seamless theme switching
- **Persistent Storage**: Theme preference saved in localStorage

### 2. Multilingual Support
- **Languages**: English and Hindi
- **Dynamic Translation**: Real-time language switching
- **Comprehensive Coverage**: All UI elements translated
- **Error Messages**: Localized error handling

### 3. Chat Features
- **Conversation History**: Persisted in localStorage
- **Message Timestamps**: Show when messages were sent
- **Loading States**: Visual feedback during API calls
- **Error Handling**: Network and server error management
- **Auto-scroll**: Messages scroll smoothly to bottom

### 4. Responsive Design
- **Mobile-First**: Optimized for mobile devices
- **Adaptive Layout**: Responds to different screen sizes
- **Touch-Friendly**: Buttons and controls sized for touch interaction

### 5. Animations
- **Smooth Transitions**: Theme changes and interactions
- **Message Animations**: Slide-in effects for new messages
- **Loading Spinners**: During API calls and processing

## Development Commands

```bash
# Install dependencies
cd frontend && npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

## Component API

### ChatMessage
```javascript
<ChatMessage 
  message="Text content"
  isUser={boolean}
  timestamp={timestamp}
  isLoading={boolean}
/>
```

### ChatInput
```javascript
<ChatInput 
  onSendMessage={function}
  isLoading={boolean}
  disabled={boolean}
/>
```

### Theme Usage
```javascript
import { useTheme } from './contexts/ThemeContext';

const { theme, toggleTheme } = useTheme();
```

## Styling

### CSS Custom Properties
The app uses CSS custom properties for theming:

```css
:root {
  --bg-primary: #ffffff;
  --text-primary: #1a202c;
  --user-bubble: #2b6cb0;
  /* ... other properties */
}

[data-theme="dark"] {
  --bg-primary: #1a202c;
  --text-primary: #f7fafc;
  /* ... dark theme overrides */
}
```

### Responsive Breakpoints
- Mobile: < 480px
- Tablet: 768px
- Desktop: > 768px

## Backend Integration

The frontend expects a backend API at `http://127.0.0.1:5000/chat` with:

```javascript
// Request format
{
  "query": "User's legal question"
}

// Response format
{
  "answer": "Bot's response"
}
```

## Testing

Test files are located in `src/__tests__/` and cover:
- Component rendering
- User interactions
- Theme functionality
- Error handling
- Responsive behavior

## Browser Support

- Modern browsers with ES6 support
- Mobile Safari, Chrome Mobile
- Chrome, Firefox, Safari, Edge

## Accessibility

- ARIA labels for screen readers
- Keyboard navigation support
- High contrast theme support
- Focus management

## Future Enhancements

- Voice input/output
- File attachment support
- Chat export functionality
- Advanced error recovery
- Offline mode support
- Additional languages

## Contributing

1. Follow React best practices
2. Maintain test coverage
3. Update documentation for new features
4. Use semantic commit messages
5. Ensure mobile compatibility