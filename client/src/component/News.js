import axios from "axios";
import React, { useState, useEffect } from "react";
import LatestNews from "./LatestNews";

const News = ({ user }) => {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNewss] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchedNews, setSearchedNews] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const fetchNews = async () => {
    try {
      const newsRes = await axios.get("http://localhost:5000/api/news");
      const category = await axios.get("http://localhost:5000/api/categories");
      setNews(newsRes.data);
      setCategories(category.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchNews();
  }, []);

  useEffect(() => {
    setSearchedNews(
      news.filter((item) =>
        Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase())
      )
    );
  }, [news, searchInput]);

  useEffect(() => {
    if (filteredNews !== "All") {
      setSearchedNews(news.filter((item) => item.category === filteredNews));
    } else {
      setSearchedNews(news);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredNews]);

  const deleteNews = async (id) => {
    try {
      const token = localStorage.getItem("realitynewsuser");

      alert("This action cannot be undone!");
      const res = await axios.delete(`/api/news/delete/${id}`, {
        headers: {
          Authorization: JSON.parse(token).accessToken,
        },
      });
      alert(res.data);
      setSearchedNews(news.filter((item) => item.newsid !== id));
    } catch (error) {
      console.log(error);
      alert(error.response.data);
    }
  };

  return (
    <section className="container">
      <div className="formp-group my-4">
        <div className="input-group">
          <span className="input-group-text" id="basic-addon1">
            <i class="bi bi-search-heart"></i>
          </span>
          <input
            type="search"
            className="form-control"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search news"
          />
        </div>
      </div>
      Filter By:
      <select
        className="form-select-sm"
        aria-label=".form-select-sm example"
        value={filteredNews}
        onChange={(e) => setFilteredNewss(e.target.value)}
      >
        <option defaultValue={true}>All</option>
        {categories.map((item) => (
          <option value={item.title} key={item.categoryid}>
            {item.title}
          </option>
        ))}
      </select>
      <div className="row">
        <h4 className="text-center">
          {searchInput ? "Searched Results" : filteredNews}
        </h4>
        {searchedNews.map((item) => (
          <div className="col-12 col-sm-6 col-md-3 " key={item.newsid}>
            <LatestNews {...item} deleteNews={deleteNews} user={user} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default News;
