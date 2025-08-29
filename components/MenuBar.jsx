import { useLayoutEffect, useState } from "react"

const MenuBar = (props) => {
    const clickHandler = (e) => {
        let menubar = document.querySelector(".menu-bar")
        menubar.classList.remove('show-menu-bar')
        props.clickHandler(e)
    }

    const [top, setTop] = useState(0);

    useLayoutEffect(() => {
      const navbar = document.querySelector('.navbar');
      setTop(navbar.offsetHeight)
    }, [])

    return (
        <div className="menu-bar" style={{top: `${top - 10}px`}}>
            <div id="home"
                 className={props.active === "home" ? "active" : ""}
                 onClick={clickHandler}>
                    Our Projects
            </div>
            <div id="about-us"
                 className={props.active === "about-us" ? "active" : ""}
                 onClick={clickHandler}>
                    About Us
            </div>
        </div>
    )
}

export default MenuBar