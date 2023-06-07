import React, { useEffect } from 'react';
import { Widget, addResponseMessage } from 'react-chat-widget';
import './App.css';

function App() {
  useEffect(() => {
    addResponseMessage('Welcome to **Nostal\'s** chatbot. How can we help you today?');
  }, []);

  const nostalLogo = 'https://github.com/fati-m/react-chat-widget-test2/blob/main/src/nostalLogo.png?raw=true';

  const handleNewUserMessage = (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);
    // Now send the message throught the backend API
  };

  return (
    <div className="App chat-widget-container">
      <Widget
        handleNewUserMessage={handleNewUserMessage}
        profileAvatar={nostalLogo}
        title="Nostal Chatbot"
        subtitle="Here to help!"
        styles={{
          timestamp: { fontSize: '10px', marginTop: '5px' },
          client: { timestamp: { alignSelf: 'flex-end' } },
          messageText: { p: { margin: '0' } },
          conversationContainer: {
            header: {
              backgroundColor: '#D400FC',
              borderRadius: '10px 10px 0 0',
              color: '#fff',
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'center',
              padding: '15px 0 25px'
            },
            title: { fontSize: '24px', margin: '0', padding: '15px 0' }
          },
          newMessage: {
            backgroundColor: '#fff',
            border: '0',
            borderRadius: '5px',
            padding: '10px 5px',
            resize: 'none',
            width: 'calc(100% - 75px)'
          }
        }}
      />
    </div>
  );
}

export default App;