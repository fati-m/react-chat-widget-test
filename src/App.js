import React, { useEffect, useState } from 'react';
import { Widget, addResponseMessage } from 'react-chat-widget';
import { db, doc, getDoc } from './firebase';
import 'firebase/firestore';
import './App.css';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [widgetParams, setWidgetParams] = useState({});
  const urlParams = new URLSearchParams(window.location.search);
  const businessId = urlParams.get('businessId');
  const [errorMessage, setErrorMessage] = useState(null);
  const [uid, setUid] = useState(uuidv4());
  const [webSocket, setWebSocket] = useState(new WebSocket("wss://oyb4zhl78j.execute-api.us-east-2.amazonaws.com/test/"));


  const handleNewUserMessage = (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);
    // Send the message to the server via WebSocket
    webSocket.send(JSON.stringify({ text: newMessage, uid: uid }));
  };

  useEffect(() => {
    webSocket.onopen = (event) => {
      webSocket.send(JSON.stringify({ action: "sendmessage", message: "hi", id: uid }))
    }
    webSocket.onmessage = (event) => {
      console.log("This is a message coming from server");
      console.log(event.data);
      const dataObject = JSON.parse(event.data);

      // Example handling, adapt it as needed

      addResponseMessage(dataObject.message);
      // Other handling code...
    };

    webSocket.onclose = (event) => {
      // Reconnection logic
    };

    webSocket.onerror = (err) => {
      console.log('Socket encountered error: ', err.message, 'Closing socket');
      webSocket.close();
    };
    const fetchData = async () => {
      if (businessId) {  // Check if a businessId is provided
        try {
          const docRef = doc(db, 'businesses', businessId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();

            // addResponseMessage(data.greeting);

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
        setErrorMessage('No businessId provided. This is not the correct link for your chat bot. Your link should have this structure "https://react-chat-widget-test2.vercel.app/?businessId=1"');
      }
    };

    fetchData();
    return () => {
      webSocket.close();
    };
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