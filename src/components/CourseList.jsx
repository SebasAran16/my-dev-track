import React, { useState } from "react";
import Image from "next/image";
import styles from "@/styles/Home.module.sass";
import { courses } from "@/constants/portfolio";

export default function CourseList({ t }) {
  const [openKey, setOpenKey] = useState(courses[0]?.key ?? null);

  return (
    <ol className={styles.courseList}>
      {courses.map((course, index) => {
        const descriptionKeys = course.descriptionKeys || [
          course.descriptionKey,
        ];
        const open = openKey === course.key;
        const panelId = `course-${course.key}`;
        const headerId = `${panelId}-header`;

        return (
          <li
            key={course.key}
            className={styles.course}
            data-open={open}
            data-reveal
            style={{ "--d": Math.min(index, 4) * 0.5 }}
          >
            <button
              type="button"
              id={headerId}
              className={styles.courseHeader}
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpenKey(open ? null : course.key)}
            >
              <span className={styles.courseIndex}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className={styles.courseTitle}>{t(course.titleKey)}</span>
              <span className={styles.courseLogos}>
                {course.images.map((img) => (
                  <Image
                    key={img.src}
                    src={img.src}
                    alt={img.alt}
                    width="32"
                    height="32"
                  />
                ))}
              </span>
              <span className={styles.courseToggle} aria-hidden="true" />
            </button>

            <div
              id={panelId}
              className={styles.coursePanel}
              role="region"
              aria-labelledby={headerId}
            >
              <div className={styles.coursePanelInner}>
                {descriptionKeys.map((key) => (
                  <p key={key}>{t(key)}</p>
                ))}
                <a
                  href={course.href}
                  target="_blank"
                  rel="noreferrer"
                  tabIndex={open ? 0 : -1}
                  className={styles.courseLink}
                >
                  {t("portfolio.courses.visit")}
                  <span className={styles.arrow} aria-hidden="true">
                    ↗
                  </span>
                </a>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
