import React from "react";
import headerBg from "../../../../assets/images/yahama.jpg";

const Banner = () => {
  return (
    <div
      className="hero rounded-md flex justify-center items-center"
      style={{
        background: `url(${headerBg})`,
        backgroundSize: "cover",
        objectFit: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-white h-72 flex flex-col justify-center items-center">
          <h1 className="text-5xl font-bold capitalize text-primary text-yellow-500">
            Your New Smile starts here
          </h1>
          <button className="btn btn-primary mt-8">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
