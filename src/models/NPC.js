import LivingThing from './LivingThing.js'

export default class NPC extends LivingThing {
  constructor(config) {
    super(config)
  }

  directions = Object.keys(this.directionUpdate)

  update(state) {
    let newDirection = null
    if (this.movingProgressRemaining == 0) {
      newDirection = this.directions[Math.floor(Math.random() * 4)]
    }
    this.updatePosition(state.map, newDirection)
  }
}
