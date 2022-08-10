import axios from "axios";
import React, { useEffect, useState } from "react";

export const CreateNews = () => {
  const [category, setCategory] = useState([]);
  const [title, setTitle] = useState("");
  const [user, setUser] = useState(null);
  const [headline, setHeadline] = useState("");
  const [details, setDetails] = useState("");
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [newsCat, setNewsCat] = useState("");

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/categories");
        setCategory(res.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchCategory();
  }, []);
  useEffect(() => {
    const getUser = localStorage.getItem("realitynewsuser");
    if (getUser) {
      setUser(JSON.parse(getUser));
    }
  }, []);
  const uploadNews = async (e) => {
    const token = localStorage.getItem("realitynewsuser");

    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", details);
      formData.append("headline", headline);
      formData.append("category", newsCat);
      formData.append("img", file);
      formData.append("userid", user.userid);

      const res = await axios.post("/api/news/create", formData, {
        headers: {
          Authorization: JSON.parse(token).accessToken,
        },
      });
      setLoading(false);
      window.location.replace(`/news/details/${res.data.newsid}`);
    } catch (error) {
      setLoading(false);
      setError(error.response.data);
      console.log(error.message);
    }
  };
  return (
    <section className="container">
      <div className="create_form_container my-3">
        <h2>What do you have for the world</h2>
        <hr />
        <div className="display_image">
          {file ? (
            <img
              src={`${URL.createObjectURL(file)}`}
              alt=""
              className="create_news_img"
            />
          ) : (
            <h3>No image selected</h3>
          )}
          <label htmlFor="file">
            <i className="bi bi-cloud-plus"></i>
          </label>
        </div>
        <form onSubmit={uploadNews}>
          <input
            type="file"
            id="file"
            hidden
            onChange={(e) => setFile(e.target.files[0])}
          />
          <div className="form-group mb-3">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="title"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="headline">Headline</label>
            <input
              type="text"
              className="form-control"
              placeholder="headline"
              id="headline"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="description">Full Details</label>
            <textarea
              cols="30"
              rows="10"
              className="form-control"
              id="description"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group mb-2">
            <select
              className="form-select form-select-sm"
              aria-label=".form-select-sm example"
              value={newsCat}
              onChange={(e) => setNewsCat(e.target.value)}
            >
              <option defaultValue={true}>Choose Category</option>
              {category.map((item) => (
                <option value={item.title} key={item.categoryid}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group my-3">
            {error && <small className="text-danger">{error}</small>}
            {loading ? (
              <>
                <h5 className="text-info">Just a minute... Publishing News</h5>
                <button
                  className="btn btn-sm btn-outline-primary"
                  disabled
                  style={{ cursor: "progress", opacity: "0.4" }}
                >
                  <i className="bi bi-send"></i>
                  Go Live
                </button>
              </>
            ) : (
              <button className="btn btn-sm btn-outline-primary">
                <i className="bi bi-send"></i>
                Go Live
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};
