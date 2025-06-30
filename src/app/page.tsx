import GetStarted from "@/components/GetStarted";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <>
      <Hero />
      <GetStarted />
      <div className="px-4">
        <div className="flex flex-col mt-6 bg-white/50 p-4 rounded-lg shadow-md max-w-2xl mx-auto">
          <p className="text-left">
            Due to the limiations of OpenSky API, this tool only works in North
            America and Western Europe.
          </p>
          <p className="text-left">
            This tool works best in clear weather. Preferrable time is around
            sunrise or sunset.
          </p>
        </div>
      </div>
    </>
  );
}
