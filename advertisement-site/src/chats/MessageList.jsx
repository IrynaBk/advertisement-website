import React, { useRef, useEffect } from 'react';

const MessageList = (props) => {

  const messageEl = useRef(null);

  const { messages, otherId, onLoadMore } = props;

  function formatDate(dateString) {
    const date = new Date(dateString);
    const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return `${formattedTime}`;
  }
  useEffect(() => {
    if (messageEl) {
      messageEl.current.addEventListener('DOMNodeInserted', event => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
      });
      // Set a timeout to wait for messages to load and scroll to bottom
      setTimeout(() => {
        messageEl.current.scroll({ top: messageEl.current.scrollHeight, behavior: 'smooth' });
      }, 1000);
    }
  }, []);

  
  return (
    <div className="message-list" ref={messageEl}>
            <button className="minimalistic-button" onClick={onLoadMore}>Load more messages</button>

      {messages.map((message) => (
        <div id = {message.id} className={`message ${message.user_id === otherId ? 'not-my-message' : 'own-message'}`} key={message.id}>
        <span className="text">{message.body}</span> <span className="time">{formatDate(message.created_at)}</span>
      </div>
      ))}
    </div>
  );
};

export default MessageList;
