import React from "react";
import Image from "next/image";
import styles from "@/styles/Home.module.sass";
import { dates } from "@/constants/dates";
import { experiences } from "@/constants/portfolio";
import { getCompany, getCompanyCertifications } from "@/constants/companies";
import {
  certificationAnchorId,
  experienceAnchorId,
  useScrollToAnchor,
} from "@/hooks/useScrollToAnchor";
import { formatDuration, formatRange } from "@/utils/time";

// Consecutive entries sharing a company collapse into one block, so a
// promotion reads as one company with stacked roles. Roles are shown newest
// first, matching the reverse-chronological order of the companies.
export const experienceGroups = experiences.reduce((groups, exp) => {
  const current = groups[groups.length - 1];

  if (current && current.companyId === exp.companyId) {
    current.roles.unshift(exp);
    return groups;
  }

  groups.push({
    companyId: exp.companyId,
    company: getCompany(exp.companyId),
    roles: [exp],
  });

  return groups;
}, []);

// A company is still ongoing if any of its roles has no end date.
const groupPeriod = (roles) => ({
  start: new Date(Math.min(...roles.map((role) => dates[role.key].start))),
  end: roles.some((role) => !dates[role.key].end)
    ? null
    : new Date(Math.max(...roles.map((role) => dates[role.key].end))),
});

function ToolChip({ tool }) {
  return (
    <li className={styles.toolChip}>
      <Image src={tool.src} alt="" width="16" height="16" />
      {tool.alt}
    </li>
  );
}

function Role({ exp, t, locale, now }) {
  const { start, end } = dates[exp.key];
  const duration = formatDuration(start, end, now, t);

  return (
    <div className={styles.role}>
      <div className={styles.roleHeader}>
        {exp.role && <h4 className={styles.roleTitle}>{exp.role}</h4>}
        <span className={styles.roleTime}>
          {formatRange(start, end, locale, t)}
          {duration && <span className={styles.roleDuration}>{duration}</span>}
        </span>
      </div>

      <div className={styles.roleBody}>
        {exp.description.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>

      {exp.projects?.length > 0 && (
        <div className={styles.roleBlock}>
          <span className={styles.roleBlockLabel}>
            {t("portfolio.experience.keyWork")}
          </span>
          <ul className={styles.keyWork}>
            {exp.projects.map((project) => (
              <li key={project.href}>
                <a href={project.href} target="_blank" rel="noreferrer">
                  <span className={styles.keyWorkName}>
                    {project.name}
                    <span className={styles.arrow} aria-hidden="true">
                      ↗
                    </span>
                  </span>
                  {project.description && (
                    <span className={styles.keyWorkDescription}>
                      {project.description}
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {exp.tools.length > 0 && (
        <div className={styles.roleBlock}>
          <span className={styles.roleBlockLabel}>
            {t("portfolio.experience.stack")}
          </span>
          <ul className={styles.toolChips}>
            {exp.tools.map((tool) => (
              <ToolChip key={tool.src} tool={tool} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function ExperienceList({ t, locale, now }) {
  const scrollToAnchor = useScrollToAnchor();

  return (
    <ol className={styles.experienceList}>
      {experienceGroups.map((group, groupIndex) => {
        const period = groupPeriod(group.roles);
        const groupCertifications = getCompanyCertifications(group.companyId);
        const current = !period.end;

        return (
          <li
            key={group.companyId}
            id={experienceAnchorId(group.companyId)}
            className={styles.company}
            data-reveal
            style={{ "--d": Math.min(groupIndex, 2) }}
          >
            <aside className={styles.companyAside}>
              <div className={styles.companyIdentity}>
                <Image
                  className={styles.companyLogo}
                  src={group.company.image.src}
                  alt={group.company.image.alt}
                  width="56"
                  height="56"
                />
                <div>
                  <h3 className={styles.companyName}>{group.company.name}</h3>
                  <span className={styles.companyPeriod}>
                    {current && (
                      <span className={styles.liveDot} aria-hidden="true" />
                    )}
                    {formatRange(period.start, period.end, locale, t)}
                  </span>
                </div>
              </div>

              {group.company.url && (
                <a
                  className={styles.companyLink}
                  href={group.company.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t("portfolio.experience.visit")}
                  <span className={styles.arrow} aria-hidden="true">
                    ↗
                  </span>
                </a>
              )}

              {groupCertifications.length > 0 && (
                <div className={styles.companyCerts}>
                  <span className={styles.roleBlockLabel}>
                    {t("portfolio.certifications.title")}
                  </span>
                  {groupCertifications.map((certification) => (
                    <button
                      key={certification.id}
                      type="button"
                      onClick={() =>
                        scrollToAnchor(certificationAnchorId(certification.id))
                      }
                    >
                      {certification.name}
                      <span aria-hidden="true">↓</span>
                    </button>
                  ))}
                </div>
              )}
            </aside>

            <div className={styles.roles}>
              {group.roles.map((exp, roleIndex) => (
                <React.Fragment key={exp.key}>
                  {roleIndex > 0 && (
                    <div className={styles.promotion}>
                      <span>↑ {t("portfolio.experience.promoted")}</span>
                    </div>
                  )}
                  <Role exp={exp} t={t} locale={locale} now={now} />
                </React.Fragment>
              ))}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
