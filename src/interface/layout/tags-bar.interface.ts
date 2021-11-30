export type TagsBarItem = {
  key: string;

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
  activeTagId: TagsBarItem['key'];
}
