import AdvertisementsList from "./AdvertisementsList";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import NoPage from "./NoPage";
import AdPage from "./AdPage";
import Login from "./Login";
import Signup from "./Signup";

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

          {/*<Route path="contact" element={<Contact />} />*/}
          <Route path="*" element={<NoPage />} /> 
        </Route>
      </Routes>
    </BrowserRouter>
  );
}