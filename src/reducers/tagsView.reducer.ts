import { TagItem, TagState } from '~/interface/layout/tagsView.interface'
import { TagsActions } from '~/actions/tagsView.action'

const defaultTagList: TagItem[] = [
  {
    id: '0',
    index: 0,
    label: '控制台',
    path: '/dashboard',
    closable: false
  }
]

const tagsViewState: TagState = {
  tags: defaultTagList,
  activeTagId: defaultTagList[0]['id']
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
        tags.push({
          ...actions.payload,
          index: tags.length,
          closable: true
        })
      }
      return {
        ...state,
        tags,
        activeTagId: actions.payload.id
      }

    case 'REMOVETAG':
      const targetKey = actions.payload
      let activeTagId = ''
      let lastIndex = 0
      tags.forEach((tag, i) => {
        if (tag.id === targetKey) {
          lastIndex = i - 1
        }
      })
      const tagList = tags.filter(tag => tag.id !== targetKey)
      if (state.activeTagId === targetKey) {
        if (lastIndex >= 0) {
          activeTagId = tagList[lastIndex].id
        } else {
          activeTagId = tagList[0].id
        }
      }
      const index = tags.findIndex(tag => tag.id === targetKey)
      tags.splice(index, 1)
      return {
        ...state,
        tags: tagList,
        activeTagId
      }

    case 'REMOVEALLTAG':
      return {
        ...state,
        tags: defaultTagList
      }

    case 'REMOVEOTHERTAG':
      const activeTag = state.tags.find(tag => tag.id === state.activeTagId) || state.tags[0]
      return {
        ...state,
        tags: [...defaultTagList, activeTag]
      }

    default:
      return {
        ...state,
        tags
      }
  }
}
