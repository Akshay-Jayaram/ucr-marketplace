import { Link } from "react-router-dom";
import "./card.scss";
import { MessageCircle, MapPin, Save } from "lucide-react";
import { useNavigate, useLoaderData } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";


function Card({ item }) {
  const post = useLoaderData();
  const { currentUser } = useContext(AuthContext);
  const [saved, setSaved] = useState(post.isSaved);


  const handleSave = async () => {
    if (!currentUser) {
      navigate("/login");
    }
    // AFTER REACT 19 UPDATE TO USEOPTIMISTIK HOOK
    setSaved((prev) => !prev);
    try {
      await apiRequest.post("/users/save", { postId: item.id });
    } catch (err) {
      console.log(err);
      setSaved((prev) => !prev);
    }
  };

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
            <button
              className="icon"
              //onClick={handleSave}
              style={{
                backgroundColor: saved ? "#093250" : "white",
                color: saved ? "white" : "black",
              }}>
              <Save size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;