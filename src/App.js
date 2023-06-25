import React, { useEffect, useState } from 'react';
import { Widget, addResponseMessage } from 'react-chat-widget';
import { db, doc, getDoc } from './firebase';
import 'firebase/firestore';
import './App.css';

function App() {
  const [widgetParams, setWidgetParams] = useState({});
  const urlParams = new URLSearchParams(window.location.search);
  const businessId = urlParams.get('businessId');
  const [errorMessage, setErrorMessage] = useState(null);

  const handleNewUserMessage = (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);
    // Now send the message through the backend API
  };

  useEffect(() => {
    const fetchData = async () => {
      if (businessId) {  // Check if a businessId is provided
        try {
          const docRef = doc(db, 'businesses', businessId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();

            addResponseMessage(data.greeting);

            setWidgetParams({
              titleBgColor: data.titleBgColor,
              emojiColor: data.emojiColor,
              userMsgBgColor: data.userMsgBgColor,
              titleTextColor: data.titleTextColor,
              userMsgTextColor: data.userMsgTextColor,
              title: data.title,
              subtitle: data.subtitle,
              logo: data.logo,
            });

            const style = document.createElement('style');
            style.textContent = `
        .rcw-conversation-container .rcw-header,
        .quick-button, .quick-button:active,
        .rcw-full-screen .rcw-close-button, .rcw-launcher,.rcw-conversation-container .rcw-close-button {
          background-color: ${data.titleBgColor} !important;
        }

        .emoji-mart-anchor-bar {
          background-color: ${data.emojiColor} !important;
        }

        .emoji-mart-anchor-selected {
          color: ${data.emojiColor} !important;
        }

        .rcw-client .rcw-message-text {
          background-color: ${data.userMsgBgColor} !important;
        }

        .rcw-conversation-container .rcw-title,
        .rcw-conversation-container .rcw-header {
          color: ${data.titleTextColor} !important;
        }

        .rcw-client .rcw-message-text p {
          color: ${data.userMsgTextColor} !important;
        }
      `;

            document.head.appendChild(style);
          } else {
            console.log('No such document!');
          }
        } catch (error) {
          console.log('Error getting document:', error);
        }
      } else {
        setErrorMessage('No businessId provided. This is not the correct link for your chat bot. Your link should have this structure "https://example-link?businessId=1"');
      }
    };

    fetchData();
  }, [businessId]);

  if (errorMessage) {
    return (
      <h3 className="App">
        {errorMessage}
      </h3>
    );
  }

  return (
    <div className="App chat-widget-container">
      <Widget
        handleNewUserMessage={handleNewUserMessage}
        profileAvatar={widgetParams.logo}
        title={widgetParams.title}
        subtitle={widgetParams.subtitle}
        emojis="true"
      />
    </div>
  );
}

export default App;