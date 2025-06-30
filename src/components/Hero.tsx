import React from "react";

function Hero() {
  return (
    <div className="container mx-auto flex flex-col items-center mt-20 gap-6 px-6">
      <h1 className="text-5xl font-semibold sm:font-bold text-center">
        Want to see an AirPlane above your house?
      </h1>
      <p className="text-center text-md max-w-2xl">
        This is a simple app to see flights above your house using OpenSky
        API. Just enter your location and and go outside to see the flights.
      </p>
    </div>
  );
}

export default Hero;
