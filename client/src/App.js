import "./App.css";
import Home from "./component/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NewsDetails from "./component/NewsDetails";
import Navbar from "./component/Navbar";
import EditNews from "./component/EditNews";
import { CreateNews } from "./component/CreateNews";
import Register from "./component/Register";
import Login from "./component/Login";
import ForgetPassword from "./component/ForgetPassword";
import ResetPassword from "./component/ResetPassword";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import UserProfile from "./component/UserProfile";
import News from "./component/News";
import MyItem from "./component/MyItem";
import Footer from "./component/Footer";
import Dashboard from "./component/Dashboard";

function App() {
  const [user, setUser] = useState(null);
  const logout = () => {
    localStorage.removeItem("realitynewsuser");
    setUser(null);
    window.location.replace("/");
  };

  useEffect(() => {
    const getUser = localStorage.getItem("realitynewsuser");
    if (getUser) {
      setUser(JSON.parse(getUser));
    }
  }, []);

  return (
    <Router>
      <Navbar user={user} logout={logout} />
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/news" element={<News user={user} />} />
        <Route
          path="/news/myarticles"
          element={
            user ? <MyItem user={user} /> : <Navigate to="/account/login" />
          }
        />
        <Route path="/news/details/:id" element={<NewsDetails user={user} />} />
        <Route
          path="/news/edit/:id"
          element={user ? <EditNews /> : <Navigate to="/account/login" />}
        />
        <Route
          path="/news/publish"
          element={
            user ? (
              <CreateNews user={user} />
            ) : (
              <Navigate to="/account/login?returnurl=/news/publish" />
            )
          }
        />
        <Route
          path="/account/signup"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route
          path="/account/login"
          element={user ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/account/forgetpassword"
          element={user ? <Navigate to="/" /> : <ForgetPassword />}
        />
        <Route
          path="/account/resetpassword"
          element={user ? <Navigate to="/" /> : <ResetPassword />}
        />
        <Route
          path="/account/profile/:id"
          element={
            user ? (
              <UserProfile user={user} />
            ) : (
              <Navigate to="/account/login" />
            )
          }
        />
        <Route
          path="/dashboard"
          element={!user ? <Navigate to="/account/login" /> : <Dashboard />}
        ></Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
