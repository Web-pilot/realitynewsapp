import React from "react";
import { Link } from "react-router-dom";

const Jumbotron = () => {
  return (
    <section className="jumbotron p-1">
      <div className="container">
        <div className="row">
          <div className="col col-md-4">
            <div className="home_intro p-2">
              <Link to="">
                <img
                  src="https://th.bing.com/th/id/OIP.a4mx2S4aLb4WrolU_UOtsAHaE8?w=270&h=180&c=7&r=0&o=5&pid=1.7"
                  alt=""
                />
                <div className="content">
                  <h5>The best news</h5>
                  <p>
                    <small>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Officiis placeat magni veniam asperiores aspernatur nulla
                    </small>
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Jumbotron;
