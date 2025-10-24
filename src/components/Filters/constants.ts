export const ACCENT = "#C6B0E7";

export const metroSubGroups: Record<string, string[]> = {
  "Red Line (Sviatoshynsko—Brovarska)": [
    "Khreshchatyk",      // популярная
    "Maidan Nezalezhnosti", // популярная
    "Universytet",       // популярная
    "Vokzalna",          // популярная
    "Akademmistechko",
    "Zhytomyrska",
    "Sviatoshyn",
    "Nyvky",
    "Beresteiska",
    "Shuliavska",
    "Politechnichnyi Instytut",
    "Teatralna",
    "Ploshcha Lva Tolstoho",
    "Olimpiiska",
    "Palats Ukraina",
    "Lybidska",
    "Demiivska",
    "Holosiivska",
    "Vasylkivska",
    "Vystavkovyi Tsentr",
    "Ippodrom",
    "Teremky"
  ],
  "Blue Line (Obolonsko—Teremkivska)": [
    "Maidan Nezalezhnosti", // популярная
    "Obolon",
    "Kontraktova Ploshcha", // популярная
    "Heroiv Dnipra",
    "Minska",
    "Petrivka",
    "Tarasa Shevchenka",
    "Poshtova Ploshcha"
  ],
  "Green Line (Svyatoshynsko—Pecherska)": [
    "Syrets",
    "Zoloti Vorota",
    "Klovska",
    "Dovbyk",
    "Lukianivska",
    "Pecherska",
    "Druzhby Narodiv",
    "Vydubychi",
    "Slavutych",
    "Osokorky",
    "Pozniaky",
    "Kharkivska",
    "Vyrlytsia",
    "Boryspilska",
    "Chervonyi Khutir"
  ]
};
import { filterOptions } from "../../mocks/filterOptions";

export const whiteFilters: Record<string, string[]> = {
  Vibe: filterOptions["VIBE"],
  Menu: filterOptions["MENU"],
  Amenities: filterOptions["ACCESSIBILITY"],
  Budget: filterOptions["BUDGET"],
};