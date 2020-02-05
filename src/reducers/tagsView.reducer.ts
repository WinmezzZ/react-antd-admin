import { TagState } from '~/interface/layout/tagsView.interface'
import { TagsActions } from '~/actions/tagsView.action'

const tagsViewState: TagState = {
  tags: [],
  activeTagId: ''
}

export const tagsViewlReducer = (state = tagsViewState, actions: TagsActions): TagState => {
  const tags = [...state.tags]
  switch (actions.type) {
    case 'SETACTIVETAG':
      return {
        ...state,
        activeTagId: actions.payload
      }

    case 'ADDTAG':
      if (!tags.find(tag => tag.id === actions.payload.id)) {
        tags.push(actions.payload)
      }
      return {
        ...state,
        tags,
        activeTagId: actions.payload.id
      }

    case 'REMOVETAG':
      const targetKey = actions.payload
      // dashboard cloud't be closed
      if (targetKey === state.tags[0].id) {
        return { ...state }
      }
      let activeTagId = state.activeTagId
      let lastIndex = 0
      tags.forEach((tag, i) => {
        if (tag.id === targetKey) {
          lastIndex = i - 1
        }
      })
      const tagList = tags.filter(tag => tag.id !== targetKey)
      if (tagList.length && activeTagId === targetKey) {
        if (lastIndex >= 0) {
          activeTagId = tagList[lastIndex].id
        } else {
          activeTagId = tagList[0].id
        }
      }
      return {
        ...state,
        tags: tagList,
        activeTagId
      }

    case 'REMOVEALLTAG':
      return {
        ...state,
        activeTagId: state.tags[0].id,
        tags: [state.tags[0]]
      }

    case 'REMOVEOTHERTAG':
      const activeTag = state.tags.find(tag => tag.id === state.activeTagId)
      const activeIsDashboard = activeTag!.id === state.tags[0].id
      return {
        ...state,
        tags: activeIsDashboard ? [state.tags[0]] : [state.tags[0], activeTag!]
      }

    default:
      return {
        ...state,
        tags
      }
  }
}
