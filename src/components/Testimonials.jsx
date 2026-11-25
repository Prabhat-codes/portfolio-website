import { useEffect, useState } from "react";

const SLIDE_MS = 7000;

export default function Testimonials({ resumeData }) {
  const items = resumeData.testimonials;
  const [active, setActive] = useState(0);

  // Restarts the timer after every change, so a clicked slide gets its full time.
  useEffect(() => {
    const timer = setTimeout(() => setActive((active + 1) % items.length), SLIDE_MS);
    return () => clearTimeout(timer);
  }, [active, items.length]);

  return (
    <section id="testimonials">
      <div className="text-container">
        <div className="row">
          <div className="two columns header-col">
            <h1>
              <span>Testimonials</span>
            </h1>
          </div>
          <div className="ten columns flex-container">
            <div className="flexslider">
              <ul className="slides">
                {items.map((item, index) => (
                  <li key={item.name} className={index === active ? "active" : undefined}>
                    <blockquote>
                      <p>{item.description}</p>
                      <cite>{item.name}</cite>
                    </blockquote>
                  </li>
                ))}
              </ul>
              <ol className="flex-control-nav flex-control-paging">
                {items.map((item, index) => (
                  <li key={item.name}>
                    <button
                      type="button"
                      aria-label={`Show testimonial ${index + 1}`}
                      aria-current={index === active}
                      className={index === active ? "flex-active" : undefined}
                      onClick={() => setActive(index)}
                    />
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
