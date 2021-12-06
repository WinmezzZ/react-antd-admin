export type TagItem = {
  code: string;

  label: {
    zh_CN: string;
    en_US: string;
  };

  /** tag's route path */
  path: string;

  /** can be closed ? */
  closable: boolean;
};

export interface TagState {
  /** tagsView list */
  tags: TagItem[];

  /**current tagView id */
  activeTagId: TagItem['path'];
}
