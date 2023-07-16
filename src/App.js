import { AudioRecorder } from "./components/recorderComponent";
import ChatMessages from "./components/chatMessages";
import React, { useState, useEffect } from "react";
import TextComponent from "./components/textMessage";
import './App.css'
import axios from 'axios';

function App() {
  const [messages, setMessages] = useState([])

  function changeMessagesHistory(msg){
    setMessages(msg)
  }

  const handleClearMessages = async () => {
    try {
      const response = await axios.get('http://localhost:8000/clear-chat');
      setMessages(response.data)
    } catch (error) {
        console.log('Error:', error);
    }
};
  
  return (
    <div className="App">
      <h1>Rubber Duck Dubugging with ChatGPT</h1>
      <div>
        <AudioRecorder setMessages={changeMessagesHistory}/>
      </div>
      <div className="text-area-container">
        <TextComponent setMessages={changeMessagesHistory} />
      </div>
      <button className="clear-btn" onClick={handleClearMessages}>
        Clear Chat History
      </button>
      <div>
        {messages.length > 1 && <ChatMessages messages={messages} />}
      </div>
    </div>
  );
}

export default App;

