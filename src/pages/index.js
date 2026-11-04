import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import styles from "@/styles/Home.module.sass";
import { dates } from "@/constants/dates";
import { courses, experiences, projects } from "@/constants/portfolio";
import { certifications, getCompany } from "@/constants/companies";
import { socials } from "@/constants/socials";
import SectionHeading from "@/components/SectionHeading";
import ExperienceList from "@/components/ExperienceList";
import ProjectShowcase from "@/components/ProjectShowcase";
import TechMarquee from "@/components/TechMarquee";
import CertificationList from "@/components/CertificationList";
import CourseList from "@/components/CourseList";
import { useReveal } from "@/hooks/useReveal";
import { useParallax } from "@/hooks/useParallax";
import { useScrollTo } from "@/hooks/useScrollToAnchor";
import { useNow } from "@/utils/time";

const YEAR_MS = 1000 * 60 * 60 * 24 * 365.25;

const careerStart = Math.min(
  ...Object.values(dates).map((period) => period.start.getTime())
);

const currentExperience = experiences.find((exp) => !dates[exp.key].end);
const currentCompany = currentExperience
  ? getCompany(currentExperience.companyId)
  : null;

export default function Home({ builtAt }) {
  const { t } = useTranslation("common");
  const router = useRouter();
  const scrollTo = useScrollTo();
  const portraitRef = useParallax({ speed: 0.06, minWidth: 992 });
  // The build date renders the static HTML; the real date takes over on mount.
  const now = useNow() ?? new Date(builtAt);

  useReveal([router.locale]);

  // Support /#section links coming from other pages.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    const target = document.querySelector(`[data-section="${id}"]`);
    if (target) requestAnimationFrame(() => scrollTo(target));
  }, [scrollTo]);

  const scrollToSection = (id) =>
    scrollTo(document.querySelector(`[data-section="${id}"]`));

  const stats = [
    {
      value: `${Math.max(1, Math.floor((now - careerStart) / YEAR_MS))}+`,
      label: t("stats.years"),
    },
    { value: projects.length, label: t("stats.projects") },
    { value: certifications.length, label: t("stats.certifications") },
    { value: courses.length, label: t("stats.courses") },
  ];

  return (
    <>
      {/* Hero */}
      <section className={styles.hero} data-section="home">
        <div className={styles.heroInner}>
          <div className={styles.heroText}>
            {currentExperience && (
              <p className={styles.heroEyebrow}>
                <span className={styles.liveDot} aria-hidden="true" />
                {t("home.currently", {
                  role: currentExperience.role,
                  company: currentCompany?.name,
                })}
              </p>
            )}
            <h1 className={styles.heroTitle}>
              <span className={styles.heroLine}>
                <span>Sebastian</span>
              </span>
              <span className={styles.heroLine}>
                <span>Arango</span>
              </span>
            </h1>
            <p className={styles.heroSubtitle}>
              {t("home.whatIAm.highlight")}
              {t("home.whatIAm.normal")}
              {t("home.moreAbout")}
            </p>
            <div className={styles.heroActions}>
              <button
                type="button"
                className={styles.buttonPrimary}
                onClick={() => scrollToSection("about")}
              >
                {t("home.firstButton")}
                <span aria-hidden="true">↓</span>
              </button>
              <button
                type="button"
                className={styles.buttonGhost}
                onClick={() => scrollToSection("contact")}
              >
                {t("home.secondButton")}
              </button>
            </div>
          </div>

          <div className={styles.heroPortrait}>
            <div ref={portraitRef} className={styles.heroPortraitParallax}>
              <Image
                src="/my-pic.png"
                alt="Portrait of Sebastian Arango"
                fill
                priority
                sizes="(min-width: 992px) 440px, (min-width: 640px) 60vw, 90vw"
              />
            </div>
          </div>
        </div>

        <div className={styles.heroMeta}>
          <ul className={styles.heroSocials}>
            {socials.map((social) => (
              <li key={social.href}>
                <a href={social.href} target="_blank" rel="noreferrer">
                  {social.name}
                </a>
              </li>
            ))}
          </ul>
          <span className={styles.scrollCue} aria-hidden="true">
            {t("home.scroll")}
            <span className={styles.scrollCueLine} />
          </span>
        </div>
      </section>

      {/* About */}
      <section className={styles.section} data-section="about" id="about">
        <div className={styles.container}>
          <SectionHeading
            index="01"
            label={t("sections.about")}
            title={t("about.whoAmI")}
          />
          <div className={styles.aboutGrid}>
            <div className={styles.aboutText}>
              <p className={styles.lead} data-reveal>
                {t("about.whoIAm.1")}
              </p>
              <p data-reveal>{t("about.whoIAm.2")}</p>
              <p data-reveal>{t("about.whoIAm.3")}</p>
            </div>
            <dl className={styles.stats}>
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={styles.stat}
                  data-reveal
                  style={{ "--d": i }}
                >
                  <dt>{stat.label}</dt>
                  <dd>{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section
        className={`${styles.section} theme-light`}
        data-section="experience"
        id="experience"
      >
        <div className={styles.container}>
          <SectionHeading
            index="02"
            label={t("sections.experience")}
            title={t("portfolio.experience.title")}
          />
          <ExperienceList t={t} locale={router.locale} now={now} />
        </div>
      </section>

      {/* Projects */}
      <section className={styles.section} data-section="projects" id="projects">
        <div className={styles.container}>
          <SectionHeading
            index="03"
            label={t("sections.projects")}
            title={t("portfolio.projectsMade.title")}
          />
          <ProjectShowcase t={t} />
        </div>
      </section>

      <div className="theme-light">
        {/* Stack */}
        <section
          className={`${styles.section} ${styles.sectionCompact}`}
          data-section="stack"
          id="stack"
        >
          <div className={styles.container}>
            <SectionHeading
              index="04"
              label={t("sections.stack")}
              title={t("portfolio.languages")}
            />
          </div>
          <TechMarquee />
        </section>

        {/* Certifications */}
        <section
          className={`${styles.section} ${styles.sectionDivided}`}
          data-section="certifications"
          id="certifications"
        >
          <div className={styles.container}>
            <SectionHeading
              index="05"
              label={t("sections.certifications")}
              title={t("portfolio.certifications.title")}
            />
            <CertificationList
              certifications={certifications}
              t={t}
              locale={router.locale}
              now={now}
            />
          </div>
        </section>

        {/* Education */}
        <section
          className={`${styles.section} ${styles.sectionDivided}`}
          data-section="courses"
          id="courses"
        >
          <div className={styles.container}>
            <SectionHeading
              index="06"
              label={t("sections.courses")}
              title={t("portfolio.courses.title")}
            />
            <CourseList t={t} />
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    builtAt: Date.now(),
    ...(await serverSideTranslations(locale ?? "en", [
      "common",
      "footer",
      "header",
    ])),
  },
});
