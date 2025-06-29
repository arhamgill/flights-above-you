"use client";
import { useEffect } from "react";
import { getFlights } from "@/lib/functions";
function Page() {
  useEffect(() => {
    const fetchFlights = async () => {
      const result = await getFlights(
        { lat: 38.0464066, lng: -84.4970393 },
        0.4
      );
      console.log(result);
    };
    fetchFlights();
  }, []);
  return <div>page</div>;
}

export default Page;
