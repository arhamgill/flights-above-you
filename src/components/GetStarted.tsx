"use client";
import React from "react";
import Popup from "./Popup";
import { useState } from "react";
import { shareLocation } from "../lib/shareLocation";
import { Check } from "lucide-react";
import ProgreessTracker from "./ProgressTracker";
import { LocationProps } from "./ProgressTracker";

function GetStarted() {
  const [showPopup, setShowPopup] = useState(false);
  const [locationShared, setLocationShared] = useState(false);
  const [location, setLocation] = useState<LocationProps | null>(null);
  const [error, setError] = useState("");
  const getlocation = async () => {
    try {
      const locationData: LocationProps = await shareLocation();
      setLocation(locationData);
      setLocationShared(true);
      console.log(locationData.lat, locationData.lng);
    } catch (error: any) {
      console.log(error.message);
      setLocationShared(false);
      setError(error.message);
    }
  };
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
          <button
            disabled={locationShared}
            onClick={getlocation}
            className="bg-white px-4 py-2 rounded-md text-black hover:bg-black hover:text-white border border-white cursor-pointer transition-colors
            disabled:cursor-default disabled:hover:bg-white disabled:hover:text-black"
          >
            {locationShared ? "Location Shared" : "Share Your Location"}{" "}
            {locationShared && (
              <Check className="inline-block text-green-500" />
            )}
          </button>
          {locationShared && location && (
            <ProgreessTracker lat={location.lat} lng={location.lng} />
          )}
        </div>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </Popup>
    </div>
  );
}

export default GetStarted;
