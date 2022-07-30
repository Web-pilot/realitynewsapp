import React from "react";
import { Link } from "react-router-dom";

const LatestNews = ({
  newsid,
  title,
  description,
  img,
  userid,
  user,
  deleteNews,
}) => {
  return (
    <>
      <div className="news_card" style={{ width: "100%" }}>
        <img src={`/${img}`} className="card-img-top" alt="..." height="100" />
        <div className="card-body">
          <h6 className="card-title">{title.slice(0, 15)}</h6>
          <p className="card-text">{description.slice(0, 40)}...</p>
          <Link
            to={`/news/details/${newsid}`}
            className="btn btn-sm btn-outline-primary"
          >
            Show me
          </Link>
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          {user && user.userid === userid && (
            <>
              <span
                className="btn btn-sm btn-outline-danger mx-1"
                onClick={() => deleteNews(newsid)}
              >
                <i className="bi bi-trash"></i>
              </span>

              <Link to={`/news/edit/${newsid}`}>
                <span className="btn btn-sm btn-outline-primary">
                  <i className="bi bi-pencil-square"></i>
                </span>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default LatestNews;
