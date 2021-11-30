import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TagsBarItem, TagsBarState } from '~/interface/layout/tags-bar.interface';

const initialState: TagsBarState = {
  activeTagId: '',
  tags: [],
};

const tagsBarSlice = createSlice({
  name: 'tagsBar',
  initialState,
  reducers: {
    setActiveTag(state, action: PayloadAction<string>) {
      state.activeTagId = action.payload;
    },
    addTag(state, action: PayloadAction<TagsBarItem>) {
      if (!state.tags.find(tag => tag.key === action.payload.key)) {
        state.tags.push(action.payload);
      }

      state.activeTagId = action.payload.key;
    },
    removeTag(state, action: PayloadAction<string>) {
      const targetKey = action.payload;
      // dashboard cloud't be closed

      if (targetKey === state.tags[0].key) {
        return;
      }

      const activeTagId = state.activeTagId;
      let lastIndex = 0;

      state.tags.forEach((tag, i) => {
        if (tag.key === targetKey) {
          state.tags.splice(i, 1);
          lastIndex = i - 1;
        }
      });
      const tagList = state.tags.filter(tag => tag.key !== targetKey);

      if (tagList.length && activeTagId === targetKey) {
        if (lastIndex >= 0) {
          state.activeTagId = tagList[lastIndex].key;
        } else {
          state.activeTagId = tagList[0].key;
        }
      }
    },
    removeAllTag(state) {
      state.activeTagId = state.tags[0].key;
      state.tags = [state.tags[0]];
    },
    removeOtherTag(state) {
      const activeTag = state.tags.find(tag => tag.key === state.activeTagId);
      const activeIsDashboard = activeTag!.key === state.tags[0].key;

      state.tags = activeIsDashboard ? [state.tags[0]] : [state.tags[0], activeTag!];
    },
  },
});

export const { setActiveTag, addTag, removeTag, removeAllTag, removeOtherTag } = tagsBarSlice.actions;

export default tagsBarSlice.reducer;
