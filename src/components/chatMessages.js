import React from 'react';
import './ChatMessages.css';

const ChatMessages = ({ messages }) => {
  const filteredMessages = messages.filter(message => message.role !== 'system');

  return (
    <div className="chat-messages">
      {filteredMessages.map((message, index) => (
        <div key={index} className={`message ${message.role}`}>
          {message.content}
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
