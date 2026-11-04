import React from "react";
import styles from "@/styles/Home.module.sass";
import { codeLanguages, experiences, projects } from "@/constants/portfolio";

// "HTML5" and "HTML", "NextJs" and "nextjs" are the same tool: normalise names
// so every logo appears once. Icon-only logos win over wordmarks.
const normalise = (name) => name.toLowerCase().replace(/[^a-z]/g, "");

const tools = [
  ...experiences.flatMap((exp) => exp.tools),
  ...projects.flatMap((project) => project.tools),
  ...codeLanguages,
].reduce((unique, tool) => {
  const id = normalise(tool.alt);
  if (!unique.some((item) => item.id === id)) {
    unique.push({ id, src: tool.src, name: tool.alt.replace(/\d+$/, "") });
  }
  return unique;
}, []);

function Row({ hidden }) {
  return (
    <ul className={styles.marqueeRow} aria-hidden={hidden || undefined}>
      {tools.map((tool) => (
        <li key={tool.id} className={styles.marqueeItem}>
          <img
            src={tool.src}
            alt=""
            width="28"
            height="28"
            loading="lazy"
            decoding="async"
          />
          <span>{tool.name}</span>
        </li>
      ))}
    </ul>
  );
}

export default function TechMarquee() {
  return (
    <div className={styles.marquee} data-reveal>
      {/* The second copy makes the loop seamless; screen readers skip it. */}
      <div className={styles.marqueeTrack}>
        <Row />
        <Row hidden />
      </div>
    </div>
  );
}
