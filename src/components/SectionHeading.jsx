import React from "react";
import styles from "@/styles/Home.module.sass";

export default function SectionHeading({ index, label, title, children }) {
  return (
    <header className={styles.sectionHeading}>
      <span className={styles.sectionLabel} data-reveal>
        <span className={styles.sectionIndex}>{index}</span>
        {label}
      </span>
      <div className={styles.sectionHeadingMain}>
        <h2 className={styles.sectionTitle} data-reveal style={{ "--d": 1 }}>
          {title}
        </h2>
        {children && (
          <div
            className={styles.sectionHeadingAside}
            data-reveal
            style={{ "--d": 2 }}
          >
            {children}
          </div>
        )}
      </div>
    </header>
  );
}
