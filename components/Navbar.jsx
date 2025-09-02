import { useState, useEffect } from "react";
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

  const scrollToProjects = () => {
    const navbar = document.querySelector(".navbar");
    const mapSection = document.getElementById("map-section");
    if (mapSection) {
      const navbarHeight = navbar ? navbar.offsetHeight : 0;
      const sectionTop =
        mapSection.getBoundingClientRect().top +
        window.scrollY -
        navbarHeight;

      window.scrollTo({ top: sectionTop, behavior: "smooth" });
    }
  };

  const handleProjectsClick = async (e) => {
    e.preventDefault();
    setActive("home");
    setShowMenu(false);

    if (router.pathname === "/") {
      // already on homepage → just scroll
      scrollToProjects();
    } else {
      // navigate home first, then scroll after render
      await router.push("/");
      requestAnimationFrame(() => {
        scrollToProjects();
      });
    }
  };

  const toggleMenuBar = () => {
    let menubar = document.querySelector(".menu-bar");
    if (!showMenu) {
      menubar.classList.add("show-menu-bar");
    } else {
      menubar.classList.remove("show-menu-bar");
    }
    setShowMenu((showMenu) => !showMenu);
  };

  return (
    <>
      <div className="navbar">
        <h2 className="title">
          {/* logo scrolls to projects instead of Link */}
          <a href="/">
            Rass Homes
          </a>
        </h2>
        <ul>
          <li className={active === "home" ? "active" : ""}>
            <a href="/" id="home" onClick={handleProjectsClick}>
              Our Projects
            </a>
          </li>
          <li
            className={active === "contact-us" ? "active" : ""}
            onClick={() => setActive("contact-us")}
          >
            <a href="/contact-us" id="contact-us">
              Contact Us
            </a>
          </li>
        </ul>
        <Image
          src={menu}
          alt="menu"
          onClick={toggleMenuBar}
          className="menu-icon"
        />
      </div>
      <MenuBar active={active} clickHandler={setActive} show={showMenu} />
    </>
  );
};
