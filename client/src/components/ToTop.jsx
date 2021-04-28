import React, {useState} from 'react'


export default function ToTop() {
    const [show, setShow] = useState(false)


    window.addEventListener("scroll", function () {
        if (window.scrollY > 500) {
          setShow(true);
        } else {
            setShow(false);
        }
      });

    const backToTop = () => {
        document.querySelector(".back-lastPage").scrollIntoView({behavior: "smooth"});
    }

    return (
        <img style={{ display : `${show ? "block" : "none"}`}} onClick={backToTop} className="logoToTop" src="/images/svg/up-arrow.svg" alt="logo to up" ></img>
    )
}
