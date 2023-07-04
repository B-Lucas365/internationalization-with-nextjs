import Image from "next/image";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import {useTranslation} from 'next-i18next'

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { locale, locales, push } = useRouter();
  const {t} = useTranslation('home')

  const handleClick = (locale: string) => {
    push("/", undefined, { locale: locale });
  };

  return (
    <>
      <h1>{locale}</h1>
      <h2>{t('title_aplication')}</h2>
      
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
  );
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
