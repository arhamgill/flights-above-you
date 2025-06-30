import { LocationProps } from "@/components/ProgressTracker";
import axios from "axios";

// OpenSky API flight state array structure
type FlightState = [
  string | null, // 0: icao24 (unique identifier)
  string | null, // 1: callsign
  string | null, // 2: origin_country
  number | null, // 3: time_position
  number | null, // 4: last_contact
  number | null, // 5: longitude
  number | null, // 6: latitude
  number | null, // 7: baro_altitude
  boolean | null, // 8: on_ground
  number | null, // 9: velocity
  number | null, // 10: true_track (heading)
  number | null, // 11: vertical_rate
  number[] | null, // 12: sensors
  number | null, // 13: geo_altitude
  string | null, // 14: squawk
  boolean | null, // 15: spi
  number | null // 16: position_source
] & { _distance?: number }; // Extended with custom distance property

interface ProcessedFlight {
  callsign: string | null;
  originCountry: string | null;
  altitude: number | null;
  velocity: number | null;
  direction: number | null;
  distance: number;
}

//Fetches and filters flights
export const getFlights = async (
  { lat, lng }: LocationProps,
  radius: number
): Promise<ProcessedFlight[]> => {
  const lamin = lat - radius;
  const lamax = lat + radius;
  const lomin = lng - radius;
  const lomax = lng + radius;
  try {
    const response = await axios.get(
      `https://opensky-network.org/api/states/all?lamin=${lamin}&lamax=${lamax}&lomin=${lomin}&lomax=${lomax}`
    );
    if (response.status === 200) {
      let flights: FlightState[] = response.data.states;
      if (!flights || flights.length === 0) {
        return [];
      }
      //Filter flights based on altitude
      flights = flights.filter((flight: FlightState) => {
        const altitude = flight[7];
        return (
          Number.isFinite(altitude) &&
          altitude !== null &&
          altitude >= 900 &&
          altitude <= 12000
        );
      });
      //Filter flights based on heading/bearing and distance
      flights = flights.filter((flight: FlightState) => {
        const flightLat = flight[6];
        const flightLng = flight[5];
        const heading = flight[10];

        if (
          !Number.isFinite(flightLat) ||
          !Number.isFinite(flightLng) ||
          !Number.isFinite(heading) ||
          flightLat === null ||
          flightLng === null ||
          heading === null
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

      const finalFlights: ProcessedFlight[] = flights.map(
        (flight: FlightState) => ({
          callsign: flight[1],
          originCountry: flight[2],
          altitude: flight[7],
          velocity: flight[9],
          direction: flight[10],
          distance: flight._distance || 0,
        })
      );
      return finalFlights;
    }
  } catch (error) {
    console.log("Error fetching flights:", error);
  }
  return [];
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
