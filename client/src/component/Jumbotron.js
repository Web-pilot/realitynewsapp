import axios from "axios";
import React, { useEffect, useState } from "react";

const Jumbotron = () => {
  const [userCounts, setUsercount] = useState(0);
  const [newsCounts, setNewsCount] = useState(0);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const userCount = axios.get("/api/users/count");
        const newsCount = axios.get("/api/users/count");
        setUsercount((await userCount).data);
        setNewsCount((await newsCount).data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchApi();
  }, []);
  return (
    <section className="jumbotron p-1">
      <div className="container">
        <div className="row">
          <div className="col col-md-4">
            <div className="home_intro p-2">
              <span className="badge badge-secondary">{userCounts} Users</span>
              <span className="badge badge-secondary">{newsCounts} News</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Jumbotron;
