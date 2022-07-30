import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <section className="container-fluid register_container">
      <div className="register_form_container">
        <form>
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
                type="text"
                className="form-control"
                placeholder="email"
                aria-label="email"
                aria-describedby="basic-addon1"
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
              />
            </div>
          </div>
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
