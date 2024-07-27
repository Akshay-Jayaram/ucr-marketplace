import { Link } from "react-router-dom";
import "./card.scss";
import { MessageCircle, MapPin, Save } from "lucide-react";


function Card({ item }) {
  return (
    <div className="card">
      <Link to={`/${item.id}`} className="imageContainer">
        {/*<img src={item.images[0]} alt="" />*/}
        {item.images && item.images.length > 0 ? (
          <img src={item.images[0]} alt="" />
        ) : (
          <img src="/default-image.png" alt="Default" />
        )}
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/${item.id}`}>{item.title}</Link>
        </h2>
        <p className="address">
          <MapPin />
          <span>{item.address}</span>
        </p>
        <p className="price">$ {item.price}</p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <span style={{ textTransform: "capitalize" }}>{item.category}</span>
            </div>
            <div className="feature">
              <span style={{ textTransform: "capitalize" }}>{item.condition} condition</span>
            </div>
          </div>
          <div className="icons">
            <div className="icon">
              <Save size={20} />
            </div>
            <div className="icon">
              <MessageCircle size={20} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;