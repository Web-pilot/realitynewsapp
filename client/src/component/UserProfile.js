import React, { useEffect, useState } from "react";
import axios from "axios";

const UserProfile = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [file, setFile] = useState("");

  const [inputValue, setInputValue] = useState({
    username: "",
    email: "",
    firstname: "",
    lastname: "",
    address: "",
    phone: "",
  });
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/api/users/${user.userid}`);
        setUserDetails(res.data);
        setInputValue({
          username: res.data.username,
          firstname: res.data.firstname,
          lastname: res.data.lastname,
          phone: res.data.phone,
          address: res.data.address,
          profilepic: res.data.profilepic,
          email: res.data.email,
        });
      } catch (error) {
        setLoading(false);
        setError(error.response.data);
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  const handleInputChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("realitynewsuser");
    setLoading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("username", inputValue.username);
      formData.append("email", inputValue.email);
      formData.append("firstname", inputValue.firstname);
      formData.append("lastname", inputValue.lastname);
      formData.append("address", inputValue.address);
      formData.append("phone", inputValue.phone);
      formData.append("img", file);
      const res = await axios.put(`/api/users/edit/${user.userid}`, formData, {
        headers: {
          Authorization: JSON.parse(token).accessToken,
        },
      });

      const updatedUser = {
        ...res.data,
        accessToken: JSON.parse(token).accessToken,
      };
      localStorage.setItem("realitynewsuser", JSON.stringify(updatedUser));
      setInputValue({
        username: res.data.username,
        firstname: res.data.firstname,
        lastname: res.data.lastname,
        phone: res.data.phone,
        address: res.data.address,
        email: res.data.email,
      });
      setUserDetails(res.data);
      setLoading(false);
      setSuccessMessage("Profile updated Successfully");
    } catch (error) {
      setLoading(false);
      setError(error.response.data);
    }
  };
  return (
    <section className="container">
      <div className="profile_container mt-3 p-2">
        <h2>Profile Settings</h2>

        <div className="row">
          <div className="col-12 col-md-4 shadow">
            {file ? (
              <img
                src={`${URL.createObjectURL(file)}`}
                alt=""
                className="profile_img"
              />
            ) : (
              <img
                src={`/${userDetails.profilepic}`}
                alt=""
                className="profile_img"
              />
            )}
            <label htmlFor="file" className="bi bi-upload upload"></label>

            <div className="user_details">
              <small>
                <i className="bi bi-person-rolodex"></i> {userDetails.username}
              </small>
              <br />
              <small>
                <i className="bi bi-person-rolodex"></i> {userDetails.firstname}
                {userDetails.lastname}
              </small>
              <br />
              <small>
                <i className="bi bi-envelope"></i> {userDetails.email}
              </small>
              <br />
              <small>
                <i className="bi bi-telephone"></i> {userDetails.phone}
              </small>
              <br />
              <small>
                <i className="bi bi-house-heart"></i> {userDetails.address}
              </small>
              <br />
            </div>
          </div>
          <div className="col-12 col-md-8">
            <form onSubmit={updateProfile}>
              <h3>Edit Profile</h3>
              <div className="row">
                <div className="col-12 col-md-6 ">
                  <input
                    type="file"
                    name="profilepic"
                    id="file"
                    hidden
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                  <div className="form-group mb-3">
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      name="username"
                      value={inputValue.username}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="firstname">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstname"
                      name="firstname"
                      onChange={handleInputChange}
                      value={inputValue.firstname}
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="firstname">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastname"
                      name="lastname"
                      value={inputValue.lastname}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-group mb-3">
                    <label htmlFor="firstname">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={inputValue.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="firstname">Phone</label>
                    <input
                      type="text"
                      className="form-control"
                      id="phone"
                      name="phone"
                      value={inputValue.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="address">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      name="address"
                      value={inputValue.address}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    {error && <small className="text-danger">{error}</small>}
                    {loading && (
                      <small className="text-info">Wait a minute</small>
                    )}
                  </div>
                  <div className="form-group mb-3">
                    <input
                      type="submit"
                      value="Update"
                      className="btn btn-primary btn-sm"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
