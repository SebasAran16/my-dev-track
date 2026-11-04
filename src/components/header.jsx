import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import styles from "@/styles/layout/Header.module.sass";
import { useLenis } from "@/providers/LenisProvider";
import { useScrollTo } from "@/hooks/useScrollToAnchor";
import { socials } from "@/constants/socials";

const NAV_ITEMS = [
  { id: "about", labelKey: "buttons.about" },
  { id: "experience", labelKey: "buttons.experience" },
  { id: "projects", labelKey: "buttons.projects" },
  { id: "certifications", labelKey: "buttons.certifications" },
  { id: "contact", labelKey: "buttons.contact" },
];

const LOCALES = ["en", "es"];

export default function Header() {
  const router = useRouter();
  const { t } = useTranslation("header");
  const lenis = useLenis();
  const scrollTo = useScrollTo();
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState(null);
  const lastY = useRef(0);

  const isHome = router.pathname === "/";

  // Solid background once the page moves; hide while scrolling down and
  // bring it back as soon as the visitor scrolls up.
  useEffect(() => {
    let frame = null;
    const update = () => {
      frame = null;
      const y = window.scrollY;
      setScrolled(y > 12);
      if (Math.abs(y - lastY.current) > 6) {
        setHidden(y > lastY.current && y > 240);
        lastY.current = y;
      }
    };
    const onScroll = () => {
      if (frame == null) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame != null) cancelAnimationFrame(frame);
    };
  }, []);

  // Track which section sits in the middle of the viewport.
  useEffect(() => {
    if (!isHome) return undefined;
    const sections = NAV_ITEMS.map(({ id }) =>
      document.querySelector(`[data-section="${id}"]`)
    ).filter(Boolean);
    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.dataset.section);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHome, router.locale]);

  // Lock page scroll while the mobile menu is open.
  useEffect(() => {
    if (!navOpen) return undefined;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setNavOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    lenis?.stop();
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      lenis?.start();
    };
  }, [navOpen, lenis]);

  const goTo = (id) => {
    setNavOpen(false);
    if (!isHome) {
      router.push(`/#${id}`);
      return;
    }
    const el = document.querySelector(`[data-section="${id}"]`);
    // Let the menu unlock scrolling before Lenis animates.
    requestAnimationFrame(() => scrollTo(el));
  };

  const goHome = (e) => {
    setNavOpen(false);
    if (!isHome) return;
    e.preventDefault();
    requestAnimationFrame(() => scrollTo(0, { offset: 0 }));
  };

  const headerClass = [
    styles.header,
    scrolled ? styles.scrolled : "",
    hidden && !navOpen ? styles.hidden : "",
    navOpen ? styles.open : "",
  ].join(" ");

  return (
    <header className={headerClass}>
      <div className={styles.bar}>
        <Link href="/" className={styles.logo} onClick={goHome}>
          <span className={styles.monogram} aria-hidden="true">
            SA
          </span>
          <span className={styles.logoText}>Sebastian Arango</span>
        </Link>

        <nav className={styles.desktopNav} aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`${styles.navLink} ${
                active === item.id ? styles.navLinkActive : ""
              }`}
              onClick={() => goTo(item.id)}
            >
              {t(item.labelKey)}
            </button>
          ))}
        </nav>

        <div className={styles.actions}>
          <div className={styles.locales}>
            {LOCALES.map((locale) => (
              <Link
                key={locale}
                href={router.asPath}
                locale={locale}
                scroll={false}
                className={router.locale === locale ? styles.localeActive : ""}
                aria-current={router.locale === locale ? "true" : undefined}
              >
                {locale.toUpperCase()}
              </Link>
            ))}
          </div>
          {process.env.NODE_ENV !== "production" && (
            <Link className={styles.cvButton} href="/cv">
              {t("buttons.cv")}
            </Link>
          )}
          <button
            type="button"
            className={styles.menuButton}
            aria-label={navOpen ? t("buttons.close") : t("buttons.menu")}
            aria-expanded={navOpen}
            aria-controls="mobile-menu"
            onClick={() => setNavOpen((open) => !open)}
          >
            <span className={styles.menuLines} aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={styles.mobileMenu}
        aria-hidden={!navOpen}
        data-lenis-prevent
      >
        <nav className={styles.mobileNav} aria-label="Mobile">
          {NAV_ITEMS.map((item, i) => (
            <button
              key={item.id}
              type="button"
              tabIndex={navOpen ? 0 : -1}
              style={{ "--i": i }}
              onClick={() => goTo(item.id)}
            >
              <span className={styles.mobileIndex}>
                {String(i + 1).padStart(2, "0")}
              </span>
              {t(item.labelKey)}
            </button>
          ))}
        </nav>
        <div className={styles.mobileFooter}>
          {socials.map((social) => (
            <a
              key={social.href}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              tabIndex={navOpen ? 0 : -1}
            >
              {social.name}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
