import AdvertisementsList from "./advertisements/AdvertisementsList";
import axios from 'axios';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import NoPage from "./shared/NoPage";
import AdPage from "./advertisements/AdPage";
import Login from "./authentication/Login";
import Signup from "./authentication/Signup";
import UserPage from "./users/UserPage";
import EditUser from "./users/EditUser";
import EnterEmail from "./reset_password/EnterEmail";
import EnterPasswords from "./reset_password/EnterPasswords";
import ChatRoom from "./chats/ChatRoom";
import ChatList from "./chats/ChatList";

console.log(localStorage.getItem('token'));
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;


export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<AdvertisementsList />} />
           <Route path="/advertisements" element={<AdvertisementsList />} />
           <Route path="/advertisements/:id" element={<AdPage />} />
           <Route path="/login" element={<Login />} />
           <Route path="/signup" element={<Signup />} />
           <Route path="/users/:id" element={<UserPage />} />
           <Route path="/users/edit/:id" element={<EditUser />} />
           <Route path="/reset_password" element={<EnterEmail />} />
           <Route path="/reset_password/:token" element={<EnterPasswords />} />
           <Route exact path="/chat_rooms/:id" element={<ChatRoom/>} />
           <Route exact path="/chat_rooms" element={<ChatList/>} />



          {/*<Route path="contact" element={<Contact />} />*/}
          <Route path="*" element={<NoPage />} /> 
        </Route>
      </Routes>
    </BrowserRouter>
  );
}