export const ACCENT = "#C6B0E7";

export const metroSubGroups: Record<string, string[]> = {
  "Red Line": [ "Akademmistechko", "Zhytomyrska", "Sviatoshyn", "Nyvky", "Beresteiska", "Shuliavska", "Politechnichnyi Instytut", "Vokzalna" ],
  "Blue Line": ["Maidan Nezalezhnosti", "Ploshcha Lva Tolstoho","Nyvky","Nyvky", "Olimpiyska"],
  "Green Line": ["Syrets", "Dorohozhychi","Nyvky","Nyvky", "Lukianivska"],
};

import { filterOptions } from "../../mocks/filterOptions";

export const whiteFilters: Record<string, string[]> = {
  Vibe: filterOptions["Vibe"],
  Menu: filterOptions["Menu"],
  Amenities: filterOptions["Amenities"],
  Budget: filterOptions["Budget"],
};