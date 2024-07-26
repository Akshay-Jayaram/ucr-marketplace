import { Link } from "react-router-dom";
import "./card.scss";
import { Trash2, MapPin } from "lucide-react";


function Card({ item }) {
  return (
    <div className="card">
      <Link to={`/${item.id}`} className="imageContainer">
        <img src={item.img} alt="" />
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
              {/*<img src="/bed.png" alt="" />*/}
              <span>{item.bedroom} bedroom</span>
            </div>
            <div className="feature">
              {/*<img src="/bath.png" alt="" />*/}
              <span>{item.bathroom} bathroom</span>
            </div>
          </div>
          <div className="icons">
            <div className="icon">
              <Trash2 size={20} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
