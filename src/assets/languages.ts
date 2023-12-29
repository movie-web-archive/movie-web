import ar from "@/assets/locales/ar.json";
import cs from "@/assets/locales/cs.json";
import de from "@/assets/locales/de.json";
import en from "@/assets/locales/en.json";
import es from "@/assets/locales/es.json";
import et from "@/assets/locales/et.json";
import fr from "@/assets/locales/fr.json";
import he from "@/assets/locales/he.json";
import it from "@/assets/locales/it.json";
import lv from "@/assets/locales/lv.json";
import minion from "@/assets/locales/minion.json";
import ne from "@/assets/locales/ne.json";
import nl from "@/assets/locales/nl.json";
import pirate from "@/assets/locales/pirate.json";
import pl from "@/assets/locales/pl.json";
import ptBR from "@/assets/locales/pt-BR.json";
import sv from "@/assets/locales/sv.json";
import th from "@/assets/locales/th.json";
import tok from "@/assets/locales/tok.json";
import tr from "@/assets/locales/tr.json";
import vi from "@/assets/locales/vi.json";
import zh from "@/assets/locales/zh.json";

export const locales = {
  "en-US": en,
  "cs-CZ": cs,
  "de-DE": de,
  "fr-FR": fr,
  "pt-BR": ptBR,
  "it-IT": it,
  "nl-NL": nl,
  "pl-PL": pl,
  "tr-TR": tr,
  "vi-VN": vi,
  "zh-CN": zh,
  "he-IL": he,
  "sv-SE": sv,
  pirate,
  minion,
  "lv-LV": lv,
  "th-TH": th,
  "ne-NP": ne,
  "ar-SA": ar,
  "es-ES": es,
  "et-EE": et,
  tok,
};

export type Locales = keyof typeof locales;

export const rtlLocales: Locales[] = ["he-IL", "ar-SA"];
