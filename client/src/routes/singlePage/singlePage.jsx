import "./singlePage.scss";
import Slider from "../../components/slider/Slider";
import Map from "../../components/map/Map";
import { useNavigate, useLoaderData, Navigate } from "react-router-dom";
import DOMPurify from "dompurify";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { SocketContext } from "../../context/SocketContext";
import apiRequest from "../../lib/apiRequest";
import Chat from "../../components/chat/Chat";
import { useNotificationStore } from "../../lib/notificationStore";
import { MessageCircle, MapPin, Save, CircleCheckBig, BadgeDollarSign, List, ReceiptText, Truck } from "lucide-react";


function SinglePage() {
  const post = useLoaderData();
  const [saved, setSaved] = useState(post.isSaved);
  const { currentUser } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const [chat, setChat] = useState(null);
  const navigate = useNavigate();
  const recieverID = post.userId;
  const decrease = useNotificationStore((state) => state.decrease);

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  const handelSendMessage = async () => {
    if (!currentUser) {
      navigate("/login");
    } else {
      try {
        const response = await apiRequest.post("/chats", { receiverId: post.userId, postId: post.id });
        if (response.status === 200) {
          navigate("/profile");
        }
      } catch (error) {
        if (error.response && error.response.status === 400 && error.response.data.message === "Chat already exists for this post and users!") {
          navigate("/profile");
        } else {
          console.log(error);
        }
      }
    }
  }
  {/*
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await apiRequest.get("/chats");
        const chats = res.data;
        const existingChat = chats.find(
          (chat) =>
            chat.userIDs.includes(currentUser.id) && chat.userIDs.includes(recieverID)
        );
        if (existingChat) {
          setChat(existingChat);
        } else {
          const res = await apiRequest.post("/chats", {
            userIDs: [currentUser.id, recieverID],
          });
          setChat(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchChats();
  }, [currentUser.id, recieverID]);

  const handleChat = async () => {
    if (!currentUser) {
      navigate("/login");
    } else {
      if (chat) {
        handleOpenChat(chat.id, post.user);
      } else {
        const res = await apiRequest.post("/chats", {
          userIDs: [currentUser.id, recieverID],
        });
        setChat(res.data);
        handleOpenChat(res.data.id, post.user);
      }
    }
  };

  const handleOpenChat = async (id, receiver) => {
    try {
      const res = await apiRequest.get("/chats/" + id);
      if (!res.data.seenBy.includes(currentUser.id)) {
        decrease();
      }
      setChat({ ...res.data, receiver });
    } catch (err) {
      console.log(err);
    }
  };
  */}

  const handleSave = async () => {
    if (!currentUser) {
      navigate("/login");
    }
    // AFTER REACT 19 UPDATE TO USEOPTIMISTIK HOOK
    setSaved((prev) => !prev);
    try {
      await apiRequest.post("/users/save", { postId: post.id });
    } catch (err) {
      console.log(err);
      setSaved((prev) => !prev);
    }
  };

  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={post.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.title}</h1>
                <div className="address">
                  <MapPin />
                  <span>{post.address}</span>
                </div>
                <div className="price">$ {post.price}</div>
              </div>
              <div className="user">
                <img src={post.user.avatar ? post.user.avatar : '/noavatar.jpg'} alt="" />
                <span>{post.user.username}</span>
              </div>
            </div>
            <div
              className="bottom"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.postDetail.desc),
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title">General</p>
          <div className="listVertical">
            <div className="feature">
              <List />
              <div className="featureText">
                <span>Category</span>
                <p style={{ textTransform: "capitalize" }}>{post.category}</p>
              </div>
            </div>
            <div className="feature">
              <ReceiptText />
              <div className="featureText">
                <span>Condition</span>
                <p style={{ textTransform: "capitalize" }}>{post.condition}</p>
              </div>
            </div>
            <div className="feature">
              <BadgeDollarSign />
              <div className="featureText">
                <span>Price</span>
                {post.postDetail.negotiable === "yes" ? (
                  <p>Negotiable</p>
                ) : (
                  <p>Not Negotiable</p>
                )}
              </div>
            </div>
            <div className="feature">
              <CircleCheckBig />
              <div className="featureText">
                {post.verified === true ? (
                  <p>Verified Listing</p>
                ) : (
                  <p>Not a Verified Listing</p>
                )}
              </div>
            </div>
            <div className="feature">
              <Truck />
              <div className="featureText">
                <span>Transportation</span>
                <p style={{ textTransform: "capitalize" }}><a href="https://forms.gle/SMMBcoxyHK9qTz7s9" target="_blank" rel="noopener noreferrer">Contact us</a> for Transportation</p>
              </div>
            </div>
          </div>

          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[post]} />
          </div>
          <div className="buttons">
            <button
              onClick={handelSendMessage}
              disabled={post.userId === currentUser.id}>
              <MessageCircle />
              Send a Message
            </button>
            <button
              onClick={handleSave}
              style={{
                backgroundColor: saved ? "#093250" : "white",
                color: saved ? "white" : "black",
              }}
            >
              <Save />
              {saved ? "Post Saved" : "Save the Post"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePage;