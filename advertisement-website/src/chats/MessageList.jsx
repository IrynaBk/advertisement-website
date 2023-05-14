import React from 'react';
import "./Chat.scss"

const MessageList = ({ messages }) => {

  function formatTime(date) {
    var hours = date.getUTCHours().toString().padStart(2, '0');
    var minutes = date.getUTCMinutes().toString().padStart(2, '0');
    var seconds = date.getUTCSeconds().toString().padStart(2, '0');
    return hours + ':' + minutes + ':' + seconds;
  }

  return (
    <div className="message-list">
      {messages.map((message) => (
        <div className="message" key={message.id}>
        <span className="text">{message.body}</span>
      </div>
      ))}
    </div>
  );
};

export default MessageList;
