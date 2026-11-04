import React, { useMemo, useState } from "react";
import Image from "next/image";
import styles from "@/styles/Home.module.sass";
import { projects } from "@/constants/portfolio";

const PROJECT_TABS = [
  { key: "ethermail", labelKey: "portfolio.projectsMade.tabs.ethermail" },
  { key: "mutantApes", labelKey: "portfolio.projectsMade.tabs.mutantApes" },
  { key: "personal", labelKey: "portfolio.projectsMade.tabs.personal" },
];

const countByCategory = projects.reduce((counts, project) => {
  counts[project.category] = (counts[project.category] || 0) + 1;
  return counts;
}, {});

function ProjectCard({ project, t, index }) {
  const links = [
    project.siteUrl && {
      href: project.siteUrl,
      label: t(project.siteButtonKey),
    },
    project.codeUrl && {
      href: project.codeUrl,
      label: t(project.codeButtonKey),
    },
  ].filter(Boolean);

  return (
    <article className={styles.projectCard} style={{ "--i": index }}>
      <a
        className={styles.projectMedia}
        href={links[0]?.href}
        target="_blank"
        rel="noreferrer"
        tabIndex={-1}
        aria-hidden="true"
      >
        <Image
          src={project.image.src}
          alt={project.image.alt}
          fill
          sizes="(min-width: 992px) 600px, 100vw"
        />
      </a>

      <div className={styles.projectBody}>
        <span className={styles.projectSkill}>{t(project.skillKey)}</span>
        <h3 className={styles.projectTitle}>{t(project.titleKey)}</h3>
        <div className={styles.projectDescription}>
          {project.descriptionKeys.map((key) => (
            <p key={key}>{t(key)}</p>
          ))}
        </div>

        <div className={styles.projectFooter}>
          <ul className={styles.projectTools}>
            {project.tools.map((tool) => (
              <li key={tool.src} title={tool.alt}>
                <Image src={tool.src} alt={tool.alt} width="18" height="18" />
              </li>
            ))}
          </ul>
          <div className={styles.projectLinks}>
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
              >
                {link.label}
                <span className={styles.arrow} aria-hidden="true">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function ProjectShowcase({ t }) {
  const [tab, setTab] = useState(PROJECT_TABS[0].key);
  const visible = useMemo(
    () => projects.filter((project) => project.category === tab),
    [tab]
  );

  return (
    <div>
      <div
        className={styles.projectTabs}
        role="tablist"
        aria-label={t("portfolio.projectsMade.title")}
        data-reveal
      >
        {PROJECT_TABS.map((item) => (
          <button
            key={item.key}
            type="button"
            role="tab"
            id={`project-tab-${item.key}`}
            aria-selected={tab === item.key}
            aria-controls="project-panel"
            onClick={() => setTab(item.key)}
            className={`${styles.projectTab} ${
              tab === item.key ? styles.projectTabActive : ""
            }`}
          >
            {t(item.labelKey)}
            <span className={styles.projectTabCount}>
              {countByCategory[item.key] || 0}
            </span>
          </button>
        ))}
      </div>

      <div data-reveal style={{ "--d": 1 }}>
        {/* Keyed by tab so the cards replay their entrance animation. */}
        <div
          key={tab}
          id="project-panel"
          role="tabpanel"
          aria-labelledby={`project-tab-${tab}`}
          className={styles.projectGrid}
        >
          {visible.map((project, index) => (
            <ProjectCard
              key={project.key}
              project={project}
              t={t}
              index={index}
            />
          ))}
        </div>
      </div>

      <p className={styles.moreProjects}>
        {t("portfolio.projectsMade.moreProjects")}
      </p>
    </div>
  );
}
