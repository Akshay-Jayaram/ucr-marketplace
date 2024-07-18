import SearchBar from "../../components/searchBar/SearchBar";
import "./homePage.scss";
import { Users, CheckCircle, HandCoins } from "lucide-react";

function HomePage() {
  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">Your Campus Marketplace <br /><span style={{ color: '#003DA5' }}> Buy, Sell, Explore</span></h1>
          <p className="text">
            Discover a seamless way to buy and sell within the UCR community. From furniture and
            electronics to bikes and textbooks, connect with fellow students to find what you need or
            pass on items you no longer use. Safe, convenient, and exclusively for UCR students.
          </p>
          <SearchBar />
          <div className="boxes">
            <div className="box">
              <Users size={40} />
              <h2>Exclusive <br />UCR Community</h2>
            </div>
            <div className="box">
              <CheckCircle size={40} />
              <h2>Convenient <br />and Local</h2>
            </div>
            <div className="box">
              <HandCoins size={40} />
              <h2>Cost-Effective <br />Solutions</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="imgContainer">
        <img src="/bg2.png" alt="" />
      </div>
    </div>
  );
}

export default HomePage;
