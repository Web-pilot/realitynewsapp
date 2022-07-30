import axios from "axios";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const ResetPassword = () => {
  const location = useLocation();
  const [password, setPassword] = useState("");
  const [confirmPassword, setComfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const token = location.search.split("=")[1];
  //   reset passwor
  const resetPassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Password and confirm password does not match!");
      return;
    }
    try {
      setLoading(true);
      setError(false);
      await axios.post(`/api/authentication/resetpassword?token=${token}`, {
        password,
      });
      setLoading(false);
      window.location.replace("/account/login");
    } catch (error) {
      setLoading(false);
      setError(error.response.data);
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col col-md-8">
          <form className="p-5 shadow" onSubmit={resetPassword}>
            <h2>Reset password</h2>
            <div className="form-group my-3">
              <label htmlFor="password">New Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="confirm-password">Confirm new password</label>
              <input
                type="password"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setComfirmPassword(e.target.value)}
                placeholder="confirm password"
                required
              />
            </div>
            <div className="form-group my-1">
              <small className="text-danger">{error}</small>
            </div>
            {loading ? (
              <input
                type="submit"
                value="Done"
                className="btn btn-outline-primary"
                disabled
                style={{ cursor: "progress" }}
              />
            ) : (
              <input
                type="submit"
                value="Done"
                className="btn btn-outline-primary"
              />
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
