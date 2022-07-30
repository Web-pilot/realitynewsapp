import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  //   const returnUrl = useLocation().search.split("=")[1];

  const login = async (e) => {
    e.preventDefault();
    try {
      setMessage("");
      setLoading(true);
      const res = await axios.post("/api/authentication/login", {
        email,
        password,
      });
      setLoading(false);
      localStorage.setItem("realitynewsuser", JSON.stringify(res.data));
      window.location.replace("/");
    } catch (error) {
      setLoading(false);
      setMessage(error.response.data);
    }
  };

  return (
    <section className="container-fluid login_container">
      <div className="login_form_container">
        <form onSubmit={login}>
          <h5 className="login_key">
            <i className="bi bi-shield-lock"></i>
          </h5>
          <h3>Login to your account</h3>
          {message && <small className="text-danger">{message}</small>}
          {loading && (
            <small className="text-info">We are almost there...</small>
          )}
          <div className="form-group ">
            <label htmlFor="email">Email</label>
            <div className="input-group">
              <span className="input-group-text" id="basic-addon1">
                <i className="bi bi-envelope"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="email"
                aria-label="email"
                aria-describedby="basic-addon1"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setLoading(false);
                }}
              />
            </div>
          </div>
          <div className="form-group password">
            <label htmlFor="password">Password</label>
            <div className="input-group">
              <span className="input-group-text" id="basic-addon1">
                <i className="bi bi-key"></i>
              </span>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="password"
                aria-label="password"
                aria-describedby="basic-addon1"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setLoading(false);
                }}
              />
              <i
                className="bi bi-eye show_password"
                onClick={() => setShowPassword((state) => !state)}
              ></i>
            </div>
          </div>
          <div className="form-group my-2">
            {loading ? (
              <input
                type="submit"
                value="Login"
                className="btn btn-sm btn-primary"
                disabled
              />
            ) : (
              <input
                type="submit"
                value="Login"
                className="btn btn-sm btn-outline-primary"
              />
            )}
          </div>
          <div className="form-group my-2 text-right">
            <Link to="/account/forgetpassword">fortget password?</Link>
            <hr />
          </div>
          <div className="form-group">
            <h6>Don't have an account?</h6>
            <Link to="/account/signup">Signup</Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
