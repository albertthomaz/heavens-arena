import LivingThing from './LivingThing.js'

export default class Player extends LivingThing {
  constructor(config) {
    super(config)
    this.isPlayerControlled = config.isPlayerControlled || false
  }

  update(state) {
    if (this.isPlayerControlled) {
      this.updatePosition(state.map, state.movementKeyPressed)
    }
  }
}
