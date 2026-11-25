function Card({ item }) {
  return (
    <div className="item-wrap">
      <img src={item.imgurl} className="item-img" alt={item.name} />
      <div className="overlay">
        <div className="portfolio-item-meta">
          <h5>{item.name}</h5>
          <p>{item.description}</p>
        </div>
      </div>
    </div>
  );
}

export default function Portfolio({ resumeData }) {
  return (
    <section id="portfolio">
      <div className="row">
        <div className="twelve columns collapsed">
          <h1>Check Out Some of My Projects and certifications.</h1>
          <div id="portfolio-wrapper" className="bgrid-quarters s-bgrid-thirds cf">
            {resumeData.portfolio.map((item) => (
              <div key={item.name} className="columns portfolio-item">
                {/* Projects without a public link are shown but are not clickable. */}
                {item.link ? (
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    <Card item={item} />
                  </a>
                ) : (
                  <Card item={item} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
