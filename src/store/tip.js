import { observable, action } from 'mobx'

class Tip {
  @observable count = 0

  @action add  = (count = 1) => {
    this.count += count
  }

  @action clear  = () => {
    this.count = 0
  }
}

export default new Tip()