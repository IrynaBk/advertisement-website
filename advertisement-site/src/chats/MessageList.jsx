import React, { useRef, useEffect } from 'react';

const MessageList = (props) => {

  const { messages, otherId, onLoadMore } = props;

  function formatDate(dateString) {
    const date = new Date(dateString);
    const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return `${formattedTime}`;
  }

  const container = useRef(null)

  const Scroll = () => {
    const { offsetHeight, scrollHeight, scrollTop } = container.current
    if (scrollHeight <= scrollTop + offsetHeight + 100) {
      container.current?.scrollTo(0, scrollHeight)
    }
  }

  useEffect(() => {
    Scroll()
  }, [messages])

  const scrollToBottom = () => {
    if (container.current) {
      container.current.scrollTop = container.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, []);
  
  return (
    <div className="message-list" ref={container}>
      <button className="minimalistic-button" onClick={onLoadMore}>Load more messages</button>
      {messages.map((message) => (
        <div id={message.id} className={`message ${message.user_id === otherId ? 'not-my-message' : 'own-message'}`} key={message.id}>
          <span className="text">{message.body}</span> <span className="time">{formatDate(message.created_at)}</span>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
