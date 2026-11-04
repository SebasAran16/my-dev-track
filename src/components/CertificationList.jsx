import React from "react";
import Image from "next/image";
import styles from "@/styles/Home.module.sass";
import {
  certificationAnchorId,
  experienceAnchorId,
  useScrollToAnchor,
} from "@/hooks/useScrollToAnchor";

// The JSON dates are plain "YYYY-MM-DD" days, so build them in local time —
// `new Date("2026-09-01")` is parsed as UTC and slips to the previous day for
// anyone west of Greenwich.
const parseDay = (value) => {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
};

const formatDay = (value, locale) =>
  parseDay(value).toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
  });

export default function CertificationList({ certifications, t, locale, now }) {
  const scrollToAnchor = useScrollToAnchor();

  return (
    <div className={styles.certGrid}>
      {certifications.map((certification, index) => {
        // Expiry is only judged on the client, where "now" is real.
        const expired =
          now &&
          certification.expiresOn &&
          parseDay(certification.expiresOn) < now;

        const validity = [
          certification.issuedOn &&
            `${t("portfolio.certifications.issued")} ${formatDay(
              certification.issuedOn,
              locale
            )}`,
          certification.expiresOn
            ? `${t(
                expired
                  ? "portfolio.certifications.expired"
                  : "portfolio.certifications.expires"
              )} ${formatDay(certification.expiresOn, locale)}`
            : t("portfolio.certifications.noExpiration"),
        ].filter(Boolean);

        return (
          <div key={certification.id} data-reveal style={{ "--d": index }}>
            <article
              className={styles.cert}
              id={certificationAnchorId(certification.id)}
            >
              <div className={styles.certTop}>
                <span className={styles.certIssuer}>
                  {certification.issuer}
                </span>
                <ul className={styles.certValidity}>
                  {validity.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <h3 className={styles.certName}>
                <a href={certification.file} target="_blank" rel="noreferrer">
                  {certification.name}
                </a>
              </h3>

              <p className={styles.certDescription}>
                {certification.description[locale] ||
                  certification.description.en}
              </p>

              <ul className={styles.certSkills}>
                {certification.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>

              <div className={styles.certFooter}>
                <div className={styles.certLinks}>
                  <a href={certification.file} target="_blank" rel="noreferrer">
                    {t("portfolio.certifications.viewCertificate")}
                    <span className={styles.arrow} aria-hidden="true">
                      ↗
                    </span>
                  </a>
                  {certification.credentialUrl && (
                    <a
                      href={certification.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {t("portfolio.certifications.verify")}
                      <span className={styles.arrow} aria-hidden="true">
                        ↗
                      </span>
                    </a>
                  )}
                </div>

                {certification.company && (
                  <button
                    type="button"
                    className={styles.certCompany}
                    onClick={() =>
                      scrollToAnchor(
                        experienceAnchorId(certification.companyId)
                      )
                    }
                  >
                    <Image
                      src={certification.company.image.src}
                      alt=""
                      width="22"
                      height="22"
                    />
                    {t("portfolio.certifications.throughCompany", {
                      company: certification.company.name,
                    })}
                    <span aria-hidden="true">↑</span>
                  </button>
                )}
              </div>
            </article>
          </div>
        );
      })}
    </div>
  );
}
