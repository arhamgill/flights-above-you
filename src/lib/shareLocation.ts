import { LocationProps } from "../components/ProgressTracker";

export const shareLocation = async (): Promise<LocationProps> => {
  if (!navigator.geolocation) {
    throw new Error("Location not supported");
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      (error) => {
        if (error.code === 1) {
          reject(new Error("Location access denied. Please enable location."));
        } else {
          reject(new Error("Could not get location. Try again."));
        }
      }
    );
  });
};
