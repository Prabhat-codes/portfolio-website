import { useEffect, useState } from "react";

const LINKS = [
  ["home", "Home"],
  ["about", "About"],
  ["resume", "Experience"],
  ["portfolio", "Projects"],
  ["testimonials", "Testimonials"],
];

// Follows the scroll position: which section is on screen, and how the menu looks.
function useScrollState() {
  const [state, setState] = useState({ current: "home", menu: "" });

  useEffect(() => {
    function update() {
      const headerHeight = document.getElementById("home")?.offsetHeight ?? 0;
      const y = window.scrollY;

      let current = "home";
      for (const [id] of LINKS) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= window.innerHeight * 0.35) {
          current = id;
        }
      }

      let menu = "";
      if (y > headerHeight * 0.2) menu = y < headerHeight ? "nav-hidden" : "opaque";

      setState((old) => (old.current === current && old.menu === menu ? old : { current, menu }));
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return state;
}

export default function Header({ resumeData }) {
  const { current, menu } = useScrollState();

  return (
    <header id="home">
      <nav id="nav-wrap" className={menu}>
        <a className="mobile-btn" href="#nav-wrap" title="Show navigation">
          Show navigation
        </a>
        <a className="mobile-btn" href="#home" title="Hide navigation">
          Hide navigation
        </a>
        <ul id="nav" className="nav">
          {LINKS.map(([id, label]) => (
            <li key={id} className={id === current ? "current" : undefined}>
              <a href={`#${id}`}>{label}</a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="row banner">
        <div className="banner-text">
          <h1 className="responsive-headline">
            Hi,
            <br /> This is {resumeData.name}.
          </h1>
          <h3 style={{ color: "#fff", fontFamily: "sans-serif" }}>{resumeData.roleDescription}</h3>
          <p className="photo-note">P.S This is my picture from the Kedarkantha Trek (Dec 2023)</p>
          <hr />
          <ul className="social">
            {resumeData.socialLinks.map((item) => (
              <li key={item.name}>
                <a href={item.url} target="_blank" rel="noopener noreferrer" aria-label={item.name}>
                  <i className={item.className} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="scrolldown">
        <a href="#about" aria-label="Scroll to About">
          <i className="icon-down-circle" />
        </a>
      </p>
    </header>
  );
}
