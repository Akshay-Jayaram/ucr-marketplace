import { useState } from "react";
import "./filter.scss";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";


function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState({
    category: searchParams.get("category") || "",
    condition: searchParams.get("condition") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
  });

  const handleChange = (e) => {
    setQuery({
      ...query,
      [e.target.name]: e.target.value,
    });
  };

  const handleFilter = () => {
    setSearchParams(query);
  };

  return (
    <div className="filter">
      <h1>
        Search results for <b >{searchParams.get("category")}</b>
      </h1>
      {/*<div className="top">
        <div className="item">
          <label htmlFor="city">Location</label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="City Location"
            onChange={handleChange}
            defaultValue={query.city}
          />
        </div>
      </div>*/}
      <div className="bottom">
        <div className="item">
          <label htmlFor="category">Category</label>
          <select
            name="category"
            id="category"
            onChange={handleChange}
            defaultValue={query.category}
          >
            <option value="">any</option>
            <option value="furniture">Furniture</option>
            <option value="electronics">Electronics</option>
            <option value="transportation">Transportation</option>
            <option value="housing">Housing</option>
            <option value="others">Others</option>

          </select>
        </div>
        <div className="item">
          <label htmlFor="condition">Condition</label>
          <select
            name="condition"
            id="condition"
            onChange={handleChange}
          //defaultValue={query.condition}
          >
            <option value="">any</option>
            <option value="excellent">Excellent</option>
            <option value="good">Good</option>
            <option value="acceptable">Acceptable</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="minPrice">Min Price</label>
          <input
            type="number"
            id="minPrice"
            name="minPrice"
            placeholder="any"
            onChange={handleChange}
            defaultValue={query.minPrice}
          />
        </div>
        <div className="item">
          <label htmlFor="maxPrice">Max Price</label>
          <input
            type="text"
            id="maxPrice"
            name="maxPrice"
            placeholder="any"
            onChange={handleChange}
            defaultValue={query.maxPrice}
          />
        </div>

        <button onClick={handleFilter}>
          <Search />
        </button>
      </div>
    </div>
  );
}

export default Filter;