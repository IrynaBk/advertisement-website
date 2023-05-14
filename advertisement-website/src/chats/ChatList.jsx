import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./ChatList.scss";

function ChatList() {
  axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
  let userString = localStorage.getItem('user');
  const user = JSON.parse(userString);

  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:3000/chat_rooms')
      .then(response => setChatRooms(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className='chat-list'>
      {chatRooms.map(chatRoom => (
        <div key={chatRoom.id}>
          <Link to={`/chat_rooms/${chatRoom.id}`}>
            {chatRoom.user1_id === user.id ? chatRoom.user2.username : chatRoom.user1.username}
          </Link>
        </div>
      ))}
    </div>
  );
}
export default ChatList;
