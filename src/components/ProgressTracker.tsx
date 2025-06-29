"use client";
import React from "react";
import { getFlights } from "../lib/functions";
import { useState } from "react";
import { useRouter } from "next/navigation";
export interface LocationProps {
  lat: number;
  lng: number;
}

function ProgressTracker({ lat, lng }: LocationProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [flights, setFlights] = React.useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const handleGetFlights = async () => {
    try {
      setHasSearched(false);
      setFlights([]);
      setError(null);
      setLoading(true);

      const result = await getFlights({ lat, lng }, 0.4);

      await new Promise((resolve) => setTimeout(resolve, 2500)); // 2.5 seconds delay

      setFlights(result);
      setLoading(false);
      setHasSearched(true);
    } catch (error) {
      console.error("Error fetching flights:", error);

      await new Promise((resolve) => setTimeout(resolve, 2500));

      setError("Failed to fetch flights. Please try again later.");
      setLoading(false);
    }
  };
  const handleClick = () => {
    router.push(
      `/flights?flights=${encodeURIComponent(JSON.stringify(flights))}`
    );
  };
  return (
    <>
      <button
        disabled={loading}
        onClick={handleGetFlights}
        className="bg-white px-6 py-2 w-48 rounded-md text-black hover:bg-black hover:text-white border border-white cursor-pointer transition-colors disabled:cursor-default disabled:hover:bg-white disabled:hover:text-black"
      >
        {loading ? "Fetching Data" : "Get Flights"}
      </button>
      {hasSearched &&
        (flights.length > 0 ? (
          <p
            className="text-lime-500 text-center mt-2 cursor-pointer hover:underline"
            onClick={handleClick}
          >{`Found ${flights.length} Flights`}</p>
        ) : (
          <p className="text-red-500 text-center mt-2">
            No Flights Found. Please try later.
          </p>
        ))}

      {error && <p className="text-red-500 text-center mt-2">{error}</p>}
    </>
  );
}

export default ProgressTracker;
