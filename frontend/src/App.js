import React from 'react';
import './i18n';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import ChatBox from './components/ChatBox';
import './styles/App.css';

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        {/* Background Video */}
        <video className="bg-video" autoPlay muted loop>
          <source src="/assets.mp4" type="video/mp4" />
        </video>

        {/* Main Content */}
        <div className="app-content">
          <Header />
          <ChatBox />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
