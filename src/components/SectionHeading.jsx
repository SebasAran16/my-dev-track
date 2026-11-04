import React from "react";
import styles from "@/styles/Home.module.sass";

export default function SectionHeading({ index, label, title }) {
  return (
    <header className={styles.sectionHeading}>
      <span className={styles.sectionLabel} data-reveal>
        <span className={styles.sectionIndex}>{index}</span>
        {label}
      </span>
      <h2 className={styles.sectionTitle} data-reveal style={{ "--d": 1 }}>
        {title}
      </h2>
    </header>
  );
}
