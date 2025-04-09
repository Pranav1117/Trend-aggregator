import { Dancing_Script } from "next/font/google";
import Link from "next/link";
import { SearchBar } from "./Searchbar";

const dancingScript = Dancing_Script({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

const Navbar = () => {
  return (
    <nav className="w-full p-4 text-white shadow-lg fixed top-0 left-0 z-10 bg-neutral-900 border-b border-neutral-700">
      <div className="flex items-center">
        <Link href={"/"}>
          <h1
            className={`text-2xl md:text-4xl font-extrabold cursor-pointer ${dancingScript.className}`}
          >
            Trend&apos;s
          </h1>
        </Link>

        {/* Searchbar */}
        <div className=" md:w-[40%] mx-auto h-10">
          <SearchBar />
        </div>

        {/* profile icons */}
        {/* <div className=" bg-red-100">
          <User height={20} width={20} />
        </div> */}
      </div>
    </nav>
  );
};

export default Navbar;
