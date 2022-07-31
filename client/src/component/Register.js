import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const signup = async (e) => {
    e.preventDefault();
    try {
      setMessage("");
      setLoading(true);
      await axios.post("/api/authentication/signup", {
        email,
        password,
      });
      setLoading(false);
      window.location.replace("/account/login");
    } catch (error) {
      setLoading(false);
      setMessage(error.response.data);
    }
  };

  return (
    <section className="container-fluid register_container">
      <div className="register_form_container">
        <form onSubmit={signup}>
          <h5 className="login_key">
            <i className="bi bi-shield-lock"></i>
          </h5>
          <h3>Create an account with us</h3>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-group">
              <span className="input-group-text" id="basic-addon1">
                <i className="bi bi-envelope"></i>
              </span>
              <input
                type="email"
                className="form-control"
                placeholder="email"
                aria-label="email"
                aria-describedby="basic-addon1"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div class="input-group">
              <span className="input-group-text" id="basic-addon1">
                <i className="bi bi-key"></i>
              </span>
              <input
                type="password"
                className="form-control"
                placeholder="password"
                aria-label="password"
                aria-describedby="basic-addon1"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          {!loading && (
            <small className="text-info">Creating and account! hold one</small>
          )}
          {!message && <small className="text-danger">{message}</small>}
          <div className="form-group my-2">
            <input
              type="submit"
              value="Signup"
              className="btn btn-sm btn-outline-primary"
            />
          </div>
          <hr />
          <div className="form-group">
            <h6>Have an account? </h6>
            <Link to="/account/login">Login instead</Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Register;
