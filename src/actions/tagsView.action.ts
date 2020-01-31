import { Action } from 'redux'
import { TagItem } from '~/interface/layout/tagsView.interface'

const SETACTIVETAG = 'SETACTIVETAG'
const ADDTAG = 'ADDTAG'
const REMOVETAG = 'REMOVETAG'
const REMOVEALLTAG = 'REMOVEALLTAG'
const REMOVEOTHERTAG = 'REMOVEOTHERTAG'

type SETACTIVETAG = typeof SETACTIVETAG
type ADDTAG = typeof ADDTAG
type REMOVETAG = typeof REMOVETAG
type REMOVEALLTAG = typeof REMOVEALLTAG
type REMOVEOTHERTAG = typeof REMOVEOTHERTAG

interface SetActiveTag extends Action<SETACTIVETAG> {
  payload: TagItem['id']
}
interface AddTag extends Action<ADDTAG> {
  payload: TagItem
}
interface RemoveTag extends Action<REMOVETAG> {
  payload: TagItem['id']
}
interface RemoveAllTag extends Action<REMOVEALLTAG> {}
interface RemoveOtherTag extends Action<REMOVEOTHERTAG> {}

export const setActiveTag = (payload: string): SetActiveTag => ({
  type: 'SETACTIVETAG',
  payload
})

export const addTag = (payload: AddTag['payload']): AddTag => ({
  type: 'ADDTAG',
  payload
})

export const removeTag = (payload: string): RemoveTag => ({
  type: 'REMOVETAG',
  payload
})

export const removeAllTag = (): RemoveAllTag => ({
  type: 'REMOVEALLTAG'
})

export const removeOtherTag = (): RemoveOtherTag => ({
  type: 'REMOVEOTHERTAG'
})

export type TagsActions = SetActiveTag | AddTag | RemoveTag | RemoveAllTag | RemoveOtherTag
