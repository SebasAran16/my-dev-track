import React from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import styles from "@/styles/layout/Footer.module.sass";
import { socials } from "@/constants/socials";
import { useScrollTo } from "@/hooks/useScrollToAnchor";

export default function Footer() {
  const { t } = useTranslation("footer");
  const { t: tc } = useTranslation("common");
  const scrollTo = useScrollTo();
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} data-section="contact" id="contact">
      <div className={styles.inner}>
        <div data-reveal>
          <span className={styles.label}>
            <span className={styles.labelIndex}>07</span>
            {tc("sections.contact")}
          </span>
          <h2 className={styles.title}>{t("form.title")}</h2>
          <p className={styles.explanation}>{t("form.explanation")}</p>

          <div className={styles.elsewhere}>
            <span className={styles.elsewhereLabel}>{t("elsewhere")}</span>
            <ul>
              {socials.map((social) => (
                <li key={social.href}>
                  <a href={social.href} target="_blank" rel="noreferrer">
                    <Image src={social.icon} alt="" width="18" height="18" />
                    {social.name}
                    <span className={styles.arrow} aria-hidden="true">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <form
          className={styles.form}
          action="https://formsubmit.co/sebastianarango201316@gmail.com"
          method="POST"
          data-reveal
          style={{ "--d": 1 }}
        >
          <div className={styles.row}>
            <label className={styles.field}>
              <span>{t("form.name")}</span>
              <input
                type="text"
                name="name"
                autoComplete="name"
                placeholder={t("form.name")}
                required
              />
            </label>
            <label className={styles.field}>
              <span>{t("form.mail")}</span>
              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="you@company.com"
                required
              />
            </label>
          </div>
          <label className={styles.field}>
            <span>{t("form.message")}</span>
            <textarea
              name="message"
              rows={5}
              placeholder={t("form.message")}
              required
            />
          </label>
          <input
            type="hidden"
            name="_next"
            value="https://sebastianarango.com/thanks"
          />
          <input type="hidden" name="_subject" value="SelfPage Mail Submit!" />
          <button type="submit" className={styles.submit}>
            {t("form.send")}
            <span className={styles.arrow} aria-hidden="true">
              →
            </span>
          </button>
        </form>
      </div>

      <div className={styles.bottom}>
        <span>
          © {year} Sebastian Arango. {t("rights")}
        </span>
        <button
          type="button"
          className={styles.backToTop}
          onClick={() => scrollTo(0, { offset: 0 })}
        >
          {t("backToTop")}
          <span aria-hidden="true">↑</span>
        </button>
      </div>
    </footer>
  );
}
