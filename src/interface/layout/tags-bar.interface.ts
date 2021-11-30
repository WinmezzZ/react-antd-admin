export type TagsBarItem = {
  code: string;

  title: string;

  /** tag's route path */
  path: string;

  /** can be closed ? */
  closable: boolean;
};

export interface TagsBarState {
  /** tagsView list */
  tags: TagsBarItem[];

  /**current tagView id */
  activeTagPath: TagsBarItem['path'];
}
