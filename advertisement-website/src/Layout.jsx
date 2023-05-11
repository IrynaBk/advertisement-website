import { Outlet, Link } from "react-router-dom";
import Footer from "./shared/Footer";

const Layout = () => {
  return (
    <>
      <Outlet />
    </>
  )
};

export default Layout;