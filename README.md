# Portfolio

## About

My personal portfolio website. It is for recruiters, collaborators and anyone who wants to know my work. It has an introduction, a work timeline, education, skills, projects, testimonials and a contact form that saves messages to a Google Form.

**Tech stack:** React, Vite, Ant Design, react-vertical-timeline-component and plain CSS. Tests use Vitest and Testing Library.

**Live site:** https://prabhat-codes.github.io/portfolio-website/

## Run

You need Node.js 22.12 or newer.

```
npm install
npm run dev
```

| Command | What it does |
|---|---|
| `npm run dev` | Starts the local site |
| `npm test` | Runs the tests |
| `npm run build` | Builds the site into `dist/` |
| `npm run deploy` | Builds and publishes to GitHub Pages |

## Change the content

Nearly all text, links and project cards are in `src/resumeData.js`. Images are in `public/images/`. A project without a `link` is shown but is not clickable.

## Credits

The page layout and styles are adapted from a free resume website template.
