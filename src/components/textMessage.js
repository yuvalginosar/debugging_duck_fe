import React, { useState } from 'react';
import axios from 'axios';
import './ChatForm.css';
import { ColorRing } from  'react-loader-spinner';

const TextComponent = ({ setMessages }) => {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false)


  const handleClick = async (event) => {
    try {
        setIsLoading(true)
        event.preventDefault();
      const response = await axios.post('http://localhost:8000/text', { text: inputText });
      setMessages(response.data);
      setInputText(''); 
      setIsLoading(false)
    } catch (error) {
      console.error("Error sending message", error);
    }
  };

  const handleChange = (event) => {
    setInputText(event.target.value);
  };

  return (
    <form className="chat-form" onSubmit={handleClick}>
    <textarea
      className="chat-textarea"
      value={inputText}
      onChange={handleChange}
      placeholder="Type your message..."
    />
    {isLoading? 
         <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />
    :
        <button className="chat-button" type="submit">Send</button>
    }
  </form>
  );
};

export default TextComponent