export type MetroStation = 'Золоті Ворота' | 'Лук’янівська' | 'Арсенальна' | 'Театральна' | string;
export type Atmosphere = 'Коворкінг' | 'Затишно для зустрічей' | 'Інстаграмна атмосфера' | 'З музикою' | 'З терасою' | 'Secret place';
export type MenuItem = 'Альтернативне молоко' | 'Веганські десерти' | 'Найкращі кондитерські вироби' | 'Матча' | 'Алкогольна карта' | 'Безцукрові десерти';
export type Convenience = 'З тваринами' | 'Доступність для людей з обмеженими можливостями' | 'Туалети' | 'Розетки';
export type PriceLevel = 'Недорого' | 'Дорого';

export interface FiltersState {
  metro?: MetroStation[];
  atmosphere?: Atmosphere[];
  menu?: MenuItem[];
  convenience?: Convenience[];
  price?: PriceLevel[];
}

