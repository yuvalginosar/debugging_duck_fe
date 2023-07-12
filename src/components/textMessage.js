import React, { useState } from 'react';
import axios from 'axios';
import './ChatForm.css';


const TextComponent = ({ setMessages }) => {
  const [inputText, setInputText] = useState('');

  const handleClick = async (event) => {
    try {
        event.preventDefault();
      const response = await axios.post('http://localhost:8000/text', { text: inputText });
      setMessages(response.data);
      setInputText(''); 
    } catch (error) {
      console.error("Error sending message", error);
    }
  };

  const handleChange = (event) => {
    setInputText(event.target.value);
  };

  return (
    // <div>
    //   <textarea value={inputText} onChange={handleChange} />
    //   <button onClick={handleClick}>Send</button>
    // </div>


    <form className="chat-form" onSubmit={handleClick}>
    <textarea
      className="chat-textarea"
      value={inputText}
      onChange={handleChange}
      placeholder="Type your message..."
    />
    <button className="chat-button" type="submit">Send</button>
  </form>
  );
};

export default TextComponent