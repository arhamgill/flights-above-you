import React from "react";

export interface LocationProps {
  lat: number;
  lng: number;
}

type StepStatus = "pending" | "in-progress" | "completed" | "error";

interface Step {
  id: string;
  label: string;
  status: StepStatus;
  functionName: string;
}

const steps: Step[] = [
  {
    id: "define-parameter",
    label: "Defining a parameter above your location",
    status: "pending",
    functionName: "defineLocationParameter",
  },
  {
    id: "fetch-flights",
    label: "Fetching flights information",
    status: "pending",
    functionName: "fetchFlightsInformation",
  },
  {
    id: "filter-flights",
    label: "Filtering flights that you can see",
    status: "pending",
    functionName: "filterVisibleFlights",
  },
  {
    id: "check-weather",
    label: "Checking weather conditions in your area",
    status: "pending",
    functionName: "checkWeatherConditions",
  },
];

function ProgressTracker({ lat, lng }: LocationProps) {
  return <div>Progress</div>;
}

export default ProgressTracker;
