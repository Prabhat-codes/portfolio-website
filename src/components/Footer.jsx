export default function Footer({ resumeData }) {
  return (
    <footer>
      <div className="row">
        <div className="twelve columns">
          <ul className="social-links">
            {resumeData.socialLinks.map((item) => (
              <li key={item.name}>
                <a href={item.url} target="_blank" rel="noopener noreferrer" aria-label={item.name}>
                  <i className={item.className} />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div id="go-top">
          <a title="Back to Top" href="#home">
            <i className="icon-up-open" />
          </a>
        </div>
      </div>
    </footer>
  );
}
