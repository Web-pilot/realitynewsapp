import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const EditNews = () => {
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState([]);
  const [title, setTitle] = useState("");
  const [user, setUser] = useState(null);
  const [headline, setHeadline] = useState("");
  const [details, setDetails] = useState("");
  const [file, setFile] = useState("");
  const [img, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [newsCat, setNewsCat] = useState("");
  const id = useLocation().pathname.split("/")[3];

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get("/api/news/" + id);
        setNews(res.data);
        setTitle(res.data.title);
        setHeadline(res.data.headline);
        setDetails(res.data.description);
        setNewsCat(res.data.category);
        setImage(res.data.img);
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchCategory = async () => {
      try {
        const res = await axios.get("/api/categories");
        setCategory(res.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchCategory();
    fetchNews();
  }, []);

  useEffect(() => {
    const getUser = localStorage.getItem("realitynewsuser");
    if (getUser) {
      setUser(JSON.parse(getUser));
    }
  }, []);

  const updateNews = async (e) => {
    const token = localStorage.getItem("realitynewsuser");
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", details);
      formData.append("img", file);
      formData.append("headline", headline);
      formData.append("category", newsCat);
      formData.append("userid", user.userid);

      const res = await axios.put(`/api/news/edit/${id}`, formData, {
        headers: {
          Authorization: JSON.parse(token).accessToken,
        },
      });
      setLoading(false);
      console.log(res.data);
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
        <h2>Make some correction</h2>
        <hr />
        <div className="display_image">
          {file ? (
            <img
              src={`${URL.createObjectURL(file)}`}
              alt=""
              className="create_news_img"
            />
          ) : (
            <img src={`/${news.img}`} alt="" className="create_news_img" />
          )}
          <label htmlFor="file">
            <i className="bi bi-cloud-plus"></i>
          </label>
        </div>
        <form onSubmit={updateNews}>
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
              <option>Choose Category</option>
              {category.map((item) => (
                <option value={item.title} key={item.categoryid}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group my-3">
            {error && <small className="text-danger">{error}</small>} <br />
            {loading ? (
              <>
                <h5 className="text-info">Just a minute... Publishing News</h5>
                <button
                  className="btn btn-sm btn-outline-primary"
                  disabled
                  style={{ cursor: "progress", opacity: "0.4" }}
                >
                  <i className="bi bi-send"></i>
                  Updating
                </button>
              </>
            ) : (
              <button className="btn btn-sm btn-outline-primary">
                <i className="bi bi-send"></i>
                Update
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditNews;
