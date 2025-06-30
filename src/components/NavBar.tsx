import React from "react";
import Link from "next/link";

function NavBar() {
  return (
    <div className="flex justify-center items-center mx-auto gap-4 sm:gap-8 bg-gray-200 text-black shadow-md p-2">
      <Link href={"/"} className="hover:text-blue-500 underline">
        Home
      </Link>
      <Link href={"/working"} className="hover:text-blue-500 underline">
        How it works
      </Link>
      <Link href={"/about-me"} className="hover:text-blue-500 underline">
        About me
      </Link>
    </div>
  );
}

export default NavBar;
