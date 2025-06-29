import { LocationProps } from "@/components/ProgressTracker";
import axios from "axios";

//Fetches and filters flights
export const getFlights = async (
  { lat, lng }: LocationProps,
  radius: number
) => {
  const lamin = lat - radius;
  const lamax = lat + radius;
  const lomin = lng - radius;
  const lomax = lng + radius;
  try {
    const response = await axios.get(
      `https://opensky-network.org/api/states/all?lamin=${lamin}&lamax=${lamax}&lomin=${lomin}&lomax=${lomax}`
    );
    if (response.status === 200) {
      let flights = response.data.states;
      if (!flights || flights.length === 0) {
        return [];
      }
      //Filter flights based on altitude
      flights = flights.filter((flight: any) => {
        const altitude = flight[7];
        return (
          Number.isFinite(altitude) && altitude >= 900 && altitude <= 12000
        );
      });
      //Filter flights based on heading/bearing and distance
      flights = flights.filter((flight: any) => {
        const flightLat = flight[6];
        const flightLng = flight[5];
        const heading = flight[10];

        if (
          !Number.isFinite(flightLat) ||
          !Number.isFinite(flightLng) ||
          !Number.isFinite(heading)
        ) {
          return false;
        }

        const distance = calculateDistance(
          { lat: flightLat, lng: flightLng },
          { lat, lng }
        );

        flight._distance = distance;

        const bearing = calculateBearing(
          { lat: flightLat, lng: flightLng },
          { lat, lng }
        );

        let angleDiff = Math.abs(heading - bearing);
        if (angleDiff > 180) angleDiff = 360 - angleDiff;

        if (angleDiff > 90) {
          return distance <= 10000; // 10 km in meters
        }

        return true;
      });

      const finalFlights = flights.map((flight: any) => ({
        callsign: flight[1],
        originCountry: flight[2],
        altitude: flight[7],
        velocity: flight[9],
        direction: flight[10],
        distance: flight._distance,
      }));
      return finalFlights;
    }
  } catch (error) {
    console.log("Error fetching flights:", error);
  }
};

//Calculates the bearing between from user to flight. Switch the parameters to calculate the bearing from flight to user.
export const calculateBearing = (
  userPosition: LocationProps,
  flightPosition: LocationProps
) => {
  const lat1 = userPosition.lat * (Math.PI / 180);
  const lon1 = userPosition.lng * (Math.PI / 180);
  const lat2 = flightPosition.lat * (Math.PI / 180);
  const lon2 = flightPosition.lng * (Math.PI / 180);

  const dLon = lon2 - lon1;

  const y = Math.sin(dLon) * Math.cos(lat2);
  const x =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);

  let bearing = Math.atan2(y, x);
  bearing = (bearing * 180) / Math.PI; // Convert to degrees
  bearing = (bearing + 360) % 360; // Normalize to [0, 360)

  return bearing;
};

//Distance between user and flight
export const calculateDistance = (
  userPosition: LocationProps,
  flightPosition: LocationProps
) => {
  const R = 6371e3; // Radius of the Earth in meters
  const lat1 = userPosition.lat * (Math.PI / 180);
  const lat2 = flightPosition.lat * (Math.PI / 180);
  const deltaLat = (flightPosition.lat - userPosition.lat) * (Math.PI / 180);
  const deltaLon = (flightPosition.lng - userPosition.lng) * (Math.PI / 180);

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1) *
      Math.cos(lat2) *
      Math.sin(deltaLon / 2) *
      Math.sin(deltaLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
};
