import { observable, computed, action } from 'mobx'

class Size {
  @observable width = 0
  @observable mobile = false

  @computed get small() {
    return this.width < 992
  }

  @action resize = (arg) => {
    const { width, mobile } = arg
    this.width = width
    this.mobile = mobile
  }
}

const NewSize = new Size()

export default NewSize