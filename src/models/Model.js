import dayjs from 'dayjs'

export class Model {
  #id
  constructor(id,node) {
    this.#id = id
    this.node = node || {}
  }

  // Getters
  get id() {
    return this.#id;
  }
  // Humanize created_at date time
  get hzCreated() {
    return dayjs(this.node.created_at).format('MMM DD, YYYY')
  }
}
