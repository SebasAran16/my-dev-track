import styles from "@/styles/Thanks.module.sass";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ThanksLayout from "@/layouts/thanks-layout";

export default function Thanks() {
  const { t } = useTranslation("thanks");
  return (
    <section className={styles.thanks}>
      <div className={styles.content}>
        <span className={styles.check} aria-hidden="true">
          ✓
        </span>
        <h1 className={styles.title}>{t("title")}</h1>
        <p className={styles.subtitle}>{t("subtitle")}</p>
        <p className={styles.back}>
          {t("backText")}
          <Link href="/">{t("anchor")}</Link>
        </p>
      </div>
    </section>
  );
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", [
      "header",
      "thanks",
      "common",
    ])),
  },
});

Thanks.getLayout = function getLayout(page) {
  return <ThanksLayout>{page}</ThanksLayout>;
};
