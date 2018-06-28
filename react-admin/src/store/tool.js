import { observable, action } from 'mobx'


class Tool {
  @observable collapsed = false

  @action toggleCollapse = (collapsed) => {
    this.collapsed = collapsed === undefined ? !this.collapsed : collapsed
  }
}

const NewTool = new Tool()

export default NewTool