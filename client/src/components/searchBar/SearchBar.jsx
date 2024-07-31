import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./searchBar.scss";
import { Armchair, MonitorSmartphone, Bike, House, Ellipsis, MoveRight } from "lucide-react";
const categories = [
  { name: "furniture", icon: <Armchair />, description: "Beds, tables, and more" },
  { name: "electronics", icon: <MonitorSmartphone />, description: "Gadgets and devices" },
  { name: "transportation", icon: <Bike />, description: "Bikes, scooters, etc." },
  { name: "housing", icon: <House />, description: "Apartments and rooms" },
  { name: "others", icon: <Ellipsis />, description: "Miscellaneous items" },
];
const types = ["buy", "sell"];

function SearchBar() {
  const [query, setQuery] = useState({ category: "", type: "buy" });
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const navigate = useNavigate();

  const switchType = (val) => setQuery((prev) => ({ ...prev, type: val }));
  const handleCategoryClick = (category) => navigate(`/list?category=${category}`);

  return (
    <div className="searchBar">
      <div className="type">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => switchType(type)}
            className={query.type === type ? "active" : ""}
          >
            {type}
          </button>
        ))}
      </div>
      {query.type === "buy" && (
        <div className="categories">
          {categories.map((category) => (
            <button
              key={category.name}
              onMouseEnter={() => setHoveredCategory(category.name)}
              onMouseLeave={() => setHoveredCategory(null)}
              onClick={() => handleCategoryClick(category.name)}
              className={`categoryButton ${hoveredCategory === category.name ? "hovered" : ""}`}
            >
              <div className="icon">{category.icon}</div>
              {hoveredCategory === category.name && (
                <div className="hoverContent">
                  <span className="categoryName">{category.name}</span>
                  <span className="categoryDescription">{category.description}</span>
                </div>
              )}
            </button>
          ))}
        </div>
      )}
      {query.type === "sell" && (
        <div className="sellForm">
          <button onClick={() => navigate("/add")}>Post your listing <MoveRight size={15} /></button>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
