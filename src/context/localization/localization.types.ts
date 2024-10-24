export interface initialStateTypes {
  language: Language;
}

export interface Language {
  lan: string;
  dir: "ltr" | "rtl";
}
