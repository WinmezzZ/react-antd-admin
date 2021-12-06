import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TagItem, TagState } from '@/interface/layout/tagsView.interface';

const initialState: TagState = {
  activeTagId: '',
  tags: [],
};

const tagsViewSlice = createSlice({
  name: 'tagsView',
  initialState,
  reducers: {
    setActiveTag(state, action: PayloadAction<string>) {
      state.activeTagId = action.payload;
    },
    addTag(state, action: PayloadAction<TagItem>) {
      if (!state.tags.find(tag => tag.path === action.payload.path)) {
        state.tags.push(action.payload);
      }

      state.activeTagId = action.payload.path;
    },
    removeTag(state, action: PayloadAction<string>) {
      const targetKey = action.payload;
      // dashboard cloud't be closed

      if (targetKey === state.tags[0].path) {
        return;
      }

      const activeTagId = state.activeTagId;
      let lastIndex = 0;

      state.tags.forEach((tag, i) => {
        if (tag.path === targetKey) {
          state.tags.splice(i, 1);
          lastIndex = i - 1;
        }
      });
      const tagList = state.tags.filter(tag => tag.path !== targetKey);

      if (tagList.length && activeTagId === targetKey) {
        if (lastIndex >= 0) {
          state.activeTagId = tagList[lastIndex].path;
        } else {
          state.activeTagId = tagList[0].path;
        }
      }
    },
    removeAllTag(state) {
      state.activeTagId = state.tags[0].path;
      state.tags = [state.tags[0]];
    },
    removeOtherTag(state) {
      const activeTag = state.tags.find(tag => tag.path === state.activeTagId);
      const activeIsDashboard = activeTag!.path === state.tags[0].path;

      state.tags = activeIsDashboard ? [state.tags[0]] : [state.tags[0], activeTag!];
    },
  },
});

export const { setActiveTag, addTag, removeTag, removeAllTag, removeOtherTag } = tagsViewSlice.actions;

export default tagsViewSlice.reducer;
