type DataKeyValue<K, V> = {
  [T in K as T extends string ? T : never]: V;
};

export type Pagination<K, V> = DataKeyValue<K, V> & {
  /** 页数 */
  PageCount: number;
  /** 页数 */
  PageNumber: number;
  /** 每页条数 */
  PageSize: number;
  /** 总条数 */
  TotalCount: number;
};

export interface PageParams {
  /** 页数 */
  _pageNumber?: number;
  /** 每页条数 */
  _pageSize?: number;
}
