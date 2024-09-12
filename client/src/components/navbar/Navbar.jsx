import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./navbar.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useNotificationStore } from "../../lib/notificationStore";
import { Menu } from "lucide-react";


function Navbar() {
  const [open, setOpen] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleImageClick = () => {
    navigate('/profile');
  };
  const fetch = useNotificationStore((state) => state.fetch);
  const number = useNotificationStore((state) => state.number);

  if (currentUser) fetch();

  return (
    <nav>
      <div className="left">
        <a href="/" className="logo">
          <img src="/logo2.png" alt="" />
          {/*<span>R'CART</span>*/}
        </a>
        <a href="/list">Buy</a>
        <a href="https://forms.gle/SMMBcoxyHK9qTz7s9" target="_blank" rel="noopener noreferrer">Contact Us</a>
      </div>
      <div className="right">
        {currentUser ? (
          <div className="user">
            <img
              src={currentUser.avatar || "/noavatar.jpg"}
              alt=""
              onClick={handleImageClick}
            />
            <span>{currentUser.username}</span>
            <Link to="/profile" className="profile">
              {number > 0 && <div className="notification">{number}</div>}
              <span>Profile</span>
            </Link>
          </div>
        ) : (
          <>
            <a href="/login">Sign in</a>
            <a href="/register" className="register">
              Sign up
            </a>
          </>
        )}
        <div className="menuIcon">
          <Menu
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <a href="/list">Buy</a>
          <a href="https://forms.gle/SMMBcoxyHK9qTz7s9" target="_blank" rel="noopener noreferrer">Contact Us</a>
          <a href="/login">Sign in</a>
          <a href="/register">Sign up</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
