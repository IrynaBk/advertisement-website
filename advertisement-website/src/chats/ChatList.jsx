import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./ChatList.scss";
import Loading from '../shared/Loading';
import Navbar from '../shared/Navigation';
import Footer from '../shared/Footer';

function ChatList() {
  axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
  let userString = localStorage.getItem('user');
  const user = JSON.parse(userString);

  const [chatRooms, setChatRooms] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:3000/chat_rooms')
      .then(response => setChatRooms(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    chatRooms?
    <>
    <Navbar></Navbar>
    <section className='chatlist-sec'>
      <div className='container'>
        <div className='content'>
    <div className='chat-list'>
      {chatRooms.map(chatRoom => (
        <div className='chat' key={chatRoom.id}>
          <Link to={`/chat_rooms/${chatRoom.id}`}>
            {chatRoom.user1_id === user.id ? chatRoom.user2.full_name  : chatRoom.user1.full_name}
          </Link>
        </div>
      ))}
      </div>
    </div>
    </div>
    </section>
     <Footer></Footer>
     </>: <Loading></Loading>
  );
}
export default ChatList;
