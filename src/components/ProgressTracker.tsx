import React from "react";

export interface LocationProps {
  lat: number;
  lng: number;
}

function ProgressTracker({ lat, lng }: LocationProps) {
  return <div>Progress</div>;
}

export default ProgressTracker;
