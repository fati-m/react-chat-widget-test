import React, { useEffect } from 'react';
import { Widget, addResponseMessage } from 'react-chat-widget';
import './App.css';
import nostalLogo from './nostalLogo.png';

function App() {
  useEffect(() => {
    addResponseMessage('Welcome to **Nostal\'s** chatbot. How can we help you today?');
  }, []);

  const handleNewUserMessage = (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);
    // Now send the message throught the backend API
  };

  return (
    <div className="App">
      <Widget
        handleNewUserMessage={handleNewUserMessage}
        profileAvatar={nostalLogo}
        title="Nostal Chatbot"
        subtitle="Here to help!"
      />
    </div>
  );
}

export default App;