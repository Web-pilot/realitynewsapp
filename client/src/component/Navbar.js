import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ user, logout }) => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light sticky-top">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <div className="logo">
              <img
                src="https://th.bing.com/th/id/OIP.uKIFFxOB2CzXpyL9570wJAHaEL?w=296&h=180&c=7&r=0&o=5&pid=1.7"
                alt=""
              />
            </div>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-between"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  HOME
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/news" className="nav-link">
                  NEWS
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/news/publish" className="nav-link">
                  Publish
                </Link>
              </li>
              <li className="nav-item">
                <Link to={`/news/myarticles`} className="nav-link">
                  Collection
                </Link>
              </li>
            </ul>
            <div className="account_buttons">
              {user ? (
                <>
                  <Link to={`/account/profile/${user.userid}`} className="mr-1">
                    <img
                      src={`http://localhost:5000/${user.profilepic}`}
                      alt=""
                      className="nav_user_img"
                    />
                  </Link>
                  <small className="logout_btn" onClick={logout}>
                    logout
                  </small>
                </>
              ) : (
                <Link
                  to="/account/login"
                  className="btn btn-sm btn-outline-primary"
                >
                  Sign in
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
