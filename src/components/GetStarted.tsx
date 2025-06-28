"use client";
import React from "react";
import Popup from "./Popup";
import { useState } from "react";

function GetStarted() {
  const [showPopup, setShowPopup] = useState(false);
  return (
    <div className="mt-10 flex flex-col gap-2 items-center mx-auto px-5">
      <p className="text-md text-lime-400">See Flights Now!</p>
      <button
        onClick={() => setShowPopup(true)}
        className="bg-white px-6 py-2 rounded-md text-black hover:bg-black hover:text-white border border-white cursor-pointer transition-colors"
      >
        Get Started
      </button>

      <Popup isOpen={showPopup} onClose={() => setShowPopup(false)}>
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-2xl font-semibold text-center">
            Ready to see Flights!
          </h1>
          <button className="bg-white px-6 py-2 rounded-md text-black hover:bg-black hover:text-white border border-white cursor-pointer transition-colors">
            Share Your Location
          </button>
        </div>
      </Popup>
    </div>
  );
}

export default GetStarted;
