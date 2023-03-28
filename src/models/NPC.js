import LivingThing from './LivingThing.js'

export default class NPC extends LivingThing {
  constructor(config) {
    super(config)
  }

  update(state) {
    let newDirection = null
    if (this.movingProgressRemaining == 0) {
      if (this.x < 180) newDirection = 'right'
      else newDirection = 'left'
    }
    this.updatePosition(state.map, newDirection)
  }
}
