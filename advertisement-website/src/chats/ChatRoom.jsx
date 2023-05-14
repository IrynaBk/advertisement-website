import React, { useState, useEffect } from 'react';
import Cable from 'actioncable';
import MessageList from './MessageList';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import AxiosClient from '../AxiosClient';
import "./Chat.scss";
import Navbar from "../shared/Navigation.jsx";
import Footer from "../shared/Footer.jsx";

const ChatRoom = () => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

const [messages, setMessages] = useState([]);

const {id} = useParams();

async function getMessages() {
  try {
    const response = await axios.get(`http://127.0.0.1:3000/chat_rooms/${id}/messages`);
    const data = response.data;
    console.log(data);
    setMessages(data);
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
  useEffect(() => {
    const cable = Cable.createConsumer('ws://localhost:3000/cable');
    const channel = cable.subscriptions.create(
      { channel: 'ChatsChannel', room: id },
      {
        received: (data) => {
          console.log(data, "datta");
          if (data.body) {
            setMessages((prevMessages) => [...prevMessages, data]);
          } else {
            setMessages(data);
          }
        },
      }
    );

    getMessages();

    return () => {
      channel.unsubscribe();
    };
  }, [id]);

  

  const [body, setBody] = useState('');
  const handleChange = (e) => {
    setBody(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`http://127.0.0.1:3000/chat_rooms/${id}/messages`, { body: body })
      .then((response) => {
        console.log(response);
        setBody('');
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
    <Navbar></Navbar>
    <section className='chatroom'>
    <div className="container">
      <div className='content'>
    <div className="user-panel">
      <Link to={`/chat_rooms`} className='back-to-chats'>back
      </Link>
      <h4>Hamster Hamstroiko </h4>
    </div>
      <div className="message-list">
      <MessageList messages={messages} />     
       </div>
    <div className="message-form-div">
      <form id="message-form" className='message-form' onSubmit={handleSubmit}>
        <div className="form-group">
          <input type="text" className="form-control" id="message-text" value={body} onChange={handleChange} placeholder="Enter your message"/>
        </div>
        <button type="submit" className="btn btn-primary">Send</button>
      </form>
      </div>
  </div>
</div>
    </section>
    <Footer></Footer>
    </>
  );
};

export default ChatRoom;

