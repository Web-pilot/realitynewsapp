import axios from "axios";
import React, { useState } from "react";

const ForgetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);

  const sendEmailLink = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await axios.post("/api/authentication/forgetpassword", {
        email,
      });
      console.log(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col col-md-4">
          <form className=" p-5 shadow mt-3" onSubmit={sendEmailLink}>
            <h2>Enter email to recovered account</h2>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && <small className="text-danger">{error}</small>}
            {loading ? (
              <input
                type="submit"
                className="btn btn-outline-primary"
                disabled
                style={{ cursor: "progress" }}
              />
            ) : (
              <input type="submit" className="btn btn-outline-primary" />
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
