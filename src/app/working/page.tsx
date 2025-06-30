import React from "react";

const bulletPoints = [
  "User's location is determined using the Geolocation API and a paramter is established.",
  "OpenSky API is used to fetch flights in that parameter.",
  "The data is first filtered by altitude and flights between 900 and 12,000 meters are passed through.",
  "The bearing of the remaining flights w.r.t user is compared with the flight's heading. Flights heading away from ther user are excluded unless they are within 10 km area.",
  "After the filters, the remaining flights are displayed to the user with useful information.",
];

export default function Page() {
  return (
    <main className="flex flex-col items-center justify-center px-4 py-8">
      <section className="max-w-xl w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">
          How This Tool Works
        </h1>
        <ul className="space-y-4 list-disc list-inside text-base sm:text-lg">
          {bulletPoints.map((point, idx) => (
            <li key={idx}>{point}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
