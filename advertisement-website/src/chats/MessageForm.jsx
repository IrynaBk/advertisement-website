import React, { useState } from 'react';
import axios from 'axios';

const MessageForm = ({ onSend }) => {
  const [text, setText] = useState('');
 

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:3000/messages', { text: text })
      .then((response) => {
        onSend(response.data);
        setText('');
      })
      .catch((error) => console.log(error));
  };
 

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={text} onChange={handleChange} />
      <button type="submit">Send</button>
    </form>
  );
};

export default MessageForm;
