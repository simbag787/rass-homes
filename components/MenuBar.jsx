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
            <div id="we-buy-land"
                 className={props.active === "we-buy-land" ? "active" : ""}
                 onClick={clickHandler}>
                    We Buy Land
            </div>
            <div id="contact-us"
                 className={props.active === "contact-us" ? "active" : ""}
                 onClick={clickHandler}>
                    Contact Us
            </div>
        </div>
    )
}

export default MenuBar