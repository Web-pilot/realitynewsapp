import React from "react";
import { Link } from "react-router-dom";

const HeroImage = () => {
  return (
    <section className="hero_image">
      <div className="hero_content">
        <h1>We got you covered with all the latest update</h1>
        <h3>Reality News App is you home of latest happenings</h3>
        <Link to="/news" className="btn btn-outline-primary">
          I need to See!
        </Link>
      </div>
    </section>
  );
};

export default HeroImage;
