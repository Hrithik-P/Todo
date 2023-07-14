import React from "react";
import { TiTick } from "react-icons/ti";
import "../../pages/style.css";
const Welcome = () => {
  return (
    <React.Fragment>
      <div className="px-4 py-3 d-flex flex-column justify-content-center align-items-center welcome">
        <div className="d-flex flex-column justify-content-center align-items-center mb-5">
          <div className="icon mb-3">
            <TiTick className="text-white" size="2rem" />
          </div>
          <div className="text-center">
            <span className="fw-light fs-2">Welcome to </span>
            <br />
            <span className="fw-bolder fs-3">My Todo</span>
            <br />
            <span className="fs-6 text-secondary w-75">
              My Todo Help You to Organize your Tasks
            </span>
          </div>
        </div>
        <div>
          <button className="demo-btn">Try Demo</button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Welcome;
