import axios from "axios";
import React, { useEffect, useState } from "react";
import LatestNews from "./LatestNews";

const MyItem = ({ user }) => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchItem = async () => {
      const token = localStorage.getItem("realitynewsuser");
      try {
        const res = await axios.get(`/api/news/myarticles`, {
          headers: {
            Authorization: JSON.parse(token).accessToken,
          },
        });
        setNews(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchItem();
  }, []);

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
      setNews(news.filter((item) => item.newsid !== id));
    } catch (error) {
      console.log(error);
      alert(error.response.data);
    }
  };

  return (
    <section className="container">
      <div className="row">
        <h4>This are what you have so far! try publish news to see more</h4>
        {news.map((item) => (
          <div className="col-12 col-sm-6 col-md-3 " key={item.newsid}>
            <LatestNews {...item} user={user} deleteNews={deleteNews} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default MyItem;
