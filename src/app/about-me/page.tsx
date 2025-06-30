import Image from "next/image";
import Link from "next/link";

export default function AboutMe() {
  return (
    <div className="flex flex-col justify-center items-center gap-6 p-6 mt-10">
      <div className="w-32 h-32 md:w-48 md:h-48 flex-shrink-0">
        <Image
          src="/arham.jpg" // Replace with your image path
          alt="My Picture"
          width={192}
          height={192}
          className="rounded-full object-cover w-full h-full"
        />
      </div>
      <div className="flex-1">
        <p className="max-w-2xl text-center">
          Hi, I'm Arham Gill. I'm computer a science student and a full-stack
          web developer. This is just a fun tool I built because I was bored
          during summer vacations.
        </p>
      </div>
      <div className="flex gap-4 text-blue-500 underline">
        <Link href={"https://github.com/arhamgill"}>GitHub</Link>
        <Link href={"https://www.linkedin.com/in/arhamgilldev/"}>LinkedIn</Link>
      </div>
    </div>
  );
}
