import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { panelData } from '~/config/data/panel';
import { TagsBarItem, TagsBarState } from '~/interface/layout/tags-bar.interface';

const homeMenu = panelData.find(item => item.ShowIndex === 1)!.Menus[0];

const initialState: TagsBarState = {
  activeTagPath: homeMenu.path,
  tags: [
    {
      ...homeMenu,
      closable: false,
    },
  ],
};

const tagsBarSlice = createSlice({
  name: 'tagsBar',
  initialState,
  reducers: {
    setActiveTag(state, action: PayloadAction<string>) {
      state.activeTagPath = action.payload;
    },
    addTag(state, action: PayloadAction<TagsBarItem>) {
      if (!state.tags.find(tag => tag.path === action.payload.path)) {
        state.tags.push(action.payload);
      }

      state.activeTagPath = action.payload.path;
    },
    removeTag(state, action: PayloadAction<string>) {
      const targetKey = action.payload;
      // dashboard cloud't be closed

      if (targetKey === state.tags[0].path) {
        return;
      }

      const activeTagPath = state.activeTagPath;
      let lastIndex = 0;

      state.tags.forEach((tag, i) => {
        if (tag.path === targetKey) {
          state.tags.splice(i, 1);
          lastIndex = i - 1;
        }
      });
      const tagList = state.tags.filter(tag => tag.path !== targetKey);

      if (tagList.length && activeTagPath === targetKey) {
        if (lastIndex >= 0) {
          state.activeTagPath = tagList[lastIndex].path;
        } else {
          state.activeTagPath = tagList[0].path;
        }
      }
    },
    removeAllTag(state) {
      state.activeTagPath = state.tags[0].path;
      state.tags = [state.tags[0]];
    },
    removeOtherTag(state) {
      const activeTag = state.tags.find(tag => tag.path === state.activeTagPath);
      const activeIsDashboard = activeTag!.path === state.tags[0].path;

      state.tags = activeIsDashboard ? [state.tags[0]] : [state.tags[0], activeTag!];
    },
  },
});

export const { setActiveTag, addTag, removeTag, removeAllTag, removeOtherTag } = tagsBarSlice.actions;

export default tagsBarSlice.reducer;
