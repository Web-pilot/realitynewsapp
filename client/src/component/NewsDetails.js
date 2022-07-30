import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Loading from "./Loading";

const NewsDetails = ({ user }) => {
  const location = useLocation();
  const id = location.pathname.split("/")[3];
  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState([]);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/news/${id}`);
      setNews(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNews();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteNews = async (id) => {
    try {
      const token = localStorage.getItem("realitynewsuser");
      console.log(token);
      alert("This action cannot be undone!");
      const res = await axios.delete(`/api/news/delete/${id}`, {
        headers: {
          Authorization: JSON.parse(token).accessToken,
        },
      });
      alert(res.data);
      window.location = "/news/myarticles";
    } catch (error) {
      console.log(error);
      alert(error.response.data);
    }
  };
  return (
    <article className="container">
      {loading ? (
        <Loading />
      ) : (
        <div className="news_content_container">
          <img src={`/${news.img}`} alt={news.img} />
          <h3>{news.title}</h3>
          {user && news.userid === user.userid && (
            <div className="action_btns_container my-1">
              <span
                className="btn btn-sm btn-outline-danger mx-1"
                onClick={() => deleteNews(news.newsid)}
              >
                <i className="bi bi-trash"></i> Delete
              </span>
              <Link to={`/news/edit/${news.newsid}`}>
                <span className="btn btn-sm btn-outline-primary">
                  <i className="bi bi-pencil-square"></i> Edit
                </span>
              </Link>
            </div>
          )}
          <p className="news_headline">{news.headline}</p>
          <p className="news_desc">{news.description}</p>
        </div>
      )}
    </article>
  );
};

export default NewsDetails;
