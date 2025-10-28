export const ACCENT = "#C6B0E7";

export const metroSubGroups: Record<string, string[]> = {
  "Red Line (Sviatoshynsko—Brovarska)": [
    // ⭐ Популярные станции
    "Khreshchatyk",      // центр, пересадка
    "Teatralna",         // пересадка на зелёную ветку
    "Universytet",       // центр, возле университета
    "Vokzalna",          // вокзал
    // Остальные станции
    "Akademmistechko",
    "Zhytomyrska",
    "Sviatoshyn",
    "Nyvky",
    "Beresteiska",
    "Shuliavska",
    "Politekhnichnyi instytut",
    "Arsenalna",
    "Dnipro",
    "Hidropark",
    "Livoberezhna",
    "Darnytsia",
    "Chernihivska",
    "Lisova"
  ],

  "Blue Line (Obolonsko—Teremkivska)": [
    // ⭐ Популярные станции
    "Maidan Nezalezhnosti", // центр, пересадка
    "Kontraktova Ploshcha", // Подол
    "Ploshcha Lva Tolstoho", // пересадка
    "Olimpiiska",            // центр
    // Остальные станции
    "Heroiv Dnipra",
    "Minska",
    "Obolon",
    "Pochaina",
    "Tarasa Shevchenka",
    "Poshtova Ploshcha",
    "Palats Ukraina",
    "Lybidska",
    "Demiivska",
    "Holosiivska",
    "Vasylkivska",
    "Vystavkovyi Tsentr",
    "Ipodrom",
    "Teremky"
  ],

  "Green Line (Syretsko—Pecherska)": [
    // ⭐ Популярные станции
    "Zoloti Vorota",    // пересадка с красной веткой
    "Palats Sportu",    // пересадка с синей веткой
    "Klovska",          // центр
    "Pecherska",        // деловой район
    // Остальные станции
    "Syrets",
    "Dorohozhychi",
    "Lukianivska",
    "Druzhby Narodiv",
    "Vydubychi",
    "Slavutych",
    "Osokorky",
    "Pozniaky",
    "Kharkivska",
    "Vyrlytsia",
    "Boryspilska",
    "Chervony Khutir"
  ]
};
import { filterOptions } from "../../mocks/filterOptions";

export const whiteFilters: Record<string, string[]> = {
  Vibe: filterOptions["VIBE"],
  Menu: filterOptions["MENU"],
  Amenities: filterOptions["ACCESSIBILITY"],
  Budget: filterOptions["BUDGET"],
};