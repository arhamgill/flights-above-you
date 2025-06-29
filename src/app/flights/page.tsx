"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function FlightsPage() {
  const searchParams = useSearchParams();
  const [flights, setFlights] = useState<any[]>([]);

  // Function to convert degrees to compass direction
  const getCompassDirection = (degrees: number): string => {
    if (degrees < 0 || degrees > 360) return "N/A";

    // 8 main directions with flexible ranges (45° each)
    if (degrees >= 337.5 || degrees < 22.5) return "North"; // North: 337.5° - 22.5°
    if (degrees >= 22.5 && degrees < 67.5) return "Northeast"; // Northeast: 22.5° - 67.5°
    if (degrees >= 67.5 && degrees < 112.5) return "East"; // East: 67.5° - 112.5°
    if (degrees >= 112.5 && degrees < 157.5) return "Southeast"; // Southeast: 112.5° - 157.5°
    if (degrees >= 157.5 && degrees < 202.5) return "South"; // South: 157.5° - 202.5°
    if (degrees >= 202.5 && degrees < 247.5) return "Southwest"; // Southwest: 202.5° - 247.5°
    if (degrees >= 247.5 && degrees < 292.5) return "West"; // West: 247.5° - 292.5°
    if (degrees >= 292.5 && degrees < 337.5) return "Northwest"; // Northwest: 292.5° - 337.5°

    return "North"; // Default fallback
  };

  useEffect(() => {
    const flightsParam = searchParams.get("flights");
    if (flightsParam) {
      try {
        const parsed = JSON.parse(decodeURIComponent(flightsParam));
        setFlights(parsed);
        console.log("Flights data:", parsed);
      } catch (err) {
        console.error("Failed to parse flights param:", err);
      }
    }
  }, [searchParams]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Flights Above You</h1>

      {flights.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  Callsign
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  Origin Country
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  Distance (m)
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  Altitude (m)
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  Direction
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {flights.map((flight, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                    {flight.callsign?.trim() || "N/A"}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                    {flight.originCountry || "N/A"}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                    {flight.distance
                      ? Math.round(flight.distance).toLocaleString()
                      : "N/A"}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                    {flight.altitude
                      ? Math.round(flight.altitude).toLocaleString()
                      : "N/A"}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                    {flight.direction
                      ? `${getCompassDirection(flight.direction)} (${Math.round(
                          flight.direction
                        )}°)`
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">No flights data available</p>
        </div>
      )}
    </div>
  );
}
