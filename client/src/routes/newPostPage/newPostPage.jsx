import { useState } from "react";
import "./newPostPage.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import apiRequest from "../../lib/apiRequest";
import UploadWidget from "../../components/uploadWidget/UploadWidget";
import { useNavigate } from "react-router-dom";

function NewPostPage() {
  const [value, setValue] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);

    try {
      const res = await apiRequest.post("/posts", {
        postData: {
          title: inputs.title,
          price: parseInt(inputs.price),
          address: inputs.address,
          city: inputs.city,
          category: inputs.category,
          condition: inputs.condition,
          latitude: "33.9737",
          longitude: "-117.3281",
          images: images,
        },
        postDetail: {
          desc: value,
          negotiable: inputs.negotiable,
        },
      });
      navigate("/" + res.data.id)
    } catch (err) {
      console.log(err);
      setError(error);
    }
  };

  return (
    <div className="newPostPage">
      <div className="formContainer">
        <h1>Add New Post</h1>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <div className="item">
              <label htmlFor="title">Title</label>
              <input id="title" name="title" type="text" />
            </div>
            <div className="item">
              <label htmlFor="price">Price</label>
              <input id="price" name="price" type="number" />
            </div>
            <div className="item">
              <label htmlFor="address">Address</label>
              <input id="address" name="address" type="text" />
            </div>
            <div className="item description">
              <label htmlFor="desc">Description</label>
              <ReactQuill theme="snow" onChange={setValue} value={value} />
            </div>
            <div className="item">
              <label htmlFor="city">City</label>
              <input id="city" name="city" type="text" />
            </div>
            {/*<div className="item">
              <label htmlFor="latitude">Latitude</label>
              <input id="latitude" name="latitude" type="text" />
            </div>
            <div className="item">
              <label htmlFor="longitude">Longitude</label>
              <input id="longitude" name="longitude" type="text" />
            </div>*/}
            <div className="item">
              <label htmlFor="category">Product Category</label>
              <select name="category" defaultValue="">
                <option value="" disabled>Select the category</option>
                <option value="furniture">Furniture</option>
                <option value="electronics">Electronics</option>
                <option value="transportation">Transportation</option>
                <option value="housing">Housing</option>
                <option value="others">Others</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="condition">Product Condition</label>
              <select name="condition" defaultValue="">
                <option value="" disabled>Select the condition</option>
                <option value="excellent">Excellent</option>
                <option value="good">Good</option>
                <option value="acceptable">Acceptable</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="negotiable">Price Negotiable?</label>
              <select name="negotiable" defaultValue="">
                <option value="" disabled>Choose an option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            <button className="sendButton">Add</button>
            {error && <span>error</span>}
          </form>
        </div>
      </div>
      <div className="sideContainer">
        {images.map((image, index) => (
          <img src={image} key={index} alt="" />
        ))}
        <UploadWidget
          uwConfig={{
            multiple: true,
            cloudName: "dzwfm4qzj",
            uploadPreset: "ucrmarketplace",
            folder: "posts",
          }}
          setState={setImages}
        />
      </div>
    </div>
  );
}

export default NewPostPage;