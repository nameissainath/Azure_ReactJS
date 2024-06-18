
//without settings

import { useState } from 'react';
import './ChatApp.css'; // Create a CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPaperPlane, faRobot } from '@fortawesome/free-solid-svg-icons';

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  // Hardcoded settings
  const apiUrl = '';
  const apiKey = '';

  const addMessage = (text, role) => {
    const newMessage = { text, role };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const handleUserInput = (e) => {
    setInputText(e.target.value);
  };

  const handleSendMessage = async () => {
    if (inputText.trim() === '') return;

    // Prepare the request payload
    const requestBody = {
      messages: [
        { role: 'user', content: inputText },
      ],
      max_tokens: 800,
      temperature: 0.7,
    };

    addMessage(inputText, 'user');
    setInputText('');

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
          'api-key': apiKey,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response from the AI assistant');
      }

      const responseData = await response.json();
      console.log('Response data:', responseData);
      const assistantReply = responseData.choices[0]?.message.content; // Extract the assistant's reply from the response

      addMessage(assistantReply, 'assistant');
    } catch (error) {
      console.error('Error fetching data from the API:', error.message);
      addMessage('Error fetching data from the API', 'assistant');
    }
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  return (
    <div className="container">
      <h2><FontAwesomeIcon icon={faRobot} /> Azure Chatbot</h2>
      <div className="chat-app">
        <div className="chat-window">
          {messages.map((message, index) => (
            <div key={index} className={message.role === 'user' ? 'user-message' : 'assistant-message'}>
              {message.text}
            </div>
          ))}
        </div>
        <div className="input-container">
          <input
            type="text"
            value={inputText}
            onChange={handleUserInput}
            placeholder="Type your message..."
          />
          <button onClick={handleSendMessage}><FontAwesomeIcon icon={faPaperPlane} /> Send</button>
          <button onClick={handleClearChat}><FontAwesomeIcon icon={faTrashCan} /> Clear</button>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;




//with seetings



// import { useState } from 'react';
// import './ChatApp.css'; // Create a CSS file for styling
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCog, faTrashCan, faPaperPlane, faRobot } from '@fortawesome/free-solid-svg-icons';

// const ChatApp = () => {
//   const [messages, setMessages] = useState([]);
//   const [inputText, setInputText] = useState('');
//   const [showSettings, setShowSettings] = useState(false);
//   const [settingsData, setSettingsData] = useState({
//     apiUrl: '',
//     apiKey: '',
//   });

//   const addMessage = (text, role) => {
//     const newMessage = { text, role };
//     setMessages((prevMessages) => [...prevMessages, newMessage]);
//   };

//   const handleUserInput = (e) => {
//     setInputText(e.target.value);
//   };

//   const handleSendMessage = async () => {
//     if (inputText.trim() === '') return;

//     // Prepare the request payload
//     const requestBody = {
//       messages: [
//         { role: 'user', content: inputText },
//       ],
//       max_tokens: 800,
//       temperature: 0.7,
//     };

//     addMessage(inputText, 'user');
//     setInputText('');

//     try {
//       const response = await fetch(settingsData.apiUrl, {
//         method: 'POST',
//         body: JSON.stringify(requestBody),
//         headers: {
//           'Content-Type': 'application/json',
//           'api-key': settingsData.apiKey,
//         },
//       });

//       if (!response.ok) {
//         throw new Error('Failed to fetch response from the AI assistant');
//       }

//       const responseData = await response.json();
//       console.log('Response data:', responseData);
//       const assistantReply = responseData.choices[0]?.message.content; // Extract the assistant's reply from the response

//       addMessage(assistantReply, 'assistant');
//     } catch (error) {
//       console.error('Error fetching data from the API:', error.message);
//       addMessage('Error fetching data from the API', 'assistant');
//     }
//   };

//   const handleClearChat = () => {
//     setMessages([]);
//   };

//   const handleSettingsClick = () => {
//     setShowSettings(true);
//   };

//   const handleSettingsClose = () => {
//     setShowSettings(false);
//   };

//   const handleSaveSettings = () => {
//     // You may want to add validation logic here before saving the settings
//     setSettingsData({ apiUrl: settingsData.apiUrl, apiKey: settingsData.apiKey });
//     setShowSettings(false);
//   };

//   return (
//     <div className="container">
//       <h2><FontAwesomeIcon icon={faRobot} /> Azure Chatbot</h2>
      
//       {showSettings && (
//         <div className="settings-popup">
//           <div className="settings-content">
//             <label htmlFor="apiUrl">API URL:</label>
//             <input
//               type="text"
//               id="apiUrl"
//               value={settingsData.apiUrl}
//               onChange={(e) => setSettingsData({ ...settingsData, apiUrl: e.target.value })}
//             />

//             <label htmlFor="apiKey">API Key:</label>
//             <input
//               type="text"
//               id="apiKey"
//               value={settingsData.apiKey}
//               onChange={(e) => setSettingsData({ ...settingsData, apiKey: e.target.value })}
//             />

//             <button onClick={handleSaveSettings}>Save</button>
//             <button onClick={handleSettingsClose}>Cancel</button>
//           </div>
//         </div>
//       )}

//       <div className="chat-app">
//         <div className="chat-window">
//           {messages.map((message, index) => (
//             <div key={index} className={message.role === 'user' ? 'user-message' : 'assistant-message'}>
//               {message.text}
//             </div>
//           ))}
//         </div>
//         <div className="input-container">
//           <input
//             type="text"
//             value={inputText}
//             onChange={handleUserInput}
//             placeholder="Type your message..."
//           />
//           <button onClick={handleSendMessage}><FontAwesomeIcon icon={faPaperPlane} /> Send</button>
//           <button onClick={handleClearChat}><FontAwesomeIcon icon={faTrashCan} /> Clear</button>
//           <button className="settings-button" onClick={handleSettingsClick}>
//             <FontAwesomeIcon icon={faCog} /> Settings
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatApp;


