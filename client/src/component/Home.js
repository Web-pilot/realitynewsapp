import React, { useEffect, useState } from "react";
import HeroImage from "./HeroImage";
import Jumbotron from "./Jumbotron";
import LatestNews from "./LatestNews";
import axios from "axios";
import Loading from "./Loading";

const Home = ({ user }) => {
  const [latestNews, setLatestNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchLatestNews = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get("/api/news/latest");
      setLatestNews(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(
        "There was an error fetching the request! Refresh the page to try again"
      );
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLatestNews();
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
      setLatestNews(latestNews.filter((item) => item.newsid !== id));
    } catch (error) {
      console.log(error);
      alert(error.response.data);
    }
  };

  return (
    <main>
      <HeroImage />
      <Jumbotron />
      <section className="container my-5 mx-auto">
        <h1 className="text-center" style={{ fontSize: "25px" }}>
          Latest happenings...
        </h1>
        {error && <h6 className="text-center">{error}</h6>}
        {loading ? (
          <Loading />
        ) : (
          <div className="row justify-content-sm-center justify-content-md-start mx-auto">
            {latestNews.map((news) => (
              <div className="col-12 col-sm-6 col-md-3 " key={news.newsid}>
                <LatestNews {...news} user={user} deleteNews={deleteNews} />
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Home;
