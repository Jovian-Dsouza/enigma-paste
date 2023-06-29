import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { ConnectButton } from "./ConnectButton";
import { menuLinks } from "@/data/contants";
import Link from "next/link";

export function MobileMenu(props) {
  return (
    <div className="flex flex-col space-y-20 w-screen fixed top-0 right-0 h-screen z-50 bg-white transition-all duration-300 ease-in-out">
      {/* x mark icon */}
      <div className="flex justify-end p-10">
        <FontAwesomeIcon
          icon={faXmark}
          className="w-8 h-8 hover:text-darkishBlue"
        />
      </div>

      <div className="flex flex-col items-center justify-center">
        {/* Nav links */}
        <div className="flex flex-col space-y-10">
          {menuLinks.map((link, index) => (
            <Link
              href={link.href}
              key={index}
              className="text-center text-2xl font-semibold capitalize hover:underline underline-offset-4"
            >
              {link.text}
            </Link>
          ))}

          {/* Connect button */}
          <ConnectButton className="md:hidden text-center !text-2xl border-black" />
        </div>
      </div>
    </div>
  );
}
