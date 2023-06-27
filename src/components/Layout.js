import Header from "./Header";
import { MobileMenu } from "./MobileMenu";

import { useState } from "react";

export default function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div id="layout">
      <div
        className={`${isOpen ? "left-0 " : "hidden left-[100%]"}`}
        onClick={handleMenuToggle}
      >
        <MobileMenu />
      </div>
      <Header handleMenuToggle={handleMenuToggle} />
      <main className="h-full">{children}</main>
    </div>
  );
}
