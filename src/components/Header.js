import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines, faBarsStaggered } from "@fortawesome/free-solid-svg-icons";
import styles from "@/styles/Header.module.css";

import { menuLinks } from "@/data/contants";

function Header(props) {
  return (
    <div className="sticky top-0 z-30 flex justify-center items-center bg-brownishBlack px-20 py-3">
      <div className="flex justify-between items-center w-full max-w-6xl text-darkGray text-sm">
        <a
          href="#"
          className={`flex justify-center items-center space-x-2 font-bold text-lg text-white`}
        >
          <FontAwesomeIcon icon={faFileLines} />
          <div>EngimaPaste</div>
        </a>

        {menuLinks.map((link, index) => (
          <a
            href={link.href}
            className={`${styles.link} hidden md:block`}
            key={index}
          >
            {link.text}
          </a>
        ))}
        <a href="#" className={`${styles.connect} hidden md:block`}>
          Connect
        </a>

        {/* Hamburger */}
        <FontAwesomeIcon
          icon={faBarsStaggered}
          className="md:hidden w-6 h-6 hover:text-darkishBlue"
          onClick={props.handleMenuToggle}
        />
      </div>
    </div>
  );
}

export default Header;
