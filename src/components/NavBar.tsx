import React from "react";
import Link from "next/link";

function NavBar() {
  return (
    <div className="flex justify-center items-center mx-auto gap-4 sm:gap-8 bg-white text-black">
      <Link href={"/"} className="hover:text-blue-500">
        Home
      </Link>
      <Link href={"/about-me"} className="hover:text-blue-500">
        About me
      </Link>
    </div>
  );
}

export default NavBar;
