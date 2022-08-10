import axios from "axios";
import React, { useState } from "react";

const Category = () => {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("realitynewsuser");
      await axios.post("/api/category", title, {
        Authorization: JSON.parse(token).accessToken,
      });
      window.location = "/news/publish";
    } catch (error) {
      console.log(error.response.data);
    }
  };
  return (
    <section>
      <form onSubmit={handleSubmit}>
        <h3>Add Category</h3>
        <div className="mb-3">
          <label htmlFor="category" className="form-label"></label>
          <input
            type="text"
            name=""
            id="category"
            className="form-control"
            placeholder="Category"
            aria-describedby="helpId"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <small id="helpId" className="text-muted">
            Help text
          </small>
        </div>
        <div>
          <input type="submit" className="btn btn-sm btn-primary" />
        </div>
      </form>
    </section>
  );
};

export default Category;
