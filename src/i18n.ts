import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    lng: "English",
    returnObjects: true,
    resources: {
      English: {
        translation: {
          login: "Login",
          nav: ["Home", "Sections", "sale", "Adds", "profile"],
          categories: [
            "Fire Protection",
            "Central Air Conditioner",
            "Home Appliance",
            "Count and Supplies",
          ],
          languages: ["Arabic", "English"],
        },
      },
      Arabic: {
        translation: {
          login: "تسجيل الدخول",
          nav: ["الرئيسيه", "الاقسام", "بيع", "اعلاناتي", "الحساب"],
          categories: [
            "مكافحة الحريق",
            "التكييف المركزي",
            "تدفئه وتكييف منزلي",
            "العدد والمستلزمات",
          ],
          languages: ["العربيه", "الانجليزيه"],
        },
      },
    },
  });
