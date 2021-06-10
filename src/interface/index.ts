export interface Locales<T = any> {
  /** Chinese */
  zh_CN: T;
  /** English */
  en_US: T;
}

export type Language = keyof Locales;

export interface PageData<T> {
  page: number;
  rows: number;
  total: number;
  data: T;
}
