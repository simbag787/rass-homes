import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import menu from "../public/menu.svg";
import MenuBar from "./MenuBar";

export const Navbar = () => {
  const router = useRouter();
  const [active, setActive] = useState("home");
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const path = router.pathname === "/" ? "home" : router.pathname.slice(1);
    setActive(path);
  }, [router.pathname]);

  const clickHandler = (id) => {
    setActive(id);
    setShowMenu(false);
  };

  const toggleMenuBar = () => {
		if (!showMenu) {
			let menubar = document.querySelector(".menu-bar")
      menubar.classList.add('show-menu-bar')
		} else {
			let menubar = document.querySelector(".menu-bar")
      menubar.classList.remove('show-menu-bar')
		}
    setShowMenu((showMenu) => !showMenu);
  };

  return (
    <>
      <div className="nav-container">
        <div className="navbar">
          <h1 onClick={() => clickHandler("home")} className="title">
            <Link href="/">Rass Homes</Link>
          </h1>
          <ul>
            <li
              className={active === "home" ? "active" : ""}
              onClick={() => clickHandler("home")}
            >
              <Link href="/" id="home">Our Projects</Link>
            </li>
            <li
              className={active === "about-us" ? "active" : ""}
              onClick={() => clickHandler("about-us")}
            >
              <Link href="/about-us" id="about-us">About Us</Link>
            </li>
          </ul>
          <Image
            src={menu}
            alt="menu"
            onClick={toggleMenuBar}
            className="menu-icon"
          />
        </div>
      </div>
      <MenuBar active={active} clickHandler={clickHandler} show={showMenu} />
    </>
  );
};
