import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";

export default function About() {
  const { locale, locales, push } = useRouter();
  const handleClick = (locale: string) => {
    push("/about", undefined, { locale: locale });
  };

  const { t } = useTranslation("home");

  return (
    <>
      <h1>{t("title_aplication")}</h1>
      {locales?.map((locale, index) => (
        <button
          key={index}
          onClick={() => handleClick(locale)}
          className="p-4 bg-slate-500 m-4 rounded-lg"
        >
          {locale}
        </button>
      ))}
    </>
  )
}

export async function getStaticProps({ locale }: { locale: string }) {
  try {
    const translations = await serverSideTranslations(locale, ["home"]);

    return {
      props: {
        ...translations,
      },
    };
  } catch (error) {
    console.error("Erro ao carregar traduções:", error);

    return {
      props: {
        // Retornar um objeto vazio ou algum valor padrão
      },
    };
  }
}
